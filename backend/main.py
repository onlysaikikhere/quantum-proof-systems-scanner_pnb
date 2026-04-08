from fastapi import FastAPI, HTTPException, BackgroundTasks, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
import asyncio
import datetime
import uuid
from dotenv import load_dotenv

# Load environment variables (SMTP_EMAIL, SMTP_PASSWORD, GEMINI_API_KEY)
load_dotenv()

# Import models and DB
from models import Asset, ScanResult, RiskScore, ChatCommand
from database import db_assets, db_jobs, db_nodes, db_edges, seed_database

# Import Engines
from engines.scanner import scan_target
from engines.risk_engine import calculate_advanced_risk
from engines.cbom_generator import generate_cbom
from engines.chatbot import process_chat_message, summarize_report, send_email
from engines.scheduler import start_scheduler, schedule_scan_job
from engines.report_generator import generate_pdf_report

def get_all_assets_list():
    return list(db_assets.values())


app = FastAPI(title="Quantum-Proof Systems Scanner API")

# Setup CORS for Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For hackathon demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    seed_database()
    start_scheduler()

# --- MODULE 1 & 6: ASSET MANAGEMENT ---
@app.get("/api/assets", response_model=List[Asset])
def get_assets(status: Optional[str] = None, type: Optional[str] = None):
    """Retrieve all assets with optional filtering support."""
    assets = list(db_assets.values())
    
    if status and status.lower() != "all":
        assets = [a for a in assets if a["status"] == status.lower()]
    if type and type.lower() != "asset type":
        assets = [a for a in assets if a["type"] == type]
        
    return assets

@app.get("/api/vulnerable-assets", response_model=List[Asset])
def get_vulnerable_assets():
    """Returns only assets classified as High or Medium risk."""
    return [a for a in db_assets.values() if a.get("risk", {}).get("risk_level") in ["High", "Medium"]]

# --- MODULE 2 & 3: SCANNER & RISK ENGINE ---
from pydantic import BaseModel

class ScanRequest(BaseModel):
    domain: str
    mode: Optional[str] = "Full Deep Scan"

from fastapi import Header
from engines.risk_engine import calculate_advanced_risk

@app.post("/api/scan", response_model=Asset)
def run_scan(request: ScanRequest, background_tasks: BackgroundTasks, x_user_role: Optional[str] = Header(None)):
    """Executes the cryptographic scanner on a domain and computes advanced quantum risk."""
    domain = request.domain
    
    # 1. Run full discovery scan
    scan_data = scan_target(domain)
    
    # 2. Compute advanced risk grading
    risk_data = calculate_advanced_risk(
        scan_data.get("tls_versions_list", [scan_data.get("tls_version", "TLS 1.2")]),
        scan_data["algorithm"],
        scan_data["key_size"],
        scan_data["days_to_expiry"],
        scan_data.get("vulnerabilities", []),
        scan_data.get("hosting", {"type": "internal"})
    )
    
    # 3. Create or Update Asset Record
    asset_id = str(uuid.uuid4())
    new_asset = {
        "id": asset_id,
        "type": "Domain",
        "name": domain,
        "detection_date": datetime.datetime.now().isoformat(),
        "status": "active",
        "vendor": scan_data.get("hosting", {}).get("provider", "Unknown"),
        "region": "Dynamic",
        "ip_address": scan_data["ipv4"],
        "risk": risk_data,
        "scan_result": scan_data,
        "vulnerabilities": scan_data.get("vulnerabilities", []),
        "hosting": scan_data.get("hosting", {"provider": "Unknown", "type": "internal"}),
        "mobile_apps": scan_data.get("mobile_info", {}).get("apps", []),
        "subdomains": scan_data.get("subdomains_info", {}).get("subdomains", []),
        "is_active": True,
        "metadata": {"source": "advanced_scan", "mode": request.mode, "scanned_by_role": x_user_role}
    }
    
    db_assets[asset_id] = new_asset
    
    # Also add mock node for network graph
    db_nodes.append({"id": domain, "type": "Domain", "risk": risk_data["risk_level"]})
    
    return new_asset

# --- NEW FULL ASSET DISCOVERY ENDPOINT ---
@app.get("/api/discover")
def run_discovery(domain: str):
    """Module 1: Full scan means domain + subdomains"""
    from engines.scanner import discover_subdomains
    return discover_subdomains(domain)

# --- MODULE 4: CBOM GENERATOR ---
@app.get("/api/cbom")
def get_all_cboms():
    """Generates the Cryptographic Bill of Materials for all confirmed assets."""
    return [generate_cbom(asset) for asset in db_assets.values() if asset.get("scan_result")]

