from datetime import datetime, timedelta
from typing import Dict, List
import uuid

# In-memory storage dictionary
db_assets: Dict[str, dict] = {}
db_jobs: List[dict] = []
db_nodes: List[dict] = []
db_edges: List[dict] = []

def seed_database():
    """Seed the database with initial enterprise architecture mock data."""
    if len(db_assets) > 0:
        return
        
    initial_assets = [
        {
            "id": str(uuid.uuid4()),
            "type": "Software",
            "name": "PROD-DB-CORE-01",
            "detection_date": datetime.now().isoformat(),
            "status": "confirmed",
            "vendor": "AWS",
            "region": "US-East-1",
            "ip_address": "10.0.4.122",
            "risk": {"score": 15, "risk_level": "Low", "status": "Secure", "label": "PQC Ready"},
            "scan_result": {
                "tls_version": "TLS 1.3",
                "cipher_suite": "TLS_AES_256_GCM_SHA384",
                "key_size": 4096,
                "certificate_issuer": "Amazon RSA 2048 M01",
                "expiry_date": (datetime.now() + timedelta(days=365)).strftime("%Y-%m-%d"),
                "algorithm": "AES",
                "days_to_expiry": 365
            },
            "metadata": {"version": "PostgreSQL 14.2"}
        },
        {
            "id": str(uuid.uuid4()),
            "type": "Hardware",
            "name": "HQ-GATEWAY-ISR",
            "detection_date": datetime.now().isoformat(),
            "status": "confirmed",
            "vendor": "Cisco",
            "region": "EU-West-2",
            "ip_address": "192.168.1.1",
            "risk": {"score": 58, "risk_level": "Medium", "status": "Partial", "label": "Not Safe"},
            "scan_result": {
                "tls_version": "TLS 1.2",
                "cipher_suite": "TLS_RSA_WITH_AES_128_CBC_SHA",
                "key_size": 2048,
                "certificate_issuer": "DigiCert",
                "expiry_date": (datetime.now() + timedelta(days=45)).strftime("%Y-%m-%d"),
                "algorithm": "RSA",
                "days_to_expiry": 45
            },
            "metadata": {"model": "Cisco ISR 4451"}
        },
        {
            "id": str(uuid.uuid4()),
            "type": "Software",
            "name": "LEGACY-FTP-SRV",
            "detection_date": (datetime.now() - timedelta(days=14)).isoformat(),
            "status": "new",
            "vendor": "Microsoft",
            "region": "US-West-2",
            "ip_address": "10.0.8.44",
            "risk": {"score": 92, "risk_level": "High", "status": "Vulnerable", "label": "Not Safe"},
            "scan_result": {
                "tls_version": "TLS 1.0",
                "cipher_suite": "TLS_RSA_WITH_RC4_128_MD5",
                "key_size": 1024,
                "certificate_issuer": "Self-Signed",
                "expiry_date": (datetime.now() - timedelta(days=5)).strftime("%Y-%m-%d"),
                "algorithm": "RSA",
                "days_to_expiry": -5
            },
            "metadata": {"os": "Ubuntu 16.04 LTS"}
        },
        {
            "id": str(uuid.uuid4()),
            "type": "Hardware",
            "name": "WKS-8821-M1",
            "detection_date": (datetime.now() - timedelta(days=2)).isoformat(),
            "status": "new",
            "vendor": "Apple",
            "region": "Remote",
            "ip_address": "172.16.4.15",
            "risk": {"score": 8, "risk_level": "Low", "status": "Secure", "label": "Quantum Safe"},
            "scan_result": {
                "tls_version": "TLS 1.3",
                "cipher_suite": "TLS_AES_256_GCM_SHA384",
                "key_size": 4096,
                "certificate_issuer": "Apple CA",
                "expiry_date": (datetime.now() + timedelta(days=800)).strftime("%Y-%m-%d"),
                "algorithm": "ECC",
                "days_to_expiry": 800
            },
            "metadata": {"model": "MacBook Pro 16"}
        }
    ]
    
    for a in initial_assets:
        db_assets[a["id"]] = a

    # Seed some nodes for Network Graph
    nodes = [
        {"id": "api.nexus-core.com", "type": "API", "risk": "Low"},
        {"id": "HQ-GATEWAY", "type": "Gateway", "risk": "Medium"},
        {"id": "LEGACY-DB", "type": "Database", "risk": "High"},
        {"id": "payment.internal", "type": "Service", "risk": "Low"},
        {"id": "PROD-DB-CORE-01", "type": "Database", "risk": "Low"},
        {"id": "HQ-GATEWAY-ISR", "type": "Gateway", "risk": "Medium"},
        {"id": "LEGACY-FTP-SRV", "type": "Server", "risk": "High"},
        {"id": "WKS-8821-M1", "type": "Workstation", "risk": "Low"}
    ]
    edges = [
        {"source": "api.nexus-core.com", "target": "HQ-GATEWAY"},
        {"source": "HQ-GATEWAY", "target": "LEGACY-DB"},
        {"source": "api.nexus-core.com", "target": "payment.internal"},
        {"source": "HQ-GATEWAY-ISR", "target": "PROD-DB-CORE-01"},
        {"source": "LEGACY-FTP-SRV", "target": "LEGACY-DB"}
    ]
    db_nodes.extend(nodes)
    db_edges.extend(edges)

# Run seed on import
seed_database()
