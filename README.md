<div align="center">
  <img src="./assets/scanner.png" alt="Quantum Shield Scanner Interface" width="100%" style="border-radius: 12px; margin-bottom: 20px; box-shadow: 0 4px 24px rgba(0,0,0,0.1);" />
  
  # 🛡️ Quantum Shield: Enterprise Post-Quantum Security Platform
  
  **The ultimate real-time cryptographic scanner and AI-driven post-quantum readiness engine.**
  
  [![Hackathon](https://img.shields.io/badge/Event-PNB_Hackathon-0050cb?style=for-the-badge&logo=codeforces)](#)
  [![Security](https://img.shields.io/badge/Security-NIST_PQC_Compliant-10b981?style=for-the-badge&logo=shield)](#)
  [![Architecture](https://img.shields.io/badge/Architecture-FastAPI_%7C_React-black?style=for-the-badge&logo=python)](#)
  
</div>

---

## ⚡ The Cryptographic Apocalypse
In the impending era of Cryptographically Relevant Quantum Computers (CRQCs), Shor’s algorithm will fundamentally break RSA, ECC, and Diffie-Hellman encryption. **Confidentiality and integrity**—the core pillars of global cybersecurity—are at critical risk of "Harvest Now, Decrypt Later" attacks. If enterprise data is intercepted today, it will be decrypted tomorrow.

## 💡 The Quantum Shield Solution
**Crazy crazy stuff we have made.** Quantum Shield is not just a tool; it's an unprecedented, fully automated enterprise nervous system. We built a platform that actively crawls massive enterprise networks, dissecting deep binary SSL/TLS handshakes in real-time. It maps your entire Cryptographic Bill of Materials (CBOM) and strictly evaluates every node against NIST’s upcoming post-quantum standards (Kyber/Dilithium).

Your enterprise’s **confidentiality and integrity** are actively preserved through beautiful, real-time dashboards and aggressive generative AI automation.

---

## 🚀 Jaw-Dropping Features

### 🔍 Real-Time Deep Cryptographic Scanning
Quantum Shield doesn't rely on cached data. Our advanced Python backend manually opens TCP socket streams to target infrastructure, pulling raw cryptographic metadata. It detects:
*   The exact **TLS implementation version**.
*   The full **Cipher Suite & Key Lengths** negotiated.
*   The raw algorithm profile to calculate a deterministic **Quantum Risk Score**.
*   Any impending certificate expirations that could result in devastating outages.

### 🤖 Precise Sentinel AI (Generative NLP Chatbot)
<div align="center">
  <img src="./assets/chatbot.png" alt="Quantum AI Chatbot Interface" width="90%" style="border-radius: 8px; margin: 15px 0; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);" />
</div>

Why click through 50 menus when you can literally just **tell your infrastructure what to do?** We integrated Google’s Gemini foundation model natively into our control center.
*   **Fully Automated Scan Scheduling:** Just type *"Schedule check for internal.com every week at 3 PM"* and the AI natively accesses the internal Python Cron engine to schedule and queue the job indefinitely.
*   **Automated Email Scheduling & Dispatch:** Type *"Email the risk report to ceo@bank.com"* and the AI will assemble a beautiful, contextual PDF, generate a C-Suite executive summary, and dispatch it via SMTP—all autonomously.

### 🔐 Multi-Layered Threat Defense
*   **2x Authentication (2FA) Implementation:** We integrated robust Two-Factor OTP authentication out of the gate to ensure that only cleared personnel can trigger deep network scans or view cryptographic vulnerabilities. 
*   **Dynamic Executive Reporting:** Generates distinct, highly visual PDF disclosures separating Master Inventories from Critical Vulnerability Reports so board members know exactly what needs fixing.
*   **Auto-Scheduling UI:** You don't have to use the AI to automate tasks. We built direct 1-click Auto Schedule buttons directly into the scanner grid.

---

## 🏗️ Technical Architecture

We spared absolutely no expense building a modern, highly concurrent stack:
*   **Frontend (Vercel-Ready):** React 18, Vite, TypeScript, and a fully custom Tailwind CSS design system simulating extreme, premium modern B2B SaaS aesthetics (glassmorphism, bento grids, micro-animations).
*   **Backend (Engine):** Low-latency Python FastAPI handling deep socket resolutions.
*   **AI Core:** Gemini 1.5 Flash API for intent resolution and summary compilation.
*   **Reporting:** ReportLab for native PDF rendering on-the-fly.

---

## 🏁 How to Run

1. **Install Dependencies:**
   ```bash
   # Frontend
   npm install
   
   # Backend
   cd backend
   pip install -r requirements.txt
   ```

2. **Start the Systems:**
   *First Terminal (Backend):*
   ```bash
   cd backend
   uvicorn main:app --reload --port 8000
   ```
   *Second Terminal (Frontend):*
   ```bash
   npm run dev
   ```

---

*“To defend against the cryptography of tomorrow, you must adapt today.”*

<br><br><br>
<p align="center">
  <small>Made by <b>Team CyberRiot</b> for PNB Hackathon</small>
</p>
