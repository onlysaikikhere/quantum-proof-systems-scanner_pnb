import random
import socket
import ssl
import time
from datetime import datetime
from typing import Dict, List, Optional, Tuple

from cryptography import x509
from cryptography.hazmat.primitives.asymmetric import ec, rsa
from cryptography.x509.oid import NameOID


def _parse_certificate(der_bytes: bytes) -> dict:
    cert = x509.load_der_x509_certificate(der_bytes)

    issuer_cn = None
    issuer_common_names = cert.issuer.get_attributes_for_oid(NameOID.COMMON_NAME)
    if issuer_common_names:
        issuer_cn = issuer_common_names[0].value

    not_after = getattr(cert, "not_valid_after_utc", None) or cert.not_valid_after
    days_to_expiry = (not_after - datetime.utcnow()).days

    public_key = cert.public_key()
    algorithm = "Unknown"
    key_size = None

    if isinstance(public_key, rsa.RSAPublicKey):
        algorithm = "RSA"
        key_size = public_key.key_size
    elif isinstance(public_key, ec.EllipticCurvePublicKey):
        algorithm = "ECC"
        key_size = public_key.key_size

    sans: List[str] = []
    try:
        san_ext = cert.extensions.get_extension_for_class(x509.SubjectAlternativeName)
        sans = san_ext.value.get_values_for_type(x509.DNSName)
    except x509.ExtensionNotFound:
        pass

    return {
        "certificate_issuer": issuer_cn or cert.issuer.rfc4514_string(),
        "expiry_date": not_after.strftime("%Y-%m-%d"),
        "days_to_expiry": days_to_expiry,
        "algorithm": algorithm,
        "key_size": key_size,
        "certificate_valid": days_to_expiry >= 0,
        "san_domains": sans,
    }


def _resolve_ips(domain: str) -> Tuple[Optional[str], Optional[str]]:
    ipv4 = None
    ipv6 = None

    try:
        ipv4 = socket.gethostbyname(domain)
    except socket.gaierror:
        pass

    try:
        ipv6_info = socket.getaddrinfo(domain, None, socket.AF_INET6)
        if ipv6_info:
            ipv6 = str(ipv6_info[0][4][0])
    except socket.gaierror:
        pass

    return ipv4, ipv6


def _probe_tls_versions(domain: str, port: int = 443, timeout: int = 5) -> List[str]:
    supported: List[str] = []

    version_candidates = [
        ("TLS 1.3", getattr(ssl.TLSVersion, "TLSv1_3", None)),
        ("TLS 1.2", getattr(ssl.TLSVersion, "TLSv1_2", None)),
        ("TLS 1.1", getattr(ssl.TLSVersion, "TLSv1_1", None)),
        ("TLS 1.0", getattr(ssl.TLSVersion, "TLSv1", None)),
    ]

    for label, version in version_candidates:
        if version is None:
            continue
        try:
            context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
            context.check_hostname = False
            context.verify_mode = ssl.CERT_NONE
            context.minimum_version = version
            context.maximum_version = version

            with socket.create_connection((domain, port), timeout=timeout) as sock:
                with context.wrap_socket(sock, server_hostname=domain):
                    supported.append(label)
        except Exception:
            continue

    return supported


def attempt_ssl_handshake(domain: str, port: int = 443, timeout: int = 5) -> Tuple[bool, Dict]:
    """
    Attempt SSL/TLS handshake with a domain/subdomain.
    Returns (is_active, handshake_data).
    """
    try:
        context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
        context.check_hostname = False
        context.verify_mode = ssl.CERT_NONE

        start = time.perf_counter()
        with socket.create_connection((domain, port), timeout=timeout) as sock:
            with context.wrap_socket(sock, server_hostname=domain) as ssock:
                elapsed_ms = int((time.perf_counter() - start) * 1000)
                der_cert = ssock.getpeercert(binary_form=True)
                negotiated_tls = ssock.version() or "Unknown"
                cipher = ssock.cipher()
                cipher_suite = cipher[0] if cipher else "Unknown"

        if not der_cert:
            return False, {"error": "Peer did not provide certificate", "status": "inactive"}

        cert_info = _parse_certificate(der_cert)
        cert_info.update({
            "negotiated_tls_version": negotiated_tls,
            "cipher_suite": cipher_suite,
            "response_time_ms": elapsed_ms,
        })

        return True, cert_info
    except Exception as e:
        return False, {"error": str(e), "status": "inactive"}