# --- MODULE 5: DASHBOARD METRICS ---
@app.get("/api/risk")
def get_dashboard_metrics():
    """Aggregates data for the dashboard visualizations including expiring certs."""
    assets = list(db_assets.values())
    total_assets = len(assets)
    
    servers = sum(1 for a in assets if "Hardware" in a["type"] or "SERVER" in str(a.get("metadata", "")).upper())
    apis = sum(1 for a in assets if "Software" in a["type"] or "API" in str(a.get("metadata", "")).upper())
    
    high_risk_assets = [a for a in assets if a.get("risk", {}).get("risk_level") == "High"]
    
    # Expiring within 30 days or already expired
    expiring_certs = [a for a in assets if a.get("scan_result", {}).get("days_to_expiry", 999) < 30]

    pqc_ready_count = sum(1 for a in assets if str(a.get("risk", {}).get("label", "")).upper() == "PQC READY")
    pqc_readiness_pct = int((pqc_ready_count / total_assets) * 100) if total_assets > 0 else 0

    # Heatmap data generation
    heatmap_data = []
    for a in assets:
        scan = a.get("scan_result", {})
        risk = a.get("risk", {}).get("risk_level", "Low")
        heatmap_data.append({
            "asset_name": a["name"],
            "tls_version": scan.get("tls_version", "Unknown"),
            "key_size": scan.get("key_size", "Unknown"),
            "algorithm": scan.get("algorithm", "Unknown"),
            "risk": risk
        })
    
    return {
         "summary": {
            "total_assets": total_assets,
            "servers": servers,
            "apis": apis,
            "high_risk": len(high_risk_assets),
            "medium_risk": sum(1 for a in assets if a.get("risk", {}).get("risk_level") == "Medium"),
            "low_risk": sum(1 for a in assets if a.get("risk", {}).get("risk_level") == "Low"),
            "expiring_certs": len(expiring_certs),
            "pqc_readiness_pct": pqc_readiness_pct
        },
        "high_risk_assets": high_risk_assets,
        "expiring_list": expiring_certs,
        "heatmap": heatmap_data
    }

# --- MODULE 7: NETWORK GRAPH API ---
@app.get("/api/graph")
def get_graph():
    """Returns nodes and edges for rendering the interactive network map."""
    return {
        "nodes": db_nodes,
        "edges": db_edges
    }

# Keeping legacy endpoint just in case
@app.get("/api/network-graph")
def get_network_graph():
    return get_graph()

# --- MODULE: REPORTING ---
@app.get("/api/report")
def generate_report():
    assets = list(db_assets.values())
    high_risk = sum(1 for a in assets if a.get("risk", {}).get("risk_level") == "High")
    total = len(assets)
    
    if total == 0:
        return {"summary": "No assets discovered.", "score": 0, "risk": "Unknown", "recommendations": []}
        
    pqc_ready_pct = int(((total - high_risk) / total) * 100)
    overall_risk = "High" if high_risk > (total * 0.3) else "Moderate" if high_risk > 0 else "Low"
    
    return {
        "summary": f"System is practically {pqc_ready_pct}% quantum-safe. {high_risk} assets use legacy cryptography. Immediate upgrade recommended for High Risk nodes.",
        "score": pqc_ready_pct,
        "risk": overall_risk,
        "recommendations": [
            "Upgrade outdated TLS to 1.3 across all perimeter gateways.",
            "Replace RSA signatures with PQC algorithms like Kyber.",
            "Renew certificates expiring within 30 days."
        ]
    }

from fastapi import Query

@app.get("/api/reports/download")
def download_pdf_report(x_user_role: Optional[str] = Query(None)):
    """Generates and downloads a robust PDF report of the current infrastructure."""
    if x_user_role != "Super Admin":
        raise HTTPException(status_code=403, detail="Only Super Admins can export the full CISO-level PDF report.")
    risk_data = get_dashboard_metrics()
    all_assets = get_all_assets_list()
    vuln_assets = [a for a in all_assets if a.get("risk", {}).get("risk_level") in ["High", "Medium", "Critical"]]
    
    overall_risk = "High" if risk_data["summary"]["high_risk"] > 0 else "Low"
    
    pdf_bytes = generate_pdf_report({
        "executive_summary": f"System is practically {risk_data['summary']['pqc_readiness_pct']}% quantum-safe. {risk_data['summary']['high_risk']} assets use legacy cryptography. Immediate upgrade recommended for High Risk nodes.",
        "risk_score": risk_data["summary"]["pqc_readiness_pct"],
        "overall_risk": overall_risk,
        "assets": all_assets,
        "vulnerable_assets": vuln_assets,
        "recommendations": [
            "Upgrade outdated TLS to 1.3 across all perimeter gateways.",
            "Replace RSA signatures with PQC algorithms like Kyber.",
            "Renew certificates expiring within 30 days."
        ]
    })
    
    import datetime
    date_prefix = datetime.datetime.now().strftime('%Y_%m_%d')
    pdf_name = f'{date_prefix}-CyberRiot_Report.pdf'
    
    return Response(
        content=pdf_bytes, 
        media_type="application/pdf", 
        headers={"Content-Disposition": f"attachment; filename={pdf_name}"}
    )

