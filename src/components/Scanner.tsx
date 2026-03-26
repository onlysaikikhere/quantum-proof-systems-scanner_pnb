

const Scanner = () => {
  return (
    <main className="ml-64 pt-24 pb-12 px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-on-surface leading-tight">Quantum Vulnerability Scanner</h2>
            <p className="text-on-surface-variant mt-2 max-w-xl">Initiate comprehensive cryptographic audits to identify legacy algorithms vulnerable to Shor's algorithm and ensure PQC compliance.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 bg-surface-container-highest text-on-surface rounded font-semibold text-sm transition-all hover:bg-surface-dim">
              Export Report
            </button>
            <button className="px-5 py-2.5 bg-gradient-to-br from-primary to-primary-container text-white rounded font-bold text-sm shadow-sm flex items-center gap-2 transition-all active:scale-95">
              <span className="material-symbols-outlined text-sm flex items-center">play_arrow</span>
              Start Scan
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Input & Scanning Section */}
          <section className="col-span-12 lg:col-span-8 space-y-8">
            {/* Search/Input Area */}
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
              <label className="block text-[0.6875rem] font-bold uppercase tracking-wider text-on-surface-variant mb-4">Target Specification</label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-4 flex items-center text-primary">
                    <span className="material-symbols-outlined flex items-center">language</span>
                  </span>
                  <input className="w-full bg-surface-container-low border-none rounded-lg py-4 pl-12 pr-4 text-on-surface font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none" placeholder="Enter Domain or IP Address" type="text" defaultValue="api.quantum-cloud-secure.v4" />
                </div>
                <select className="bg-surface-container-low border-none rounded-lg py-4 px-6 text-sm font-bold text-on-surface-variant focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer">
                  <option>Full Deep Scan</option>
                  <option>Quick Audit</option>
                  <option>SSL/TLS Only</option>
                </select>
              </div>
            </div>

            {/* Results Panel */}
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">Live Analysis Results</h3>
                <div className="flex items-center gap-2 text-[0.6875rem] font-bold py-1 px-3 bg-tertiary/10 text-tertiary rounded-full uppercase">
                  <span className="w-1.5 h-1.5 bg-tertiary rounded-full animate-pulse"></span>
                  Analysis Complete
                </div>
              </div>

              {/* Scan Metrics Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* TLS Version */}
                <div className="bg-surface-container-low rounded-lg p-5">
                  <p className="text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Protocol</p>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold text-on-surface">TLS 1.3</span>
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
                    <span className="text-xl font-bold text-on-surface">AES-GCM-256</span>
                    <span className="text-[0.625rem] font-bold py-0.5 px-2 bg-tertiary text-white rounded">OPTIMAL</span>
                  </div>
                  <p className="text-[0.65rem] text-on-surface-variant mt-3 font-medium truncate">ECDHE_RSA_WITH_AES_256_GCM_SHA384</p>
                </div>

                {/* Key Length */}
                <div className="bg-surface-container-low rounded-lg p-5">
                  <p className="text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Key Strength</p>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold text-on-surface">4096 Bits</span>
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
                    <span className="text-sm font-bold text-on-surface truncate">GlobalSign Root CA</span>
                  </div>
                  <p className="text-[0.65rem] text-on-surface-variant mt-2">Expires: Oct 2026</p>
                </div>

                {/* Risk Level */}
                <div className="bg-surface-container-low rounded-lg p-5">
                  <p className="text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Quantum Risk Index</p>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold text-error">Low Risk</span>
                    <span className="text-[0.625rem] font-bold py-0.5 px-2 bg-error text-white rounded">VULN-L1</span>
                  </div>
                  <div className="mt-4 h-1 w-full bg-surface-variant rounded-full overflow-hidden">
                    <div className="h-full bg-error w-[12%]"></div>
                  </div>
                </div>

                {/* PQC Readiness */}
                <div className="bg-surface-container-low rounded-lg p-5">
                  <p className="text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest mb-2">PQC Readiness</p>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-bold text-tertiary">KYBER-768</span>
                    <span className="text-[0.625rem] font-bold py-0.5 px-2 bg-tertiary text-white rounded">READY</span>
                  </div>
                  <p className="text-[0.65rem] text-on-surface-variant mt-2 truncate">Crystal-Kyber implementation</p>
                </div>
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
                  <div className="flex items-center gap-4">
                    <div className="text-[0.65rem] font-bold bg-surface-container-high px-2 py-1 rounded w-16 text-center">TOMORROW</div>
                    <div className="flex-1">
                      <p className="text-xs font-bold leading-none">Internal API Hub</p>
                      <p className="text-[0.65rem] text-on-surface-variant mt-1">02:00 AM UTC</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-[0.65rem] font-bold bg-surface-container-high px-2 py-1 rounded w-16 text-center">OCT 24</div>
                    <div className="flex-1">
                      <p className="text-xs font-bold leading-none">Legacy Mainframe</p>
                      <p className="text-[0.65rem] text-on-surface-variant mt-1">04:30 AM UTC</p>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 py-2.5 bg-surface-container-highest text-on-surface rounded font-bold text-xs transition-colors hover:bg-surface-dim">
                Create Custom Schedule
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
    </main>
  );
};

export default Scanner;
