import uuid
from datetime import datetime

def generate_cbom(asset: dict) -> dict:
    """
    Generates a CERT-IN format Cryptographic Bill of Materials (CBOM) for a given asset.
    """
    scan = asset.get("scan_result", {})
    
    algo = scan.get("algorithm", "UNKNOWN")
    pqc_safe = algo in ["AES", "CHACHA"] and scan.get("key_size", 0) >= 4096
    
    return {
        "cbom_version": "1.0",
        "asset_id": asset.get("id"),
        "asset_name": asset.get("name"),
        "timestamp": datetime.now().isoformat(),
        "cryptography": [
            {
                "id": str(uuid.uuid4()),
                "algorithm": algo,
                "key_size": scan.get("key_size"),
                "oid": f"1.0.{len(algo)}.{scan.get('key_size', 0)}", # Mock OID
                "tls_version": scan.get("tls_version", "UNKNOWN"),
                "cipher_suite": scan.get("cipher_suite", "UNKNOWN"),
                "certificate_issuer": scan.get("certificate_issuer", "UNKNOWN"),
                "state": "active",
                "pqc_safe": pqc_safe
            }
        ]
    }
