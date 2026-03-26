import socket
import ssl
import random
from datetime import datetime, timedelta

def _mock_scan_target(domain: str, ipv4: str, ipv6: str) -> dict:
    """Deterministic mock fallback when real connection fails."""
    length_hash = len(domain)
    if length_hash % 3 == 0:
        tls, cipher, algo, key_size, issuer, days = "TLS 1.3", "TLS_AES_256_GCM_SHA384", "AES", 4096, "DigiCert High Assurance EV Root CA", 320
    elif length_hash % 3 == 1:
        tls, cipher, algo, key_size, issuer, days = "TLS 1.2", "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256", "ECC", 2048, "Let's Encrypt Authority X3", 45
    else:
        tls, cipher, algo, key_size, issuer, days = "TLS 1.0", "TLS_RSA_WITH_3DES_EDE_CBC_SHA", "RSA", 1024, "VeriSign Class 3", -12
        
    expiry_date = (datetime.now() + timedelta(days=days)).strftime("%Y-%m-%d")

    return {
        "tls_version": tls,
        "cipher_suite": cipher,
        "key_size": key_size,
        "certificate_issuer": issuer,
        "expiry_date": expiry_date,
        "algorithm": algo,
        "days_to_expiry": days,
        "ipv4": ipv4,
        "ipv6": ipv6
    }

def scan_target(domain: str) -> dict:
    """
    Hybrid scanner: attempts real cryptographic scan using socket and ssl.
    Falls back to deterministic mock if real scan fails.
    """
    original_domain = domain
    domain = domain.lower().replace("http://", "").replace("https://", "").split("/")[0]
    
    ipv4 = "Unknown"
    ipv6 = "Unknown"
    
    # 1. IPv4 / IPv6 Extraction
    try:
        addr_info = socket.getaddrinfo(domain, 443, proto=socket.IPPROTO_TCP)
        for info in addr_info:
            family = info[0]
            ip = info[4][0]
            if family == socket.AF_INET and ipv4 == "Unknown":
                ipv4 = ip
            elif family == socket.AF_INET6 and ipv6 == "Unknown":
                ipv6 = ip
    except Exception as e:
        print(f"DNS Resolution failed for {domain}: {e}")

    # Mock IP if resolution failed (for feature demonstration)
    if ipv4 == "Unknown":
        ipv4 = f"{random.randint(1, 255)}.{random.randint(0, 255)}.{random.randint(0, 255)}.{random.randint(1, 255)}"
    if ipv6 == "Unknown":
        ipv6 = f"2001:0db8:85a3:0000:0000:8a2e:0370:{random.randint(1000, 9999)}"

    # 2. Real SSL Certification Extraction
    try:
        context = ssl.create_default_context()
        context.check_hostname = False
        context.verify_mode = ssl.CERT_REQUIRED
        
        with socket.create_connection((domain, 443), timeout=3) as sock:
            with context.wrap_socket(sock, server_hostname=domain) as ssock:
                cert = ssock.getpeercert()
                cipher = ssock.cipher()
                
                # Cipher details
                cipher_suite = cipher[0]
                tls_version = cipher[1].replace('v', ' ')
                key_size = cipher[2]
                
                algo = "AES" if "AES" in cipher_suite else "ECC" if "ECDH" in cipher_suite else "RSA" if "RSA" in cipher_suite else "CHACHA20"
                
                # Cert details
                issuer_dict = dict(x[0] for x in cert.get('issuer', []))
                issuer = issuer_dict.get('organizationName', issuer_dict.get('commonName', 'Unknown CA'))
                
                not_after_str = cert.get('notAfter', '')
                if not_after_str:
                    expiry_date_obj = datetime.strptime(not_after_str, "%b %d %H:%M:%S %Y %Z")
                    days_to_expiry = (expiry_date_obj - datetime.utcnow()).days
                    expiry_date = expiry_date_obj.strftime("%Y-%m-%d")
                else:
                    days_to_expiry = 365
                    expiry_date = (datetime.utcnow() + timedelta(days=365)).strftime("%Y-%m-%d")
                    
                print(f"Real scan SUCCESS for {domain}")
                return {
                    "tls_version": tls_version,
                    "cipher_suite": cipher_suite,
                    "key_size": key_size,
                    "certificate_issuer": issuer,
                    "expiry_date": expiry_date,
                    "algorithm": algo,
                    "days_to_expiry": days_to_expiry,
                    "ipv4": ipv4,
                    "ipv6": ipv6
                }
    except Exception as e:
        print(f"Real scan FAILED for {domain}: {e}. Using mock fallback.")
        return _mock_scan_target(domain, ipv4, ipv6)
