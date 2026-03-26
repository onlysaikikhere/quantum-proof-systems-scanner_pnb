const Reports = () => {
  return (
    <main className="md:ml-64 pt-16 min-h-screen">
      <div className="max-w-[1200px] mx-auto p-12">
        {/* Page Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-[1.75rem] font-bold tracking-tight text-on-surface mb-2">Reports & Audit Logs</h2>
            <p className="text-on-surface-variant max-w-xl">Comprehensive analytical oversight of your organization's transition to post-quantum cryptographic standards.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => alert("Redirecting to AI Scheduler...")} className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest text-on-surface border border-outline-variant/20 rounded-lg hover:bg-surface-container-low transition-colors shadow-sm font-medium text-sm w-full sm:w-auto">
              <span className="material-symbols-outlined text-lg" data-icon="calendar_month">calendar_month</span>
              Schedule
            </button>
            <button onClick={() => window.open('http://localhost:8000/api/reports/download')} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-br from-primary to-primary-container text-white rounded-lg font-bold shadow-md hover:shadow-lg active:scale-95 transition-all text-sm w-full sm:w-auto">
              <span className="material-symbols-outlined text-lg" data-icon="download">download</span>
              Export Report
            </button>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-8">
          {/* Smart Reporting: AI Summary (NEW) */}
          <section className="col-span-12 lg:col-span-8">
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-outline-variant/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface">Smart AI Synthesis</h3>
                </div>
                <span className="px-2.5 py-1 bg-tertiary/10 text-tertiary text-[0.6875rem] font-bold uppercase tracking-wider rounded">Report Generated Today</span>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-surface-container-low rounded-xl border-l-4 border-primary">
                  <h4 className="text-sm font-bold text-primary mb-2 uppercase tracking-tight">Executive Summary</h4>
                  <p className="text-[0.875rem] leading-relaxed text-on-surface-variant">
                    The system has reached a <span className="text-primary font-semibold">98% PQC Readiness rating</span>. Critical infrastructure components have successfully transitioned to Kyber-768 and Dilithium-3 implementations. Our AI analysis identifies that the remaining 2% represents legacy IoT endpoints that require firmware intervention. No immediate high-priority vulnerabilities were detected during the last 24-hour cycle.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-surface-container-lowest border border-outline-variant/10 rounded-lg flex flex-col items-start">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-tertiary text-lg" data-icon="check_circle">check_circle</span>
                      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Risk Mitigation</span>
                    </div>
                    <p className="text-sm text-on-surface font-medium leading-snug">Quantum-safe tunnel established for 100% of inter-continental data transits.</p>
                  </div>
                  <div className="p-5 bg-surface-container-lowest border border-outline-variant/10 rounded-lg flex flex-col items-start">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-secondary text-lg" data-icon="info">info</span>
                      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Attention Required</span>
                    </div>
                    <p className="text-sm text-on-surface font-medium leading-snug">Observed 3 deprecated TLS 1.2 handshakes from external vendor nodes.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Export & Schedule Section */}
          <section className="col-span-12 lg:col-span-4 flex flex-col gap-8">
            {/* Export Options */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-outline-variant/10">
              <h3 className="text-sm font-bold text-on-surface mb-6 uppercase tracking-wider">Export Document</h3>
              <div className="space-y-3">
                <button onClick={() => window.open('http://localhost:8000/api/reports/download')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low border border-transparent hover:border-outline-variant/20 transition-all group">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-error" data-icon="picture_as_pdf">picture_as_pdf</span>
                    <span className="text-sm font-medium">Standard PDF Report</span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" data-icon="chevron_right">chevron_right</span>
                </button>
                <button onClick={() => window.open('http://localhost:8000/api/reports/download')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low border border-transparent hover:border-outline-variant/20 transition-all group">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary" data-icon="javascript">javascript</span>
                    <span className="text-sm font-medium">Data Export (JSON)</span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" data-icon="chevron_right">chevron_right</span>
                </button>
                <button onClick={() => alert("Email Sent!")} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low border border-transparent hover:border-outline-variant/20 transition-all group">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary" data-icon="mail">mail</span>
                    <span className="text-sm font-medium">Email Report</span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" data-icon="chevron_right">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Scheduling */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-outline-variant/10">
              <h3 className="text-sm font-bold text-on-surface mb-6 uppercase tracking-wider">Automated Scheduling</h3>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative">
                    <input defaultChecked className="peer hidden" name="sched" type="radio" />
                    <div className="w-5 h-5 rounded-full border-2 border-outline peer-checked:border-primary peer-checked:bg-primary transition-all"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 text-[10px] text-white">
                      <span className="material-symbols-outlined text-[12px] font-bold" data-icon="check">check</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Daily Digest</p>
                    <p className="text-xs text-on-surface-variant">Every morning at 08:00 AM UTC</p>
                  </div>
                </label>
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative">
                    <input className="peer hidden" name="sched" type="radio" />
                    <div className="w-5 h-5 rounded-full border-2 border-outline peer-checked:border-primary peer-checked:bg-primary transition-all"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 text-[10px] text-white">
                      <span className="material-symbols-outlined text-[12px] font-bold" data-icon="check">check</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Weekly Review</p>
                    <p className="text-xs text-on-surface-variant">Mondays at 00:00 AM UTC</p>
                  </div>
                </label>
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative">
                    <input className="peer hidden" name="sched" type="radio" />
                    <div className="w-5 h-5 rounded-full border-2 border-outline peer-checked:border-primary peer-checked:bg-primary transition-all"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 text-[10px] text-white">
                      <span className="material-symbols-outlined text-[12px] font-bold" data-icon="check">check</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Custom Interval</p>
                    <p className="text-xs text-on-surface-variant">Configure frequency and time</p>
                  </div>
                </label>
              </div>
            </div>
          </section>

          {/* Historical Audit Log */}
          <section className="col-span-12">
            <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-outline-variant/10 overflow-hidden">
              <div className="px-8 py-6 border-b border-surface-container-low flex items-center justify-between">
                <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">Historical Audit Logs</h3>
                <div className="flex items-center gap-2">
                  <input className="px-4 py-1.5 text-xs bg-surface-container-low border-none rounded-lg focus:ring-1 focus:ring-primary w-64 outline-none w-full sm:w-64" placeholder="Filter by date or ID..." type="text" />
                  <button className="p-1.5 hover:bg-surface-container-low rounded transition-colors">
                    <span className="material-symbols-outlined text-on-surface-variant" data-icon="filter_list">filter_list</span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container-low/50">
                      <th className="px-8 py-3 text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest">Report ID</th>
                      <th className="px-8 py-3 text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest">Timestamp</th>
                      <th className="px-8 py-3 text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest">Status Score</th>
                      <th className="px-8 py-3 text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest">Generated By</th>
                      <th className="px-8 py-3 text-[0.6875rem] font-bold text-on-surface-variant uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-low">
                    <tr className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-8 py-4 text-xs font-mono font-bold text-primary">#RP-2023-0492</td>
                      <td className="px-8 py-4 text-sm text-on-surface-variant">Oct 24, 2023 14:22</td>
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                            <div className="h-full bg-tertiary w-[98%]"></div>
                          </div>
                          <span className="text-xs font-bold text-tertiary">98%</span>
                        </div>
                      </td>
                      <td className="px-8 py-4 text-sm font-medium">System (Auto)</td>
                      <td className="px-8 py-4 text-right">
                        <button className="text-on-surface-variant hover:text-primary transition-colors w-full sm:w-auto">
                          <span className="material-symbols-outlined" data-icon="visibility">visibility</span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-8 py-4 text-xs font-mono font-bold text-primary">#RP-2023-0491</td>
                      <td className="px-8 py-4 text-sm text-on-surface-variant">Oct 23, 2023 14:21</td>
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                            <div className="h-full bg-tertiary w-[97%]"></div>
                          </div>
                          <span className="text-xs font-bold text-tertiary">97%</span>
                        </div>
                      </td>
                      <td className="px-8 py-4 text-sm font-medium">Admin (j.doe)</td>
                      <td className="px-8 py-4 text-right">
                        <button className="text-on-surface-variant hover:text-primary transition-colors w-full sm:w-auto">
                          <span className="material-symbols-outlined" data-icon="visibility">visibility</span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-8 py-4 text-xs font-mono font-bold text-primary">#RP-2023-0490</td>
                      <td className="px-8 py-4 text-sm text-on-surface-variant">Oct 22, 2023 14:20</td>
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                            <div className="h-full bg-secondary w-[85%]"></div>
                          </div>
                          <span className="text-xs font-bold text-secondary">85%</span>
                        </div>
                      </td>
                      <td className="px-8 py-4 text-sm font-medium">System (Auto)</td>
                      <td className="px-8 py-4 text-right">
                        <button className="text-on-surface-variant hover:text-primary transition-colors w-full sm:w-auto">
                          <span className="material-symbols-outlined" data-icon="visibility">visibility</span>
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-8 py-4 text-xs font-mono font-bold text-primary">#RP-2023-0489</td>
                      <td className="px-8 py-4 text-sm text-on-surface-variant">Oct 21, 2023 14:22</td>
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                            <div className="h-full bg-error w-[62%]"></div>
                          </div>
                          <span className="text-xs font-bold text-error">62%</span>
                        </div>
                      </td>
                      <td className="px-8 py-4 text-sm font-medium">System (Auto)</td>
                      <td className="px-8 py-4 text-right">
                        <button className="text-on-surface-variant hover:text-primary transition-colors w-full sm:w-auto">
                          <span className="material-symbols-outlined" data-icon="visibility">visibility</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="px-8 py-4 bg-surface-container-low/30 flex items-center justify-between">
                <span className="text-xs text-on-surface-variant font-medium">Showing 4 of 480 reports</span>
                <div className="flex items-center gap-1">
                  <button className="px-3 py-1 text-xs font-bold text-on-surface bg-surface-container-lowest border border-outline-variant/20 rounded w-full sm:w-auto">Prev</button>
                  <button className="px-3 py-1 text-xs font-bold text-white bg-primary rounded w-full sm:w-auto">1</button>
                  <button className="px-3 py-1 text-xs font-bold text-on-surface hover:bg-surface-container-highest rounded transition-colors w-full sm:w-auto">2</button>
                  <button className="px-3 py-1 text-xs font-bold text-on-surface hover:bg-surface-container-highest rounded transition-colors w-full sm:w-auto">3</button>
                  <button className="px-3 py-1 text-xs font-bold text-on-surface bg-surface-container-lowest border border-outline-variant/20 rounded w-full sm:w-auto">Next</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Reports;