def _derive_ssl_rating(days_to_expiry: Optional[int], tls_versions: List[str], algorithm: str, key_size: Optional[int]) -> str:
    if days_to_expiry is None or days_to_expiry < 0:
        return "F"

    has_13 = any("1.3" in version for version in tls_versions)
    has_legacy = any("1.1" in version or "1.0" in version for version in tls_versions)

    if has_13 and not has_legacy and (algorithm in ["RSA", "ECC"]) and (key_size or 0) >= 2048 and days_to_expiry > 90:
        return "A"
    if has_13 and not has_legacy and days_to_expiry > 30:
        return "B"
    if not has_legacy and days_to_expiry > 14:
        return "C"
    return "D"


def get_subdomain_scan_data(subdomain: str, port: int = 443) -> dict:
    """
    Scan an individual subdomain for detailed information.
    Returns comprehensive scan data including SSL/TLS details, status, and ratings.
    """
    is_active, handshake_data = attempt_ssl_handshake(subdomain, port)

    if is_active:
        supported_tls_versions = _probe_tls_versions(subdomain, port)
        if not supported_tls_versions and handshake_data.get("negotiated_tls_version"):
            negotiated = handshake_data["negotiated_tls_version"].replace("v", " ")
            supported_tls_versions = [negotiated]

        algorithm = handshake_data.get("algorithm") or "Unknown"
        key_size = handshake_data.get("key_size")
        days_to_expiry = handshake_data.get("days_to_expiry")

        scan_data = {
            "subdomain": subdomain,
            "status": "active",
            "is_active": True,
            "connection_successful": True,
            "tls_versions": supported_tls_versions,
            "cipher_suite": handshake_data.get("cipher_suite", "Unknown"),
            "key_size": key_size,
            "certificate_issuer": handshake_data.get("certificate_issuer", "Unknown"),
            "expiry_date": handshake_data.get("expiry_date"),
            "days_to_expiry": days_to_expiry,
            "algorithm": algorithm,
            "response_time_ms": handshake_data.get("response_time_ms", 0),
            "has_vulnerabilities": False,
            "certificate_valid": handshake_data.get("certificate_valid", False),
            "ssl_rating": _derive_ssl_rating(days_to_expiry, supported_tls_versions, algorithm, key_size),
            "san_domains": handshake_data.get("san_domains", []),
            "negotiated_tls_version": handshake_data.get("negotiated_tls_version", "Unknown"),
        }
    else:
        scan_data = {
            "subdomain": subdomain,
            "status": "inactive",
            "is_active": False,
            "connection_successful": False,
            "tls_versions": [],
            "cipher_suite": "No TLS handshake",
            "key_size": None,
            "certificate_issuer": "Unavailable",
            "expiry_date": None,
            "days_to_expiry": None,
            "algorithm": "Unavailable",
            "response_time_ms": None,
            "has_vulnerabilities": False,
            "certificate_valid": False,
            "ssl_rating": "N/A",
            "error": handshake_data.get("error", "Connection failed"),
            "san_domains": [],
            "negotiated_tls_version": None,
        }

    return scan_data


def discover_subdomains(domain: str) -> dict:
    """
    Module 1: Full subdomain discovery and individual scanning.
    Scans domain and discovered subdomains, classifying them as active/inactive.
    """
    common_prefixes = [
        "login", "api", "vpn", "mail", "dev", "staging", "test", "admin", "ftp", "dns", "storage", "cdn", "app", "web",
        "secure", "payment", "portal", "dashboard", "git", "build", "prod", "internal", "monitoring", "backup", "database",
        "cache", "messaging", "queue", "worker", "service", "analytics", "logs", "search", "reports", "mobile", "frontend", "backend",
    ]

    main_domain_data = get_subdomain_scan_data(domain)

    discovered = set()
    for san in main_domain_data.get("san_domains", []):
        clean = san.strip().lower()
        if clean.startswith("*."):
            clean = clean[2:]
        if clean.endswith(domain.lower()) and clean != domain.lower():
            discovered.add(clean)

    # Backfill with common prefixes to provide broad coverage when SAN is limited.
    for prefix in common_prefixes:
        if len(discovered) >= 40:
            break
        discovered.add(f"{prefix}.{domain}")

    subdomains_list = sorted(discovered)

    scanned_subdomains = []
    active_count = 0
    for subdomain in subdomains_list:
        subdomain_scan = get_subdomain_scan_data(subdomain)
        scanned_subdomains.append(subdomain_scan)
        if subdomain_scan["is_active"]:
            active_count += 1

    inactive_count = len(scanned_subdomains) - active_count

    pqc_ready = []
    standard = []
    critical = []

    for sub in scanned_subdomains:
        if not sub["is_active"]:
            critical.append(sub)
            continue

        days = sub.get("days_to_expiry")
        tls_versions = sub.get("tls_versions", [])

        if isinstance(days, int) and days > 180 and any("1.3" in item for item in tls_versions):
            pqc_ready.append(sub)
        elif isinstance(days, int) and days > 90:
            standard.append(sub)
        else:
            critical.append(sub)

    return {
        "root_domain": domain,
        "scan_timestamp": datetime.now().isoformat(),
        "summary": {
            "total_subdomains": len(scanned_subdomains),
            "active_subdomains": active_count,
            "inactive_subdomains": inactive_count,
            "active_percentage": round((active_count / len(scanned_subdomains)) * 100, 2) if scanned_subdomains else 0,
        },
        "main_domain": main_domain_data,
        "all_subdomains": scanned_subdomains,
        "categorized": {
            "pqc_ready": pqc_ready,
            "standard": standard,
            "critical": critical,
        },
        "statistics": {
            "total_assets": len(scanned_subdomains) + 1,
            "active_assets": active_count + (1 if main_domain_data["is_active"] else 0),
            "inactive_assets": inactive_count + (0 if main_domain_data["is_active"] else 1),
        },
    }


