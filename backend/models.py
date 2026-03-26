from pydantic import BaseModel, Field
from typing import List, Optional, Literal
from datetime import datetime

class RiskScore(BaseModel):
    score: int
    risk_level: Literal["High", "Medium", "Low"]
    status: Literal["Vulnerable", "Partial", "Secure"]
    label: Literal["Quantum Safe", "PQC Ready", "Not Safe"]

class ScanResult(BaseModel):
    tls_version: str
    cipher_suite: str
    key_size: int
    certificate_issuer: str
    expiry_date: str
    algorithm: str
    days_to_expiry: int
    ipv4: Optional[str] = None
    ipv6: Optional[str] = None

class Asset(BaseModel):
    id: str
    type: str # "Domain", "IP", "Software", "SSL Certificate"
    name: str # e.g. "api.nexus-core.com"
    detection_date: str
    status: Literal["new", "false_positive", "confirmed"]
    vendor: str
    region: str
    ip_address: Optional[str] = None
    risk: Optional[RiskScore] = None
    scan_result: Optional[ScanResult] = None
    metadata: dict = Field(default_factory=dict)

# Action-Based Chatbot Models
class ChatCommand(BaseModel):
    action: str
    parameters: dict
    explanation: str
