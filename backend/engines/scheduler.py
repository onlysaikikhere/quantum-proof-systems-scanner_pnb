from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
import datetime
import dateparser
import uuid

# Initialize scheduler
scheduler = BackgroundScheduler()

def start_scheduler():
    if not scheduler.running:
        scheduler.start()
        print("Background Scheduler Started.")

def _execute_scheduled_scan(domain: str, email: str = "admin@quantumshield.local"):
    """
    The actual job that runs when the schedule triggers.
    Runs the scan, generates the report, and emails it.
    """
    try:
        from main import scan_target, calculate_risk, get_all_assets_list, db_assets, db_nodes
        from engines.report_generator import generate_pdf_report
        from engines.chatbot import send_email, summarize_report

        print(f"Executing scheduled scan for {domain}...")
        
        # 1. Run actual/mock scan
        scan_data = scan_target(domain)
        
        # 2. Compute risk grading
        risk_data = calculate_risk(
            scan_data["tls_version"],
            scan_data["algorithm"],
            scan_data["key_size"],
            scan_data["days_to_expiry"]
        )
        
        # 3. Create or Update Asset Record
        asset_id = str(uuid.uuid4())
        new_asset = {
            "id": asset_id,
            "type": "Domain",
            "name": domain,
            "detection_date": datetime.datetime.now().isoformat(),
            "status": "new",
            "vendor": "Scanned Endpoint",
            "region": "Dynamic",
            "ip_address": scan_data.get("ipv4", "Resolving..."),
            "risk": risk_data,
            "scan_result": scan_data,
            "metadata": {"source": "scheduled_scan"}
        }
        db_assets[asset_id] = new_asset
        db_nodes.append({"id": domain, "type": "Domain", "risk": risk_data["risk_level"]})

        # 4. Generate Report Data
        all_assets = get_all_assets_list()
        vulnerable_assets = [a for a in all_assets if a.get("risk", {}).get("risk_level") in ["High", "Medium"]]
        
        report_data = {
            "assets": all_assets,
            "vulnerable_assets": vulnerable_assets,
            "risk_score": 85,
            "overall_risk": risk_data["risk_level"],
            "recommendations": ["Upgrade RSA-1024 to NIST-approved PQC algorithms", "Renew expiring certificates"]
        }
        
        # 5. Generate AI Summary & PDF
        report_data["executive_summary"] = summarize_report(report_data)
        pdf_bytes = generate_pdf_report(report_data)
        
        # 6. Send Email
        subject = f"Scheduled Quantum Security Report – Risk Level: {risk_data['risk_level']}"
        body = f"Hello,\n\nYour scheduled cryptographic scan for {domain} has completed.\n\nSummary:\n{report_data['executive_summary']}\n\nPlease find the detailed PDF attached.\n\nRegards,\nPrecise Sentinel AI"
        send_email(email, subject, body, pdf_bytes)
        
        print(f"Scheduled scan completed for {domain}. Email sent to {email}.")
    except Exception as e:
        print(f"Scheduled scan error: {e}")


def schedule_scan_job(frequency: str, time_str: str, domain: str = "auto_discovery", email: str = "admin@quantumshield.local"):
    """
    Parses natural language frequency and time to schedule a cron job.
    """
    # Parse time "6 PM" -> hour 18, min 0
    parsed_time = dateparser.parse(time_str)
    hour = parsed_time.hour if parsed_time else 0
    minute = parsed_time.minute if parsed_time else 0
    
    if frequency == "daily":
        trigger = CronTrigger(hour=hour, minute=minute)
    elif frequency == "weekly":
        # Every Monday at specified time
        trigger = CronTrigger(day_of_week='mon', hour=hour, minute=minute)
    elif frequency == "hourly":
        trigger = CronTrigger(minute=minute)
    else:
        # Default fallback
        trigger = CronTrigger(hour=hour, minute=minute)
        
    job = scheduler.add_job(
        _execute_scheduled_scan, 
        trigger=trigger, 
        args=[domain, email], 
        replace_existing=False
    )
    
    return {
        "job_id": job.id,
        "next_run_time": str(job.next_run_time),
        "domain": domain,
        "frequency": frequency,
        "time": f"{hour:02d}:{minute:02d}"
    }
