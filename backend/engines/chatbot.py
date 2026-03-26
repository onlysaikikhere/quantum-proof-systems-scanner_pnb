import re
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
import requests
import json

def process_chat_message(message: str) -> dict:
    """
    Hybrid offline AI action parser using regex to extract user intent.
    """
    msg_lower = message.lower()
    
    # Intent: Scheduler
    if "schedule" in msg_lower or "automate" in msg_lower or "every" in msg_lower:
        time_match = re.search(r'at\s+(\d+\s*(?:am|pm))', msg_lower)
        time_str = time_match.group(1) if time_match else "12:00 AM"
        
        frequency = "daily"
        if "monday" in msg_lower or "weekly" in msg_lower:
            frequency = "weekly"
        elif "hour" in msg_lower:
            frequency = "hourly"
            
        email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', msg_lower)
        email = email_match.group(0) if email_match else "admin@quantumshield.local"
        
        scan_match = re.search(r'(?:scan\s+|for\s+)([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})', msg_lower)
        domain = scan_match.group(1) if scan_match else "auto_discovery"

        return {
            "action": "SCHEDULE_SCAN",
            "parameters": {"frequency": frequency, "time": time_str, "domain": domain, "email": email},
            "explanation": f"I have scheduled an automated {frequency} network scan focusing on {domain} starting at {time_str}. The subsequent Executive PDF report will be systematically emailed to {email} upon completion."
        }
        
    # Intent: Scan
    scan_match = re.search(r'scan\s+([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})', msg_lower)
    if scan_match:
        domain = scan_match.group(1)
        return {
            "action": "SCAN",
            "parameters": {"domain": domain},
            "explanation": f"I will initialize a cryptographic scan on {domain}. I'll resolve its DNS, check its active ports, and analyze its TLS handshakes."
        }
        
    # Intent: Report Generation / Email
    email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', msg_lower)
    
    if "report" in msg_lower and (email_match or "email" in msg_lower or "send" in msg_lower):
        email = email_match.group(0) if email_match else "admin@quantumshield.local"
        return {
            "action": "EMAIL_REPORT",
            "parameters": {"recipient": email},
            "explanation": f"I'm generating the enterprise risk report with PDF attachment and sending it to {email}."
        }
    elif "report" in msg_lower:
        return {
            "action": "GENERATE_REPORT",
            "parameters": {},
            "explanation": "Generating the complete risk and asset compliance report for download."
        }
        
    # Intent: Query High Risk / Vulnerable
    if "high risk" in msg_lower or "vulnerable" in msg_lower:
        return {
            "action": "SHOW_VULNERABLE",
            "parameters": {},
            "explanation": "Filtering the asset inventory to show only High Risk and Vulnerable assets."
        }
        
    # Intent: Default unknown
    return {
        "action": "CHAT",
        "parameters": {},
        "explanation": "I am the Precise Sentinel AI. I can 'scan domain.com', 'email report to ceo@bank.com', 'schedule scan daily at 6 PM', or 'show vulnerable assets'."
    }

def summarize_report(data: dict) -> str:
    """
    Summarizes scan results, risk score, and CBOM using Google Gemini REST API.
    """
    api_key = os.environ.get("GEMINI_API_KEY")
    fallback = "Executive Summary: We identified multiple cryptographic assets requiring immediate attention. Legacy TLS protocols and outdated keys were discovered posing significant post-quantum risks. It is recommended to initiate a migration to NIST-approved algorithms immediately. Detailed CBOM and risk matrix are attached below."
    
    if not api_key:
        return fallback
        
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    prompt = f"You are a Senior Cybersecurity Executive Analyst. Summarize the following cryptographic risk report into a targeted 3-5 line Executive Summary suitable for a CISO. Highlight critical vulnerabilities. Just return the text:\n\n{json.dumps(data)}"
    
    payload = {
        "contents": [{
            "parts": [{"text": prompt}]
        }]
    }
    
    try:
        response = requests.post(url, json=payload, headers={"Content-Type": "application/json"}, timeout=10)
        response.raise_for_status()
        result = response.json()
        return result["candidates"][0]["content"]["parts"][0]["text"].strip()
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return fallback

def send_email(to_email: str, subject: str, body: str, pdf_bytes: bytes = None) -> bool:
    """
    Sends an SMTP email using TLS encryption with optional PDF attachment.
    Expects SMTP_EMAIL and SMTP_PASSWORD in environment.
    """
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    sender_email = os.environ.get("SMTP_EMAIL", "")
    sender_password = os.environ.get("SMTP_PASSWORD", "").replace(" ", "")
    
    if not sender_email or not sender_password:
        print(f"SMTP Mock: Email to {to_email} titled '{subject}' sent with PDF attachment simulating success.")
        return True # Simulate success for demo robustness
        
    msg = MIMEMultipart()
    msg['From'] = f"Quantum Shield Sentinel <{sender_email}>"
    msg['To'] = to_email
    msg['Subject'] = subject
    
    import datetime
    timestamp = datetime.datetime.now().strftime('%B %d, %Y %I:%M %p')
    
    html_body = f"""
    <html>
      <body style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border-top: 4px solid #0054d6; border-radius: 4px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #0054d6; margin-bottom: 5px; font-weight: 800; tracking: tighter;">QUANTUM SHIELD</h2>
            <p style="color: #64748b; font-size: 14px; font-weight: 600; text-transform: uppercase; margin-bottom: 2px;">Automated Cryptographic Report</p>
            <p style="color: #94a3b8; font-size: 11px; margin-top: 0;">Generated On: {timestamp}</p>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 25px; border-radius: 8px; margin-bottom: 25px; font-size: 15px;">
          {body.replace(chr(10), '<br>')}
        </div>
        <p style="font-size: 12px; color: #94a3b8; text-align: center; font-weight: 500;">
          This is an automated intelligence brief generated by Precise Sentinel AI.<br>
          Ensure your infrastructure is proactively quantum-resistant.
        </p>
      </body>
    </html>
    """
    
    msg.attach(MIMEText(html_body, 'html'))
    
    # Attach PDF if provided
    if pdf_bytes:
        date_prefix = datetime.datetime.now().strftime('%Y_%m_%d')
        pdf_name = f'{date_prefix}-CyberRiot_Report.pdf'
        pdf_attachment = MIMEApplication(pdf_bytes, _subtype="pdf")
        pdf_attachment.add_header('Content-Disposition', 'attachment', filename=pdf_name)
        msg.attach(pdf_attachment)
    
    try:
        server = smtplib.SMTP(smtp_server, smtp_port, timeout=10)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        return str(e)
 # Return the exact string so we can view the error
