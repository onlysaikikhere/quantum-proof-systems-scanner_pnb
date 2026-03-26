def calculate_risk(tls_version: str, algorithm: str, key_size: int, days_to_expiry: int) -> dict:
    """Calculates the quantum and traditional cryptographic risk score."""
    score = 0
    
    # TLS Version evaluation
    tls_upper = tls_version.upper()
    if "1.3" in tls_upper:
        score += 35
    elif "1.2" in tls_upper:
        score += 20
    elif "1.1" in tls_upper:
        score += 5
    elif "1.0" in tls_upper:
        score += 0
        
    # Algorithm evaluation
    algo_upper = algorithm.upper()
    if "AES" in algo_upper or "CHACHA" in algo_upper:
        score += 35
    elif "ECC" in algo_upper or "ECDSA" in algo_upper:
        score += 20
    elif "RSA" in algo_upper:
        score += 5
        
    # Key Size evaluation
    if key_size >= 4096:
        score += 30
    elif key_size >= 2048:
        score += 15
    else:
        score += 0
        
    # Certificate Expiry
    if days_to_expiry < 0:
        score = min(score, 10) # Expired certs cap score at 10 (critical)
    elif days_to_expiry < 30:
        score -= min(score, 20) # Significant penalty for soon-to-expire

    # Ensure score is 0-100
    score = max(0, min(100, score))
    
    # Categorize Risk
    if score >= 85:
        risk_level = "Low"
        status = "Secure"
        label = "PQC Ready"
    elif score >= 50:
        risk_level = "Medium"
        status = "Partial"
        label = "Quantum Safe" # Or "Needs Upgrade"
    else:
        risk_level = "High"
        status = "Vulnerable"
        label = "Not Safe"
        
    # Overrides for RSA (Not PQC Ready)
    if algo_upper == "RSA" and risk_level == "Low":
        risk_level = "Medium"
        status = "Partial"
        label = "Not PQC Ready"

    # Smart Risk Explanations
    reasons = []
    recommendations = []

    if "1.3" not in tls_upper:
        reasons.append(f"{tls_version} is outdated and vulnerable to downgrade attacks.")
        recommendations.append("Upgrade to TLS 1.3.")
    if algo_upper == "RSA":
        reasons.append("RSA is vulnerable to quantum attacks.")
        recommendations.append("Replace RSA with PQC algorithms like Kyber or Dilithium.")
    elif algo_upper not in ["ECC", "ECDSA", "AES", "CHACHA"]:
        reasons.append(f"{algorithm} is not standard quantum-safe.")
        recommendations.append("Migrate to AES-256 or PQC signatures.")
        
    if key_size < 2048:
        reasons.append(f"Key size {key_size} is critically weak.")
        recommendations.append("Increase key size to at least 2048-bit, preferably 4096-bit or ECC.")
        
    if days_to_expiry < 30:
        reasons.append(f"Certificate expires in {days_to_expiry} days.")
        recommendations.append("Renew certificate immediately.")

    reason_str = " ".join(reasons) if reasons else "Cryptographic posture is strong."
    rec_str = " ".join(recommendations) if recommendations else "No immediate action required."

    return {
        "score": score,
        "risk_level": risk_level,
        "status": status,
        "label": label,
        "reason": reason_str,
        "recommendation": rec_str
    }
