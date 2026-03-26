
const AssetInventory = () => {
  return (
    <main className="ml-64 pt-24 pb-12 px-8">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-[1.75rem] font-bold text-on-surface leading-tight tracking-tight headline-md">Asset Inventory</h1>
        <p className="text-on-surface-variant body-md mt-1">Comprehensive visibility into all network infrastructure and software components.</p>
      </div>

      {/* Bento Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <span className="text-on-surface-variant text-[0.6875rem] font-bold uppercase tracking-wider label-sm">Total Assets</span>
            <span className="material-symbols-outlined text-primary opacity-60" data-icon="inventory">inventory</span>
          </div>
          <div className="text-3xl font-bold text-on-surface display-lg">24,812</div>
          <div className="mt-4 flex items-center text-tertiary text-xs font-semibold">
            <span className="material-symbols-outlined text-xs mr-1" data-icon="trending_up">trending_up</span>
            +12% from last month
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-secondary shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <span className="text-on-surface-variant text-[0.6875rem] font-bold uppercase tracking-wider label-sm">Managed Assets</span>
            <span className="material-symbols-outlined text-secondary opacity-60" data-icon="admin_panel_settings">admin_panel_settings</span>
          </div>
          <div className="text-3xl font-bold text-on-surface display-lg">21,405</div>
          <div className="mt-4 text-on-surface-variant text-xs font-medium">
            86.2% of total fleet
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-outline shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <span className="text-on-surface-variant text-[0.6875rem] font-bold uppercase tracking-wider label-sm">Shadow Assets</span>
            <span className="material-symbols-outlined text-outline opacity-60" data-icon="visibility_off">visibility_off</span>
          </div>
          <div className="text-3xl font-bold text-on-surface display-lg">342</div>
          <div className="mt-4 flex items-center text-error text-xs font-semibold">
            <span className="material-symbols-outlined text-xs mr-1" data-icon="warning">warning</span>
            Requires immediate audit
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-error shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <span className="text-on-surface-variant text-[0.6875rem] font-bold uppercase tracking-wider label-sm">High Risk</span>
            <span className="material-symbols-outlined text-error opacity-60" data-icon="report">report</span>
          </div>
          <div className="text-3xl font-bold text-on-surface display-lg">18</div>
          <div className="mt-4 flex items-center text-error text-xs font-semibold">
            <span className="material-symbols-outlined text-xs mr-1" data-icon="priority_high">priority_high</span>
            Across 3 critical nodes
          </div>
        </div>
      </div>

      {/* Filters and Table Card */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[600px] mb-6">
        {/* Filter Bar */}
        <div className="p-4 bg-surface-container-low flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" data-icon="search">search</span>
              <input className="bg-white border text-slate-800 border-outline-variant/30 rounded-lg py-2 pl-10 pr-4 text-sm w-80 focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Filter assets by name, IP, or vendor..." type="text" />
            </div>
            <div className="flex gap-2 text-slate-800">
              <select className="bg-white border outline-none border-outline-variant/30 rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-2 focus:ring-primary/20 text-on-surface-variant font-medium">
                <option>Asset Type</option>
                <option>Hardware</option>
                <option>Software</option>
              </select>
              <select className="bg-white border outline-none border-outline-variant/30 rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-2 focus:ring-primary/20 text-on-surface-variant font-medium">
                <option>Status</option>
                <option>Safe</option>
                <option>Warning</option>
                <option>Critical</option>
              </select>
              <select className="bg-white border outline-none border-outline-variant/30 rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-2 focus:ring-primary/20 text-on-surface-variant font-medium">
                <option>Risk Level</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-surface-container-highest text-on-surface px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-surface-variant transition-colors border border-outline-variant/20">
              <span className="material-symbols-outlined text-sm" data-icon="file_download">file_download</span>
              Export
            </button>
            <button className="bg-gradient-to-br from-primary to-primary-container text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-sm" data-icon="add">add</span>
              Add Asset
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/10">
                <th className="px-6 py-4 text-[0.6875rem] font-bold uppercase tracking-wider text-on-surface-variant label-sm">Asset Name</th>
                <th className="px-6 py-4 text-[0.6875rem] font-bold uppercase tracking-wider text-on-surface-variant label-sm">Status</th>
                <th className="px-6 py-4 text-[0.6875rem] font-bold uppercase tracking-wider text-on-surface-variant label-sm">Type</th>
                <th className="px-6 py-4 text-[0.6875rem] font-bold uppercase tracking-wider text-on-surface-variant label-sm">Region</th>
                <th className="px-6 py-4 text-[0.6875rem] font-bold uppercase tracking-wider text-on-surface-variant label-sm">IP Address</th>
                <th className="px-6 py-4 text-[0.6875rem] font-bold uppercase tracking-wider text-on-surface-variant label-sm">Vendor</th>
                <th className="px-6 py-4 text-[0.6875rem] font-bold uppercase tracking-wider text-on-surface-variant label-sm text-right">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {/* Row 1 */}
              <tr className="hover:bg-surface-container-low transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-lg" data-icon="dns">dns</span>
                    </div>
                    <div>
                      <div className="font-semibold text-on-surface text-sm">PROD-DB-CORE-01</div>
                      <div className="text-xs text-on-surface-variant">PostgreSQL Cluster</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-tertiary-container text-on-tertiary-container">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary mr-1.5"></span>
                    Safe
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">Software</td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">US-East-1</td>
                <td className="px-6 py-4 text-sm font-mono text-on-surface-variant">10.0.4.122</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-slate-500" data-icon="cloud">cloud</span>
                    <span className="text-sm text-on-surface-variant">AWS</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-tertiary rounded-full" style={{ width: '15%' }}></div>
                    </div>
                    <span className="text-xs font-bold text-tertiary">15%</span>
                  </div>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-surface-container-low transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-secondary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary text-lg" data-icon="router">router</span>
                    </div>
                    <div>
                      <div className="font-semibold text-on-surface text-sm">HQ-GATEWAY-ISR</div>
                      <div className="text-xs text-on-surface-variant">Cisco ISR 4451</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-container/20 text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-1.5"></span>
                    Warning
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">Hardware</td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">EU-West-2</td>
                <td className="px-6 py-4 text-sm font-mono text-on-surface-variant">192.168.1.1</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-slate-500" data-icon="hub">hub</span>
                    <span className="text-sm text-on-surface-variant">Cisco</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-secondary-container rounded-full" style={{ width: '58%' }}></div>
                    </div>
                    <span className="text-xs font-bold text-secondary">58%</span>
                  </div>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-surface-container-low transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-error/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-error text-lg" data-icon="terminal">terminal</span>
                    </div>
                    <div>
                      <div className="font-semibold text-on-surface text-sm">LEGACY-FTP-SRV</div>
                      <div className="text-xs text-on-surface-variant">Ubuntu 16.04 LTS</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-container text-on-error-container">
                    <span className="w-1.5 h-1.5 rounded-full bg-error mr-1.5"></span>
                    Critical
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">Software</td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">US-West-2</td>
                <td className="px-6 py-4 text-sm font-mono text-on-surface-variant">10.0.8.44</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-slate-500" data-icon="window">window</span>
                    <span className="text-sm text-on-surface-variant">Azure</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-error rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <span className="text-xs font-bold text-error">92%</span>
                  </div>
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="hover:bg-surface-container-low transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-surface-tint/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-surface-tint text-lg" data-icon="laptop">laptop</span>
                    </div>
                    <div>
                      <div className="font-semibold text-on-surface text-sm">WKS-8821-M1</div>
                      <div className="text-xs text-on-surface-variant">MacBook Pro 16"</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-tertiary-container text-on-tertiary-container">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary mr-1.5"></span>
                    Safe
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">Hardware</td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">Remote</td>
                <td className="px-6 py-4 text-sm font-mono text-on-surface-variant">172.16.4.15</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-on-surface-variant">Apple Inc.</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-tertiary rounded-full" style={{ width: '8%' }}></div>
                    </div>
                    <span className="text-xs font-bold text-tertiary">8%</span>
                  </div>
                </td>
              </tr>
              {/* Row 5 */}
              <tr className="hover:bg-surface-container-low transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-lg" data-icon="cloud">cloud</span>
                    </div>
                    <div>
                      <div className="font-semibold text-on-surface text-sm">S3-ARCHIVE-GOLD</div>
                      <div className="text-xs text-on-surface-variant">Object Storage</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-container/20 text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-1.5"></span>
                    Warning
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">Software</td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">US-East-1</td>
                <td className="px-6 py-4 text-sm font-mono text-on-surface-variant">-</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-slate-500" data-icon="cloud">cloud</span>
                    <span className="text-sm text-on-surface-variant">AWS</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-secondary-container rounded-full" style={{ width: '42%' }}></div>
                    </div>
                    <span className="text-xs font-bold text-secondary">42%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-outline-variant/10 flex items-center justify-between bg-surface-container-low">
          <div className="text-xs text-on-surface-variant font-medium">
            Showing 1-10 of 24,812 assets
          </div>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant/30 text-on-surface-variant hover:bg-white transition-colors">
              <span className="material-symbols-outlined text-sm" data-icon="chevron_left">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white text-xs font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant/30 text-on-surface-variant hover:bg-white transition-colors text-xs font-medium">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant/30 text-on-surface-variant hover:bg-white transition-colors text-xs font-medium">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant/30 text-on-surface-variant hover:bg-white transition-colors">
              <span className="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contextual Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-on-surface text-base">Asset Distribution by Vendor</h3>
            <button className="text-primary text-xs font-bold uppercase tracking-wider hover:underline">Full Report</button>
          </div>
          <div className="h-48 flex items-end justify-between gap-4 px-4">
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="w-full bg-primary/20 rounded-t-sm relative group cursor-pointer" style={{ height: '80%' }}>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">AWS: 12,402</div>
                <div className="absolute inset-0 bg-primary opacity-40 group-hover:opacity-60 transition-opacity"></div>
              </div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">AWS</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="w-full bg-primary/20 rounded-t-sm relative group cursor-pointer" style={{ height: '45%' }}>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Azure: 6,112</div>
                <div className="absolute inset-0 bg-primary opacity-40 group-hover:opacity-60 transition-opacity"></div>
              </div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">Azure</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="w-full bg-primary/20 rounded-t-sm relative group cursor-pointer" style={{ height: '30%' }}>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Cisco: 3,921</div>
                <div className="absolute inset-0 bg-primary opacity-40 group-hover:opacity-60 transition-opacity"></div>
              </div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">Cisco</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="w-full bg-primary/20 rounded-t-sm relative group cursor-pointer" style={{ height: '15%' }}>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Other: 2,377</div>
                <div className="absolute inset-0 bg-primary opacity-40 group-hover:opacity-60 transition-opacity"></div>
              </div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">Other</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary to-primary-container p-6 rounded-xl shadow-lg relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <h3 className="text-white font-bold text-base mb-2 relative z-10">Automated Discovery</h3>
          <p className="text-blue-100 text-xs leading-relaxed mb-6 relative z-10">Discovery agents identified 14 new endpoints in the last 24 hours. Would you like to categorize them now?</p>
          <button className="w-full py-2.5 bg-white text-primary text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-sm relative z-10">Review New Assets</button>
          <div className="mt-4 pt-4 border-t border-white/10 relative z-10">
            <div className="flex items-center gap-2 text-[10px] font-bold text-blue-200 uppercase tracking-widest">
              <span className="material-symbols-outlined text-xs" data-icon="sync">sync</span>
              Next scan in 14m 22s
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AssetInventory;
