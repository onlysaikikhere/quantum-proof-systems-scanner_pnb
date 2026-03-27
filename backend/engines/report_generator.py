import os
import io
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from datetime import datetime

def generate_pdf_report(data: dict) -> bytes:
    """
    Generates a PDF report containing Executive Summary, Risk Score,
    Asset List, Vulnerable Assets, and Recommendations.

    data expects:
    {
        "executive_summary": "...",
        "risk_score": 85,
        "overall_risk": "Low",
        "assets": [...],
        "vulnerable_assets": [...],
        "recommendations": [...]
    }
    """
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    elements = []
    
    styles = getSampleStyleSheet()
    title_style = styles['Title']
    heading_style = styles['Heading2']
    normal_style = styles['Normal']
    
    # Title
    report_title = data.get("report_title", "Enterprise Quantum Security Report")
    elements.append(Paragraph(report_title, title_style))
    elements.append(Paragraph(f"Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", normal_style))
    elements.append(Spacer(1, 20))
    
    # 1. Executive Summary
    elements.append(Paragraph("Executive Summary", heading_style))
    elements.append(Paragraph(data.get("executive_summary", "No executive summary available."), normal_style))
    elements.append(Spacer(1, 15))
    
    # 2. Risk Score
    elements.append(Paragraph("Overall Risk Assessment", heading_style))
    score = data.get("risk_score", 0)
    risk = data.get("overall_risk", "Unknown")
    elements.append(Paragraph(f"<b>PQC Readiness Score:</b> {score}%", normal_style))
    elements.append(Paragraph(f"<b>Risk Level:</b> {risk}", normal_style))
    elements.append(Spacer(1, 15))
    
    # 3. Vulnerable Assets
    elements.append(Paragraph("Vulnerable Assets", heading_style))
    vuln_assets = data.get("vulnerable_assets", [])
    if vuln_assets:
        # Create Table
        table_data = [["Asset Name", "Algorithm", "TLS Version", "Status"]]
        for a in vuln_assets:
            scan = a.get("scan_result", {})
            table_data.append([
                a.get("name", ""),
                scan.get("algorithm", ""),
                scan.get("tls_version", ""),
                a.get("risk", {}).get("risk_level", "Unknown")
            ])
        t = Table(table_data)
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor(data.get("theme_color", "#0050cb"))),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#f7f9fb')),
            ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#c2c6d8'))
        ]))
        elements.append(t)
    else:
        elements.append(Paragraph("No vulnerable assets detected. Excellent hygiene.", normal_style))
    elements.append(Spacer(1, 15))
    
    # 4. All Assets
    elements.append(Paragraph("Master Asset Inventory", heading_style))
    assets = data.get("assets", [])
    if assets:
        elements.append(Paragraph(f"Total monitored assets: {len(assets)}", normal_style))
        elements.append(Spacer(1, 10))
        
        master_data = [["Asset", "Type", "IPv4", "IPv6", "Risk", "Algorithm"]]
        for a in assets:
            scan = a.get("scan_result", {})
            master_data.append([
                a.get("name", ""),
                a.get("type", "Unknown"),
                scan.get("ipv4", "N/A"),
                scan.get("ipv6", "N/A"),
                a.get("risk", {}).get("risk_level", "Unknown"),
                scan.get("algorithm", "N/A")
            ])
            
        t2 = Table(master_data)
        t2.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor(data.get("secondary_theme_color", "#0f172a"))),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 9),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 10),
            ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#f8fafc')),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1'))
        ]))
        elements.append(t2)
    else:
        elements.append(Paragraph("No assets registered in the database.", normal_style))
    elements.append(Spacer(1, 15))
    
    # 5. Recommendations
    elements.append(Paragraph("Actionable Recommendations", heading_style))
    recs = data.get("recommendations", [])
    if recs:
        for r in recs:
            elements.append(Paragraph(f"• {r}", normal_style))
    else:
        elements.append(Paragraph("No critical recommendations.", normal_style))
        
    doc.build(elements)
    
    pdf_bytes = buffer.getvalue()
    buffer.close()
    return pdf_bytes