@app.get("/api/reports/vulnerable-download")
def download_vulnerable_pdf_report(x_user_role: Optional[str] = Query(None)):
    """Generates and downloads a PDF report containing ONLY vulnerable assets."""
    if x_user_role == "User":
        raise HTTPException(status_code=403, detail="Basic users cannot export full CISO reports.")
    risk_data = get_dashboard_metrics()
    all_assets = get_all_assets_list()
    vuln_assets = [a for a in all_assets if a.get("risk", {}).get("risk_level") in ["High", "Medium", "Critical"]]
    
    overall_risk = "High" if risk_data["summary"]["high_risk"] > 0 else "Low"
    
    pdf_bytes = generate_pdf_report({
        "report_title": "Critical Vulnerability Disclosures",
        "theme_color": "#dc2626",
        "secondary_theme_color": "#991b1b",
        "executive_summary": f"This report focuses exclusively on vulnerable assets. We identified {len(vuln_assets)} assets requiring immediate remediation due to legacy cryptography or impending certificate expiration.",
        "risk_score": risk_data["summary"]["pqc_readiness_pct"],
        "overall_risk": overall_risk,
        "assets": vuln_assets, 
        "vulnerable_assets": vuln_assets,
        "recommendations": [
            "Upgrade outdated TLS to 1.3 across all perimeter gateways.",
            "Replace RSA signatures with PQC algorithms like Kyber.",
            "Renew certificates expiring within 30 days."
        ]
    })
    
    import datetime
    date_prefix = datetime.datetime.now().strftime('%Y_%m_%d')
    pdf_name = f'{date_prefix}-Vulnerable_Assets_Report.pdf'
    
    return Response(
        content=pdf_bytes, 
        media_type="application/pdf", 
        headers={"Content-Disposition": f"attachment; filename={pdf_name}"}
    )

# --- MODULE 11: GOVERNANCE & ACCESS CONTROL ---
class CreateUserRequest(BaseModel):
    username: str
    target_role: str
    name: str

from database import db_users

@app.post("/api/users/create")
def create_user(request: CreateUserRequest, x_user_role: Optional[str] = Header(None)):
    """Creates a user. Honors RBAC constraints."""
    if not x_user_role:
        raise HTTPException(status_code=401, detail="Unauthorized")
        
    if request.target_role == "Super Admin" and x_user_role != "Super Admin":
        raise HTTPException(status_code=403, detail="Admin cannot create Super Admin.")
        
    if x_user_role == "User":
        raise HTTPException(status_code=403, detail="Normal users cannot create accounts.")
        
    user_id = str(uuid.uuid4())
    db_users[user_id] = {
        "username": request.username,
        "role": request.target_role,
        "name": request.name
    }
    return {"message": f"User {request.name} created successfully with role {request.target_role}"}

@app.get("/api/users")
def list_users(x_user_role: Optional[str] = Header(None)):
    """Review User Access (Governance)."""
    if x_user_role == "User":
        raise HTTPException(status_code=403, detail="Governance review requires Admin+")
    return list(db_users.values())

@app.get("/api/reports/asset-discovery")
def report_asset_discovery():
    all_assets = get_all_assets_list()
    return {"report_type": "Asset Discovery", "assets": [
        {"domain": a["name"], "subdomains": a.get("subdomains", []), "active": a.get("is_active", True)} for a in all_assets
    ]}

@app.get("/api/reports/subdomain-risk")
def report_subdomain_risk():
    all_assets = get_all_assets_list()
    results = []
    for a in all_assets:
        for sub in a.get("subdomains", []):
            results.append({"subdomain": sub, "parent_risk": a.get("risk", {})})
    return {"report_type": "Subdomain Risk", "data": results}

@app.get("/api/reports/vulnerability")
def report_vulnerabilities():
    all_assets = get_all_assets_list()
    results = []
    for a in all_assets:
        if a.get("vulnerabilities"):
            results.append({"domain": a["name"], "vulnerabilities": a["vulnerabilities"], "hosting": a.get("hosting")})
    return {"report_type": "Vulnerabilities", "data": results}

@app.get("/api/reports/mobile-app")
def report_mobile_app():
    all_assets = get_all_assets_list()
    results = []
    for a in all_assets:
        if a.get("mobile_apps"):
            results.append({"domain": a["name"], "apps": a["mobile_apps"]})
    return {"report_type": "Mobile Apps", "data": results}

