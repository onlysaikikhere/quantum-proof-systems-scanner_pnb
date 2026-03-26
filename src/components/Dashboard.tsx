

const Dashboard = () => {
  return (
    <main className="ml-64 pt-24 pb-12 px-8">
      {/* Dashboard Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">Security Overview</h2>
          <p className="text-on-surface-variant text-sm mt-1">Real-time cryptographic asset monitoring and risk assessment.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white text-on-surface border border-outline-variant rounded hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[18px]" data-icon="calendar_today">calendar_today</span>
            Last 24 Hours
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-[18px]" data-icon="file_download">file_download</span>
            Export PDF
          </button>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 shadow-sm">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-3">Total Assets</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-on-surface tracking-tight">12,482</span>
            <span className="text-[10px] text-tertiary font-bold">+2.4%</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 shadow-sm">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-3">Public Web Apps</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-on-surface tracking-tight">154</span>
            <span className="text-[10px] text-slate-400 font-bold">Stable</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 shadow-sm">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-3">Active APIs</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-on-surface tracking-tight">892</span>
            <span className="text-[10px] text-tertiary font-bold">+12</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 shadow-sm">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-3">Servers</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-on-surface tracking-tight">410</span>
            <span className="text-[10px] text-slate-400 font-bold">Safe</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 shadow-sm">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-3">Expiring Certs</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-secondary-container tracking-tight">28</span>
            <span className="text-[10px] text-error font-bold">Action</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 shadow-sm ring-2 ring-error/5">
          <p className="text-[10px] font-bold text-error uppercase tracking-wider mb-3">High Risk Assets</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-error tracking-tight">3</span>
            <span className="text-[10px] text-error font-bold">-1</span>
          </div>
        </div>
      </div>

      {/* Analytical Bento Grid */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        
        {/* Risk Heatmap (Large) */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-sm font-bold text-on-surface tracking-tight uppercase">Quantum Vulnerability Heatmap</h3>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-tertiary"></span> Safe</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-secondary-container"></span> Moderate</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-error"></span> Critical</span>
            </div>
          </div>
          
          <div className="relative h-[300px] flex gap-2">
            {/* Y Axis Labels */}
            <div className="flex flex-col justify-between text-[10px] font-bold text-on-surface-variant uppercase py-2">
              <span>Broken Crypto</span>
              <span>Weak Keys</span>
              <span>Old TLS</span>
              <span>Misconfigured</span>
              <span>Quantum Ready</span>
            </div>

            {/* Heatmap Grid */}
            <div className="flex-1 grid grid-cols-10 grid-rows-5 gap-1.5">
              {/* Row 1 */}
              <div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/20 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div>
              {/* Row 2 */}
              <div className="bg-tertiary/10 rounded-sm"></div><div className="bg-secondary-container/20 rounded-sm"></div><div className="bg-secondary-container/40 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div>
              {/* Row 3 */}
              <div className="bg-error/30 rounded-sm"></div><div className="bg-error/50 rounded-sm"></div><div className="bg-error/20 rounded-sm"></div><div className="bg-secondary-container/40 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-secondary-container/30 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div>
              {/* Row 4 */}
              <div className="bg-secondary-container/20 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-secondary-container/30 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div><div className="bg-tertiary/10 rounded-sm"></div>
              {/* Row 5 */}
              <div className="bg-error/80 rounded-sm border border-error/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
              <div className="bg-error/40 rounded-sm"></div>
              <div className="bg-tertiary/10 rounded-sm"></div>
              <div className="bg-tertiary/10 rounded-sm"></div>
              <div className="bg-tertiary/10 rounded-sm"></div>
              <div className="bg-secondary-container/20 rounded-sm"></div>
              <div className="bg-tertiary/10 rounded-sm"></div>
              <div className="bg-tertiary/10 rounded-sm"></div>
              <div className="bg-tertiary/10 rounded-sm"></div>
              <div className="bg-tertiary/10 rounded-sm"></div>
            </div>
          </div>
          
          {/* X Axis Labels */}
          <div className="flex justify-between pl-20 mt-4 text-[10px] font-bold text-on-surface-variant uppercase">
            <span>Cluster A</span><span>Cluster B</span><span>Cluster C</span><span>Cluster D</span><span>Cluster E</span><span>Cluster F</span><span>Cluster G</span><span>Cluster H</span><span>Cluster I</span><span>Cluster J</span>
          </div>
        </div>

        {/* Asset Distribution (Small) */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col">
          <h3 className="text-sm font-bold text-on-surface tracking-tight uppercase mb-6">Asset Distribution</h3>
          <div className="flex-1 flex items-center justify-center relative">
            {/* Fake Pie Chart */}
            <div className="w-48 h-48 rounded-full border-[16px] border-slate-100 relative flex items-center justify-center">
              <div className="absolute inset-[-16px] rounded-full border-[16px] border-primary border-r-transparent border-b-transparent rotate-12"></div>
              <div className="absolute inset-[-16px] rounded-full border-[16px] border-secondary-container border-l-transparent border-t-transparent -rotate-45"></div>
              <div className="text-center">
                <p className="text-3xl font-extrabold text-on-surface">12k</p>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase">Total</p>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between items-center text-[11px]">
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-primary rounded-full"></span> Web Apps</span>
              <span className="font-bold">45%</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-secondary-container rounded-full"></span> APIs</span>
              <span className="font-bold">30%</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-slate-300 rounded-full"></span> Infrastructure</span>
              <span className="font-bold">25%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-6 rounded-xl shadow-sm">
          <h3 className="text-sm font-bold text-on-surface tracking-tight uppercase mb-6">Risk Profile Trend</h3>
          <div className="h-40 flex items-end gap-2">
            <div className="flex-1 bg-surface-container-high rounded-t-sm h-[30%]"></div>
            <div className="flex-1 bg-surface-container-high rounded-t-sm h-[45%]"></div>
            <div className="flex-1 bg-primary rounded-t-sm h-[60%]"></div>
            <div className="flex-1 bg-surface-container-high rounded-t-sm h-[50%]"></div>
            <div className="flex-1 bg-primary rounded-t-sm h-[85%]"></div>
            <div className="flex-1 bg-primary rounded-t-sm h-[95%]"></div>
            <div className="flex-1 bg-surface-container-high rounded-t-sm h-[70%]"></div>
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant">
            <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
          </div>
        </div>

        {/* Asset Inventory Table */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-outline-variant/5">
            <h3 className="text-sm font-bold text-on-surface tracking-tight uppercase">Recent Asset Inventory</h3>
            <button className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline">View All Assets</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="px-6 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Domain / IP</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider text-center">Risk</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">TLS</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Key Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                <tr className="hover:bg-surface-container-low transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-on-surface">api.nexus-core.com</p>
                    <p className="text-[10px] text-slate-400">192.168.1.104</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">REST API</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="w-2 h-2 rounded-full bg-tertiary inline-block"></span>
                  </td>
                  <td className="px-6 py-4 text-[11px] font-medium">v1.3 (TLS_AES_256)</td>
                  <td className="px-6 py-4 text-[11px] font-mono text-slate-500">ECC 384</td>
                </tr>
                
                <tr className="hover:bg-surface-container-low transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-on-surface">payment-gateway.internal</p>
                    <p className="text-[10px] text-slate-400">10.0.42.12</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold">SERVER</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="w-2 h-2 rounded-full bg-error inline-block animate-pulse"></span>
                  </td>
                  <td className="px-6 py-4 text-[11px] font-medium text-error">v1.1 (DEPRECATED)</td>
                  <td className="px-6 py-4 text-[11px] font-mono text-slate-500">RSA 1024</td>
                </tr>
                
                <tr className="hover:bg-surface-container-low transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-on-surface">dashboard.quantum.io</p>
                    <p className="text-[10px] text-slate-400">34.212.11.8</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-bold">WEB APP</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="w-2 h-2 rounded-full bg-secondary-container inline-block"></span>
                  </td>
                  <td className="px-6 py-4 text-[11px] font-medium">v1.2 (TLS_RSA_WITH)</td>
                  <td className="px-6 py-4 text-[11px] font-mono text-slate-500">RSA 2048</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* System Alerts / Activity Asymmetric Section */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-primary-container/10 p-6 rounded-xl border border-primary/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary" data-icon="auto_awesome">auto_awesome</span>
              <h3 className="text-xs font-bold text-primary uppercase">AI Insights</h3>
            </div>
            <p className="text-xs leading-relaxed text-on-surface mb-4">3 assets in <span className="font-bold">Zone B</span> are using legacy RSA-1024 encryption. Recommended upgrade to PQC-ready Kyber-768.</p>
            <button className="text-[10px] font-bold text-primary uppercase flex items-center gap-2 hover:gap-3 transition-all">
              Apply Remediation Plan <span className="material-symbols-outlined text-[14px]" data-icon="arrow_forward">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-9 bg-surface-container-lowest p-6 rounded-xl shadow-sm">
          <h3 className="text-sm font-bold text-on-surface tracking-tight uppercase mb-4">Real-time Entropy Scan</h3>
          
          <div className="flex items-center gap-6 overflow-hidden">
            <div className="flex-1 space-y-3">
              <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[75%]" style={{boxShadow: '0 0 10px rgba(0, 80, 203, 0.3)'}}></div>
              </div>
              <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                <div className="h-full bg-tertiary w-[92%]"></div>
              </div>
              <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                <div className="h-full bg-error w-[15%]"></div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono text-slate-400">SCANNING NODE_084...</span>
              <span className="text-[10px] font-mono text-slate-400">ENTROPY STABLE: 0.9982 bits/bit</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* FLOATING ACTION BUTTON */}
      <div className="fixed bottom-8 right-8 group z-50">
        <button className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-[28px]" data-icon="add">add</span>
        </button>
        <div className="absolute bottom-16 right-0 space-y-2 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-auto px-4 py-2 bg-white text-on-surface text-xs font-bold rounded-lg shadow-lg flex items-center gap-2 whitespace-nowrap border border-slate-100">
            <span className="material-symbols-outlined text-[18px]" data-icon="dns">dns</span>
            New Asset
          </button>
          <button className="w-auto px-4 py-2 bg-white text-on-surface text-xs font-bold rounded-lg shadow-lg flex items-center gap-2 whitespace-nowrap border border-slate-100">
            <span className="material-symbols-outlined text-[18px]" data-icon="cloud_sync">cloud_sync</span>
            Cloud Sync
          </button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