def discover_mobile_apps(domain: str) -> dict:
    """Mock mobile applications (Module 7)."""
    base = domain.split('.')[0] if '.' in domain else domain
    return {
        "mobile_apps_found": 2,
        "apps": [
            {
                "platform": "android",
                "name": f"{base} Mobile Secure",
                "risk_score": random.randint(60, 95),
            },
            {
                "platform": "ios",
                "name": f"{base} Business iOS",
                "risk_score": random.randint(60, 95),
            },
        ],
    }


def discover_vulnerabilities(domain: str) -> tuple:
    """Mock vulnerabilities and hosting (Module 8)."""
    vulns = []
    if random.random() < 0.3:
        vulns.append({"type": "SQL Injection", "severity": "High"})
    if random.random() < 0.5:
        vulns.append({"type": "XSS", "severity": "Medium"})

    hosting = {
        "provider": random.choice(["AWS", "Azure", "GCP", "Internal DC"]),
        "type": "third_party" if random.random() < 0.7 else "internal",
    }

    return vulns, hosting


def scan_target(domain: str) -> dict:
    """
    Performs comprehensive domain and subdomain scanning.
    Uses real TLS handshake/certificate data where possible.
    """
    domain_clean = domain.lower().replace("http://", "").replace("https://", "").split("/")[0]

    subdomain_discovery = discover_subdomains(domain_clean)
    main_domain_data = subdomain_discovery["main_domain"]

    ipv4, ipv6 = _resolve_ips(domain_clean)
    vulnerabilities, hosting = discover_vulnerabilities(domain_clean)
    mobile_info = discover_mobile_apps(domain_clean)

    tls_versions = main_domain_data.get("tls_versions", [])

    return {
        "main_domain": domain_clean,
        "tls_version": ", ".join(tls_versions) if tls_versions else "Unknown",
        "tls_versions_list": tls_versions,
        "cipher_suite": main_domain_data.get("cipher_suite"),
        "key_size": main_domain_data.get("key_size"),
        "certificate_issuer": main_domain_data.get("certificate_issuer"),
        "expiry_date": main_domain_data.get("expiry_date"),
        "algorithm": main_domain_data.get("algorithm"),
        "days_to_expiry": main_domain_data.get("days_to_expiry"),
        "ipv4": ipv4 or "0.0.0.0",
        "ipv6": ipv6 or "::",
        "vulnerabilities": vulnerabilities,
        "hosting": hosting,
        "mobile_info": mobile_info,
        "subdomains_discovery": subdomain_discovery,
        "subdomains_info": {
            "subdomains": [sub["subdomain"] for sub in subdomain_discovery["all_subdomains"]],
            "total_assets": subdomain_discovery["statistics"]["total_assets"],
            "active_assets": subdomain_discovery["statistics"]["active_assets"],
            "inactive_assets": subdomain_discovery["statistics"]["inactive_assets"],
        },
        "all_subdomains_detailed": subdomain_discovery["all_subdomains"],
        "active_subdomains": [sub for sub in subdomain_discovery["all_subdomains"] if sub["is_active"]],
        "inactive_subdomains": [sub for sub in subdomain_discovery["all_subdomains"] if not sub["is_active"]],
        "pqc_ready_subdomains": subdomain_discovery["categorized"]["pqc_ready"],
        "standard_subdomains": subdomain_discovery["categorized"]["standard"],
        "critical_subdomains": subdomain_discovery["categorized"]["critical"],
        "scan_timestamp": datetime.now().isoformat(),
        "full_scan": True,
    }