# --- MODULE 9: AI CHATBOT ---
class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
def chat_with_assistant(request: ChatRequest):
    """Processes user queries into actionable commands using hybrid parsing."""
    result = process_chat_message(request.message)
    
    if result["action"] == "SCHEDULE_SCAN":
        freq = result["parameters"].get("frequency", "daily")
        t = result["parameters"].get("time", "12AM")
        domain = result["parameters"].get("domain", "auto_discovery")
        email = result["parameters"].get("email", "admin@quantumshield.local")
        schedule_scan_job(freq, t, domain, email)
        result["response"] = result["explanation"]
        return result

    if result["action"] == "EMAIL_REPORT":
        recipient = result["parameters"].get("recipient", "admin@quantumshield.local")
        risk_data = get_dashboard_metrics()
        all_assets = get_all_assets_list()
        vuln_assets = [a for a in all_assets if a.get("risk", {}).get("risk_level") in ["High", "Medium"]]
        
        # 1. Generate Summary
        summary = summarize_report({
            "metrics": risk_data["summary"],
            "high_risk_assets": len(risk_data["high_risk_assets"])
        })
        
        # 2. Structure Email
        overall_risk = "High" if risk_data["summary"]["high_risk"] > 0 else "Low"
        subject = f"Quantum Security Report - Risk Level: {overall_risk}"
        
        body = f"Executive Summary:\n{summary}\n\n"
        body += f"Risk Score: {risk_data['summary']['pqc_readiness_pct']}% PQC Ready\n"
        body += f"Key Findings: {risk_data['summary']['high_risk']} High Risk Assets, {risk_data['summary']['expiring_certs']} Expiring Certs\n"
        body += f"Recommendations: Upgrade legacy algorithms to NIST-compliant standards and prioritize rotating expiring certificates."
        
        # 3. Generate PDF Report
        pdf_bytes = generate_pdf_report({
            "executive_summary": summary,
            "risk_score": risk_data["summary"]["pqc_readiness_pct"],
            "overall_risk": overall_risk,
            "assets": all_assets,
            "vulnerable_assets": vuln_assets,
            "recommendations": ["Upgrade legacy algorithms to NIST-compliant standards", "Prioritize rotating expiring certificates"]
        })

        # 4. Generate Vulnerable PDF Report
        vuln_pdf_bytes = generate_pdf_report({
            "report_title": "Critical Vulnerability Disclosures",
            "theme_color": "#dc2626",
            "secondary_theme_color": "#991b1b",
            "executive_summary": f"This report focuses exclusively on vulnerable assets. We identified {len(vuln_assets)} assets requiring immediate remediation due to legacy cryptography or impending certificate expiration.",
            "risk_score": risk_data["summary"]["pqc_readiness_pct"],
            "overall_risk": overall_risk,
            "assets": vuln_assets,
            "vulnerable_assets": vuln_assets,
            "recommendations": ["Upgrade legacy algorithms to NIST-compliant standards", "Prioritize rotating expiring certificates"]
        })

        # 5. Send Email
        success = send_email(recipient, subject, body, pdf_bytes, vuln_pdf_bytes)
        
        # 5. Return API Response
        if success is True:
            result["response"] = f"Report with PDF successfully sent to {recipient}"
        else:
            result["response"] = f"SMTP ERROR. Gmail refused the connection: {success}. Please check your App Password."
            
        return result
        
        return result
        
    result["response"] = result["explanation"]
    return result

# --- MODULE 10: EMAIL & AUTH ---
import random

otp_store = {}

class OTPRequest(BaseModel):
    email: str

class OTPVerify(BaseModel):
    email: str
    otp: str

@app.post("/api/auth/send-otp")
def auth_send_otp(request: OTPRequest):
    code = f"{random.randint(100000, 999999)}"
    otp_store[request.email] = code
    subject = "Quantum Shield Auth Code"
    body = f"Your secure 6-digit authentication code is: {code}\n\nThis code will expire shortly. Do not share it."
    send_email(request.email, subject, body)
    return {"message": "OTP sent successfully"}

@app.post("/api/auth/verify-otp")
def auth_verify_otp(request: OTPVerify):
    if otp_store.get(request.email) == request.otp:
        del otp_store[request.email]
        return {"success": True}
    raise HTTPException(status_code=400, detail="Invalid OTP code")

class EmailRequest(BaseModel):
    recipient: str

@app.post("/api/email")
def send_report(request: EmailRequest):
    """Mock endpoint to simulate dispatching SMTP reports."""
    return {"status": "success", "message": f"Enterprise Cryptographic Risk Report queued for {request.recipient}"}
