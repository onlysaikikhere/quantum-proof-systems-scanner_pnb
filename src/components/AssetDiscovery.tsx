

const AssetDiscovery = () => {
  return (
    <main className="ml-64 pt-16 min-h-screen p-8 space-y-8">
      {/* Header Section */}
      <section className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface headline-md">Asset Discovery</h2>
          <p className="text-on-surface-variant body-md mt-1">Real-time mapping of your organizational attack surface and cryptographic inventory.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-surface-container-highest text-on-surface rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-300 transition-colors">
            <span className="material-symbols-outlined text-sm flex items-center">filter_list</span>
            Refine Filters
          </button>
          <button className="px-4 py-2 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-lg text-sm font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-sm flex items-center">download</span>
            Export Inventory
          </button>
        </div>
      </section>

      {/* Discovery Tabs */}
      <nav className="flex gap-8 border-b border-outline-variant/20">
        <button className="pb-4 text-sm font-bold border-b-2 border-primary text-primary transition-all">Domains</button>
        <button className="pb-4 text-sm font-medium text-on-surface-variant hover:text-on-surface transition-all">SSL Certificates</button>
        <button className="pb-4 text-sm font-medium text-on-surface-variant hover:text-on-surface transition-all">IP Addresses/Subnets</button>
        <button className="pb-4 text-sm font-medium text-on-surface-variant hover:text-on-surface transition-all">Software</button>
      </nav>

      {/* Top Grid: Network Graph & Buckets */}
      <div className="grid grid-cols-12 gap-8">
        {/* Interactive Network Graph */}
        <div className="col-span-8 bg-surface-container-lowest rounded-xl p-6 shadow-sm relative overflow-hidden h-[450px] flex flex-col border border-outline-variant/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Entity Relationship Graph</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span><span className="text-[10px] font-bold text-on-surface-variant">SAFE</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span><span className="text-[10px] font-bold text-on-surface-variant">PARTIAL</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-error"></span><span className="text-[10px] font-bold text-on-surface-variant">VULNERABLE</span></div>
            </div>
          </div>
          
          <div className="flex-1 relative bg-slate-50/50 rounded-lg border border-slate-100 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0050cb 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            {/* Nodes & Edges Visual Simulation */}
            <div className="relative w-full h-full">
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line stroke="#0054d6" strokeDasharray="4" strokeWidth="0.5" x1="50%" x2="30%" y1="50%" y2="30%"></line>
                <line stroke="#0054d6" strokeWidth="0.5" x1="50%" x2="70%" y1="50%" y2="40%"></line>
                <line stroke="#0054d6" strokeDasharray="4" strokeWidth="0.5" x1="50%" x2="40%" y1="50%" y2="70%"></line>
                <line stroke="#ba1a1a" strokeWidth="0.5" x1="30%" x2="20%" y1="30%" y2="40%"></line>
                <line stroke="#006645" strokeWidth="0.5" x1="70%" x2="85%" y1="40%" y2="35%"></line>
              </svg>
              {/* Central Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full glass-panel border border-primary/20 flex flex-col items-center justify-center text-center shadow-lg group cursor-pointer hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-primary text-xl">hub</span>
                <span className="text-[8px] font-bold mt-1">MAIN_CORE</span>
              </div>
              {/* Satellite Nodes */}
              <div className="absolute top-[30%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-error/10 border border-error/30 flex items-center justify-center cursor-pointer hover:bg-error/20 transition-colors">
                <span className="material-symbols-outlined text-error text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>cloud</span>
              </div>
              <div className="absolute top-[40%] left-[70%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-tertiary/10 border border-tertiary/30 flex items-center justify-center cursor-pointer hover:bg-tertiary/20 transition-colors">
                <span className="material-symbols-outlined text-tertiary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>api</span>
              </div>
              <div className="absolute top-[70%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-secondary-container/10 border border-secondary-container/30 flex items-center justify-center cursor-pointer hover:bg-secondary-container/20 transition-colors">
                <span className="material-symbols-outlined text-secondary-container text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>dns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Asset Bucketing */}
        <div className="col-span-4 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-2 px-1">Asset Distribution</h3>
          
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/10 flex items-center justify-between group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">web</span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">Web Applications</p>
                <p className="text-[10px] text-on-surface-variant">14 Active Instances</p>
              </div>
            </div>
            <span className="text-sm font-extrabold text-tertiary">92% SAFE</span>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/10 flex items-center justify-between group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">api</span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">APIs & Microservices</p>
                <p className="text-[10px] text-on-surface-variant">88 Endpoints Discovered</p>
              </div>
            </div>
            <span className="text-sm font-extrabold text-secondary-container">64% PARTIAL</span>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/10 flex items-center justify-between group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">smartphone</span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">Mobile App Backend</p>
                <p className="text-[10px] text-on-surface-variant">4 Production Clusters</p>
              </div>
            </div>
            <span className="text-sm font-extrabold text-tertiary">100% SAFE</span>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/10 flex items-center justify-between group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">storage</span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">Servers & DBs</p>
                <p className="text-[10px] text-on-surface-variant">212 Cloud Assets</p>
              </div>
            </div>
            <span className="text-sm font-extrabold text-error">12% RISK</span>
          </div>

          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/10 flex items-center justify-between group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">vpn_lock</span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">VPN Gateways</p>
                <p className="text-[10px] text-on-surface-variant">3 Global Access Points</p>
              </div>
            </div>
            <span className="text-sm font-extrabold text-secondary-container">MODERATE</span>
          </div>
        </div>
      </div>

      {/* Asset Data Table */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/30">
          <h3 className="text-sm font-bold text-on-surface">Discovered Domain Assets</h3>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Sort by:</span>
            <select className="text-xs border-none bg-transparent focus:ring-0 font-bold text-primary cursor-pointer">
              <option>Risk Level</option>
              <option>Discovery Date</option>
              <option>Alpha</option>
            </select>
          </div>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-container-low/50">
              <th className="px-6 py-3 text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant">Asset Name / Domain</th>
              <th className="px-6 py-3 text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant">IP Address</th>
              <th className="px-6 py-3 text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant">SSL Status</th>
              <th className="px-6 py-3 text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant">Discovery Type</th>
              <th className="px-6 py-3 text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant">Risk Score</th>
              <th className="px-6 py-3 text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            <tr className="hover:bg-surface-container-low transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-sm flex items-center">language</span>
                  <div>
                    <p className="text-sm font-bold text-on-surface">core-api.quantum-proof.io</p>
                    <p className="text-[10px] text-on-surface-variant">Subdomain • Production</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-xs font-mono text-on-surface-variant">192.168.102.44</td>
              <td className="px-6 py-4">
                <span className="px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary text-[10px] font-bold border border-tertiary/20">VALID (Kyber-768)</span>
              </td>
              <td className="px-6 py-4 text-xs font-medium text-on-surface">Passive Scan</td>
              <td className="px-6 py-4">
                <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary w-[12%]"></div>
                </div>
              </td>
              <td className="px-6 py-4">
                <button className="text-slate-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-sm flex items-center">more_vert</span>
                </button>
              </td>
            </tr>
            <tr className="hover:bg-surface-container-low transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-error text-sm flex items-center">warning</span>
                  <div>
                    <p className="text-sm font-bold text-on-surface">dev-stage.quantum-proof.io</p>
                    <p className="text-[10px] text-on-surface-variant">Subdomain • Staging</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-xs font-mono text-on-surface-variant">10.0.42.11</td>
              <td className="px-6 py-4">
                <span className="px-2 py-0.5 rounded-full bg-error/10 text-error text-[10px] font-bold border border-error/20">EXPIRED</span>
              </td>
              <td className="px-6 py-4 text-xs font-medium text-on-surface">Active Probe</td>
              <td className="px-6 py-4">
                <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-error w-[88%]"></div>
                </div>
              </td>
              <td className="px-6 py-4">
                <button className="text-slate-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-sm flex items-center">more_vert</span>
                </button>
              </td>
            </tr>
            <tr className="hover:bg-surface-container-low transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary-container text-sm flex items-center">cloud_sync</span>
                  <div>
                    <p className="text-sm font-bold text-on-surface">s3-bucket-storage-01</p>
                    <p className="text-[10px] text-on-surface-variant">Cloud Asset • AWS</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-xs font-mono text-on-surface-variant">Dynamic IP</td>
              <td className="px-6 py-4">
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold">N/A</span>
              </td>
              <td className="px-6 py-4 text-xs font-medium text-on-surface">Cloud Connector</td>
              <td className="px-6 py-4">
                <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary-container w-[45%]"></div>
                </div>
              </td>
              <td className="px-6 py-4">
                <button className="text-slate-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-sm flex items-center">more_vert</span>
                </button>
              </td>
            </tr>
            <tr className="hover:bg-surface-container-low transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-sm flex items-center">language</span>
                  <div>
                    <p className="text-sm font-bold text-on-surface">vpn.london-office.io</p>
                    <p className="text-[10px] text-on-surface-variant">Subdomain • Gateway</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-xs font-mono text-on-surface-variant">212.4.99.122</td>
              <td className="px-6 py-4">
                <span className="px-2 py-0.5 rounded-full bg-tertiary/10 text-tertiary text-[10px] font-bold border border-tertiary/20">VALID (RSA-4096)</span>
              </td>
              <td className="px-6 py-4 text-xs font-medium text-on-surface">Certificate Transparency</td>
              <td className="px-6 py-4">
                <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary-container w-[32%]"></div>
                </div>
              </td>
              <td className="px-6 py-4">
                <button className="text-slate-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-sm flex items-center">more_vert</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div className="px-6 py-4 bg-surface-container-low/30 border-t border-outline-variant/10 flex justify-between items-center">
          <p className="text-[10px] font-bold text-on-surface-variant">SHOWING 4 OF 1,244 DISCOVERED ASSETS</p>
          <div className="flex gap-2">
            <button className="p-1 rounded bg-white shadow-sm border border-outline-variant/10 text-slate-400 hover:text-primary">
              <span className="material-symbols-outlined text-sm flex items-center">chevron_left</span>
            </button>
            <button className="p-1 rounded bg-white shadow-sm border border-outline-variant/10 text-slate-400 hover:text-primary">
              <span className="material-symbols-outlined text-sm flex items-center">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AssetDiscovery;
