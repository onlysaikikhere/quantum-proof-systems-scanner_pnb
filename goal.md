Enhance the existing fully functional "Quantum-Proof Systems Scanner" application to make it a hackathon-winning, enterprise-grade cybersecurity intelligence platform.

IMPORTANT:
Do NOT rebuild the project. Extend and enhance the current working system (FastAPI backend + React frontend).

---

# 🎯 OBJECTIVE

Upgrade the system with advanced visualization, better intelligence, and action-driven automation to align with:

* Hackathon prototype expectations
* CERT-IN CBOM standards
* Mentor feedback (heatmap, graph, AI automation)

---

# 🔥 1. ADD NETWORK GRAPH (CRITICAL FEATURE)

Add a new backend endpoint:

GET /api/graph

Return structured data:

{
nodes: [
{ id: "pnb.com", type: "domain", risk: "high" },
{ id: "api.pnb.com", type: "subdomain", risk: "medium" },
{ id: "192.168.1.1", type: "ip", risk: "low" }
],
edges: [
{ source: "pnb.com", target: "api.pnb.com" },
{ source: "api.pnb.com", target: "192.168.1.1" }
]
}

Frontend:

* Integrate into Asset Discovery page
* Use force-directed graph (D3.js or vis.js)
* Color nodes:

  * red → high risk
  * orange → medium risk
  * green → safe

Graph must support click interaction (show asset details)

---

# 🔥 2. ADD RISK HEATMAP (MENTOR REQUIREMENT)

Add a heatmap visualization component.

Backend:

* Extend /api/assets or /api/risk to include parameter-level risk

Frontend:

* Create heatmap component

Axes:

* X-axis → assets
* Y-axis → parameters:

  * TLS version
  * key size
  * algorithm

Color scale:

* red → vulnerable
* orange → moderate
* green → safe

---

# 🔥 3. ADD ASSET BUCKETING

Modify /api/assets response:

Each asset must include:

{
type: "Web" | "API" | "Mobile" | "Server" | "VPN"
}

Frontend:

* Group assets into buckets
* Show:

  * count per category
  * risk distribution per category
* Add filtering UI

---

# 🔥 4. ADD STATUS FILTERING (EXPECTED FEATURE)

Add support for:

status:

* "new"
* "confirmed"
* "false_positive"

Backend:

* Update /api/assets to support query filtering:
  /api/assets?status=new

Frontend:

* Add filter buttons/tabs

---

# 🔥 5. ADD CERTIFICATE EXPIRY TRACKING

Enhance scanner + assets:

Add:

* certificate_expiry_date
* days_to_expiry

Backend:

* Include in /api/assets and /api/risk

Frontend:

* Add dashboard card:
  "Expiring Certificates"
* Add timeline chart

---

# 🔥 6. UPGRADE AI CHATBOT TO ACTION EXECUTION

Current chatbot detects intent.

Enhance it to EXECUTE actions:

When response is:

{
action: "scan",
parameters: { domain: "example.com" }
}

Frontend must:

* automatically call /api/scan
* update dashboard
* navigate to scanner results

Also support:

* "generate report"
* "email report to [xyz@gmail.com](mailto:xyz@gmail.com)"
* "show high risk assets"
* "schedule weekly scan"

---

# 🔥 7. ADD REPORT GENERATION SYSTEM

Add endpoint:

GET /api/report

Return:

{
summary: "System is partially quantum-safe...",
score: 18,
risk: "Moderate",
recommendations: [
"Upgrade TLS to 1.3",
"Replace RSA with PQC algorithms"
]
}

Frontend:

* Add "Download Report" button
* Display summary panel

---

# 🔥 8. ADD EMAIL INTEGRATION

Enhance /api/email:

* Accept email + report
* Send via SMTP (or simulate)

Frontend:

* Add "Email Report" button
* Integrate with chatbot command

---

# 🔥 9. ADD SCHEDULER (BONUS FEATURE)

Add scheduling capability:

Backend:

* store scheduled scans (in-memory)

Frontend:

* UI for:

  * daily
  * weekly scans

---

# 🔥 10. IMPROVE DASHBOARD INTELLIGENCE

Enhance /api/risk:

Add:

* total assets
* high/medium/low counts
* PQC readiness %
* expiring certificates count

Frontend:

* update charts dynamically
* add heatmap + graph integration

---

# ⚠️ IMPORTANT RULES

* DO NOT break existing functionality
* Maintain clean modular architecture
* Use mock fallback where needed
* Ensure all UI components become dynamic

---

# 🏆 FINAL GOAL

Transform the system from:

"Working prototype"

to:

"Enterprise-grade quantum cybersecurity platform"

---

The final system must clearly demonstrate:

✔ Custom scanning
✔ Risk intelligence
✔ CBOM compliance
✔ Network visualization
✔ Heatmap analysis
✔ AI-driven automation

This should feel like a real banking cybersecurity product.

Return ONLY the modified code and enhancements.
