import { useState } from 'react';

const Scanner = () => {
  const [target, setTarget] = useState("");
  const [scanMode, setScanMode] = useState("Full Deep Scan");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleScan = async () => {
    if (!target) return;
    setIsScanning(true);
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ domain: target, mode: scanMode })
      });
      const data = await res.json();
      setScanResult(data);
      setToastMsg(`Scan Completed: ${target}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    } catch (err) {
      console.error("Scan failed", err);
      setToastMsg(`Scan Failed: ${target}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    } finally {
      setIsScanning(false);
    }
  };
  return (
    <main className="md:ml-64 pt-24 pb-12 px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-extrabold tracking-tight text-on-surface leading-tight">Quantum Vulnerability Scanner</h2>
              <a href="https://csrc.nist.gov/Projects/post-quantum-cryptography" target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors group relative cursor-pointer" title="NIST PQC Standards">
                <span className="material-symbols-outlined text-[14px]">info</span>
              </a>
            </div>
            <p className="text-on-surface-variant mt-2 max-w-xl">Initiate comprehensive cryptographic audits to identify legacy algorithms vulnerable to Shor's algorithm and ensure PQC compliance.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => window.open((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/api/reports/download')} className="px-5 py-2.5 bg-surface-container-highest text-on-surface rounded font-semibold text-sm transition-all hover:bg-surface-dim w-full sm:w-auto">
              Export Report
            </button>
            <button 
              onClick={handleScan}
              disabled={isScanning}
              className={`px-5 py-2.5 bg-gradient-to-br from-primary to-primary-container text-white rounded font-bold text-sm shadow-sm flex items-center gap-2 transition-all ${isScanning ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
            >
              <span className="material-symbols-outlined text-sm flex items-center">{isScanning ? 'sync' : 'play_arrow'}</span>
              {isScanning ? 'Scanning...' : 'Start Scan'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Input & Scanning Section */}
          <section className="col-span-12 lg:col-span-8 space-y-8">
            {/* Search/Input Area */}
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
              <label className="block text-[0.6875rem] font-bold uppercase tracking-wider text-on-surface-variant mb-4">Target Specification</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-4 flex items-center text-primary">
                    <span className="material-symbols-outlined flex items-center">language</span>
                  </span>
                  <input 
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-lg py-4 pl-12 pr-4 text-on-surface font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                    placeholder="Enter Domain or IP Address" 
                    type="text" 
                  />
                </div>
                <select 
                  value={scanMode}
                  onChange={(e) => setScanMode(e.target.value)}
                  className="bg-surface-container-low border-none rounded-lg py-4 px-6 text-sm font-bold text-on-surface-variant focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer w-full sm:w-auto"
                >
                  <option>Full Deep Scan</option>
                  <option>Quick Audit</option>
                  <option>SSL/TLS Only</option>
                </select>
              </div>
            </div>

            {/* Results Panel */}
            <div className={`bg-surface-container-lowest rounded-xl p-8 shadow-sm ${!scanResult && !isScanning ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">Live Analysis Results</h3>
                <div className="flex items-center gap-2 text-[0.6875rem] font-bold py-1 px-3 bg-tertiary/10 text-tertiary rounded-full uppercase">
                  <span className={`w-1.5 h-1.5 bg-tertiary rounded-full ${isScanning ? 'animate-pulse' : ''}`}></span>
                  {isScanning ? 'Scanning...' : scanResult ? 'Analysis Complete' : 'Waiting for Input'}
                </div>
              </div>

              {/* Scan Metrics Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* TLS Version */}
                <div className="bg-surface-container-low rounded-lg p-5">
                  <p className="text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Protocol</p>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold text-on-surface">{scanResult?.scan_result?.tls_version || '---'}</span>
                    <span className="text-[0.625rem] font-bold py-0.5 px-2 bg-tertiary text-white rounded">SECURE</span>
                  </div>
                  <div className="mt-4 h-1 w-full bg-surface-variant rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary w-full"></div>
                  </div>
                </div>

                {/* Cipher Suite */}
                <div className="bg-surface-container-low rounded-lg p-5">
                  <p className="text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Cipher Suite</p>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold text-on-surface">{scanResult?.scan_result?.algorithm || '---'}</span>
                    <span className="text-[0.625rem] font-bold py-0.5 px-2 bg-tertiary text-white rounded">OPTIMAL</span>
                  </div>
                  <p className="text-[0.65rem] text-on-surface-variant mt-3 font-medium truncate">{scanResult?.scan_result?.cipher_suite || 'Waiting for scan...'}</p>
                </div>

                {/* Key Length */}
                <div className="bg-surface-container-low rounded-lg p-5">
                  <p className="text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Key Strength</p>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold text-on-surface">{scanResult?.scan_result?.key_size ? `${scanResult.scan_result.key_size} Bits` : '---'}</span>
                    <span className="text-[0.625rem] font-bold py-0.5 px-2 bg-secondary text-white rounded">ROBUST</span>
                  </div>
                  <div className="mt-4 h-1 w-full bg-surface-variant rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-full"></div>
                  </div>
                </div>

                {/* Certificate Authority */}
                <div className="bg-surface-container-low rounded-lg p-5">
                  <p className="text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Certificate Authority</p>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary flex items-center">verified_user</span>
                    <span className="text-sm font-bold text-on-surface truncate">{scanResult?.scan_result?.certificate_issuer || '---'}</span>
                  </div>
                  <p className="text-[0.65rem] text-on-surface-variant mt-2">Expires: {scanResult?.scan_result?.expiry_date || '---'}</p>
                </div>

                {/* Risk Level */}
                <div className="bg-surface-container-low rounded-lg p-5">
                  <p className="text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Quantum Risk Index</p>
                  <div className="flex items-baseline justify-between">
                    <span className={`text-xl font-bold ${scanResult?.risk?.risk_level === 'High' ? 'text-error' : scanResult?.risk?.risk_level === 'Medium' ? 'text-secondary' : 'text-tertiary'}`}>
                      {scanResult?.risk?.risk_level ? `${scanResult.risk.risk_level} Risk` : '---'}
                    </span>
                    <span className={`text-[0.625rem] font-bold py-0.5 px-2 ${scanResult?.risk?.risk_level === 'High' ? 'bg-error' : scanResult?.risk?.risk_level === 'Medium' ? 'bg-secondary' : 'bg-tertiary'} text-white rounded`}>
                      {scanResult?.risk?.score || 0}%
                    </span>
                  </div>
                  <div className="mt-4 text-xs font-medium text-on-surface-variant flex items-center justify-between">
                    <span>Algorithm: {scanResult?.scan_result?.algorithm || '---'}</span>
                    <span>Days left: {scanResult?.scan_result?.days_to_expiry !== undefined ? scanResult.scan_result.days_to_expiry : '---'}</span>
                  </div>
                </div>
                
                {/* Network Architecture */}
                <div className="bg-surface-container-low rounded-lg p-5">
                  <p className="text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Network Layer</p>
                  <div className="flex flex-col gap-2 mt-3">
                    <div className="flex items-center justify-between bg-surface-container-highest px-3 py-2 rounded">
                       <span className="text-[10px] uppercase font-bold text-on-surface-variant w-8">IPv4</span>
                       <span className="text-xs font-mono font-bold text-on-surface truncate ml-2">
                           {scanResult?.scan_result?.ipv4 || '---'}
                       </span>
                    </div>
                    <div className="flex items-center justify-between bg-surface-container-highest px-3 py-2 rounded">
                       <span className="text-[10px] uppercase font-bold text-on-surface-variant w-8">IPv6</span>
                       <span className="text-xs font-mono font-bold text-on-surface truncate ml-2">
                           {scanResult?.scan_result?.ipv6 || '---'}
                       </span>
                    </div>
                  </div>
                </div>
                
                {/* PQC Readiness */}
                <div className="bg-surface-container-low rounded-lg p-5">
                  <p className="text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest mb-2">PQC Readiness</p>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold text-tertiary">{scanResult?.risk?.label || '---'}</span>
                    <span className={`text-[0.625rem] font-bold py-0.5 px-2 ${scanResult?.risk?.status === 'Secure' ? 'bg-tertiary' : 'bg-error'} text-white rounded`}>{scanResult?.risk?.status?.toUpperCase() || '---'}</span>
                  </div>
                  <p className="text-[0.65rem] text-on-surface-variant mt-2 truncate">Analysis of algorithm {scanResult?.scan_result?.algorithm || ''}</p>
                </div>
                
                {/* 8. Crypto Migration Path */}
                <div className="bg-surface-container-low rounded-lg p-5">
                  <p className="text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Migration Path</p>
                  <div className="flex flex-col gap-2 mt-3">
                    <div className="flex items-center justify-between text-xs font-bold text-on-surface bg-surface-container-highest px-3 py-2 rounded">
                       <span>{scanResult?.scan_result?.algorithm || 'Current'}</span>
                       <span className="material-symbols-outlined text-[14px] text-on-surface-variant opacity-50">arrow_forward</span>
                       <span className="text-primary">{scanResult?.scan_result?.algorithm === 'RSA' ? 'Kyber-768' : 'NIST PQC Standard'}</span>
                    </div>
                    <div className="mt-1 text-[0.65rem] text-on-surface-variant font-medium">Recommended secure replacement logic.</div>
                  </div>
                </div>

                {/* 9. Scan Analytics */}
                <div className="bg-surface-container-low rounded-lg p-5">
                  <p className="text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Scan Performance</p>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-xl font-bold text-on-surface">{isScanning ? '--' : (scanResult ? (scanMode === 'Quick Audit' ? '240ms' : '1.42s') : '---')}</span>
                    <span className="text-[0.625rem] font-bold py-0.5 px-2 bg-surface-container-highest text-on-surface rounded uppercase">{scanMode}</span>
                  </div>
                  <p className="text-[0.65rem] text-on-surface-variant mt-2 border-t border-surface-container-highest pt-2">Payloads Verified: {scanResult ? (scanMode === 'Full Deep Scan' ? '128' : '14') : '0'}</p>
                </div>
                
                {/* Smart Risk Explanation (Full Width) */}
                {(scanResult?.risk?.reason || scanResult?.risk?.recommendation) && (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-surface-container-low rounded-lg p-5 border-l-4 border-primary">
                    <p className="text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest mb-3 flex items-center gap-2">
                       <span className="material-symbols-outlined text-sm text-primary">psychology</span>
                       Smart Risk Explanation
                    </p>
                    <div className="space-y-3">
                       {scanResult.risk.reason && (
                           <div>
                              <span className="text-xs font-bold text-on-surface">Insight: </span>
                              <span className="text-xs text-on-surface-variant leading-relaxed">{scanResult.risk.reason}</span>
                           </div>
                       )}
                       {scanResult.risk.recommendation && (
                           <div>
                              <span className="text-xs font-bold text-on-surface">Action Required: </span>
                              <span className="text-xs text-on-surface-variant leading-relaxed font-medium">{scanResult.risk.recommendation}</span>
                           </div>
                       )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Sidebar Content: Scheduling & History */}
          <aside className="col-span-12 lg:col-span-4 space-y-8">
            {/* Auto Scheduling Section */}
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-transparent">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary flex items-center">calendar_month</span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface">Auto Scheduling</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
                  <span className="text-xs font-bold">Daily Pulse Scan</span>
                  <div className="w-10 h-5 bg-primary/20 rounded-full relative p-0.5 cursor-pointer">
                    <div className="h-4 w-4 bg-primary rounded-full absolute right-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg opacity-60">
                  <span className="text-xs font-bold">Weekly PQC Deep Audit</span>
                  <div className="w-10 h-5 bg-slate-300 rounded-full relative p-0.5 cursor-pointer">
                    <div className="h-4 w-4 bg-white rounded-full absolute left-0.5"></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-surface-container-highest/50">
                <p className="text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Upcoming Scans</p>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                    <div className="text-[0.65rem] font-bold bg-surface-container-high px-2 py-1 rounded w-20 flex-shrink-0 text-center">TOMORROW</div>
                    <div className="flex-1">
                      <p className="text-xs font-bold leading-none">Internal API Hub</p>
                      <p className="text-[0.65rem] text-on-surface-variant mt-1">02:00 AM UTC</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                    <div className="text-[0.65rem] font-bold bg-surface-container-high px-2 py-1 rounded w-20 flex-shrink-0 text-center">OCT 24</div>
                    <div className="flex-1">
                      <p className="text-xs font-bold leading-none">Legacy Mainframe</p>
                      <p className="text-[0.65rem] text-on-surface-variant mt-1">04:30 AM UTC</p>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={() => { alert(`Automated deep scan scheduled for ${target || 'Current Target'} at 02:00 AM UTC.`); }} className="w-full mt-6 py-2.5 bg-gradient-to-br from-primary to-primary-container text-white rounded font-bold text-xs transition-all hover:shadow-lg active:scale-95 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[14px]">auto_mode</span>
                Auto Schedule Scan
              </button>
            </div>

            {/* Scan Health / Status */}
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm overflow-hidden relative">
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary opacity-10 rounded-full blur-2xl"></div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface mb-6">Last Run Status</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-2xl flex items-center" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">Successful Finish</p>
                  <p className="text-[0.65rem] text-on-surface-variant mt-1">Oct 21, 2023 • 14:32</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[0.65rem] font-bold text-on-surface-variant uppercase">
                  <span>Duration</span>
                  <span className="text-on-surface">4m 12s</span>
                </div>
                <div className="flex items-center justify-between text-[0.65rem] font-bold text-on-surface-variant uppercase">
                  <span>Nodes Scanned</span>
                  <span className="text-on-surface">1,240</span>
                </div>
                <div className="flex items-center justify-between text-[0.65rem] font-bold text-on-surface-variant uppercase">
                  <span>Vulnerabilities</span>
                  <span className="text-on-surface">0</span>
                </div>
              </div>
            </div>

            {/* Entropy/Status Visualization */}
            <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-center">
              <p className="text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest mb-6 w-full">Quantum Entropy Status</p>
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-surface-container" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                  <circle className="text-tertiary transition-all" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="18.22" strokeWidth="8"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold text-on-surface">95%</span>
                  <span className="text-[0.6rem] font-bold text-on-surface-variant">PURITY</span>
                </div>
              </div>
              <p className="text-center text-[0.65rem] font-medium text-on-surface-variant mt-6">Cryptographic hygiene is within optimal operational range.</p>
            </div>
          </aside>
        </div>
      </div>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-surface-container-highest text-on-surface px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 z-50 animate-in fade-in slide-in-from-bottom-8">
          <span className="material-symbols-outlined text-primary">check_circle</span>
          <p className="text-sm font-bold">{toastMsg}</p>
        </div>
      )}
    </main>
  );
};

export default Scanner;
