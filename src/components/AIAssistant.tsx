

const AIAssistant = () => {
  return (
    <div className="flex-1">
      <main className="ml-64 pt-24 pb-8 px-8 min-h-screen bg-background relative">
        <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col gap-6">
          {/* Page Header */}
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">AI Command Center</h2>
              <p className="text-on-surface-variant text-sm mt-1">Intelligent automation and cryptographic guidance</p>
            </div>
            <div className="flex gap-2">
              <div className="bg-surface-container-lowest px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 border border-outline-variant/10">
                <span className="text-xs font-bold text-on-surface-variant">ENGINE:</span>
                <span className="text-xs font-bold text-primary">QUANTUM-GPT-4</span>
              </div>
            </div>
          </div>

          {/* Chat Interface Bento */}
          <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
            {/* History & Settings Panel */}
            <div className="col-span-3 flex flex-col gap-4">
              <div className="bg-surface-container-low rounded-xl p-4 flex-1 flex flex-col overflow-hidden">
                <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase mb-4">Recent Conversations</p>
                <div className="space-y-3 overflow-y-auto pr-2">
                  <div className="p-3 bg-surface-container-lowest rounded-lg border-l-4 border-primary shadow-sm cursor-pointer">
                    <p className="text-xs font-bold truncate">TLS 1.3 Transition Plan</p>
                    <p className="text-[10px] text-on-surface-variant mt-1">2 mins ago</p>
                  </div>
                  <div className="p-3 hover:bg-surface-container-highest/50 rounded-lg cursor-pointer transition-colors">
                    <p className="text-xs font-medium text-on-surface-variant truncate">Symmetric Key Rotation</p>
                    <p className="text-[10px] text-on-surface-variant/60 mt-1">1 hour ago</p>
                  </div>
                  <div className="p-3 hover:bg-surface-container-highest/50 rounded-lg cursor-pointer transition-colors">
                    <p className="text-xs font-medium text-on-surface-variant truncate">NIST Compliance Audit</p>
                    <p className="text-[10px] text-on-surface-variant/60 mt-1">Yesterday</p>
                  </div>
                </div>
              </div>
              
              {/* Suggested Actions Bento Block */}
              <div className="bg-surface-container-highest rounded-xl p-4">
                <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase mb-3">Quick Commands</p>
                <div className="grid grid-cols-1 gap-2">
                  <button className="text-left px-3 py-2 bg-white/50 hover:bg-white text-[11px] font-medium rounded-lg border border-outline-variant/10 transition-all flex items-center justify-between group">
                    <span>Scan pnb.com</span>
                    <span className="material-symbols-outlined text-[14px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">rocket_launch</span>
                  </button>
                  <button className="text-left px-3 py-2 bg-white/50 hover:bg-white text-[11px] font-medium rounded-lg border border-outline-variant/10 transition-all flex items-center justify-between group">
                    <span>Generate report</span>
                    <span className="material-symbols-outlined text-[14px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">description</span>
                  </button>
                  <button className="text-left px-3 py-2 bg-white/50 hover:bg-white text-[11px] font-medium rounded-lg border border-outline-variant/10 transition-all flex items-center justify-between group">
                    <span>Schedule weekly scan</span>
                    <span className="material-symbols-outlined text-[14px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">event_repeat</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Conversational Canvas */}
            <div className="col-span-9 flex flex-col bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/5 overflow-hidden">
              {/* Chat Scroll Area */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* AI Greeting */}
                <div className="flex gap-4 max-w-3xl">
                  <div className="w-10 h-10 rounded-lg bg-primary-container flex-shrink-0 flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-surface-container-low p-5 rounded-2xl rounded-tl-none">
                      <p className="text-sm leading-relaxed text-on-surface">
                        Greetings, Administrator. I am your Precise Sentinel AI. I can help you orchestrate scans, analyze cryptographic vulnerabilities, or automate reporting across your quantum-vulnerable infrastructure.
                      </p>
                      <p className="text-sm leading-relaxed text-on-surface mt-3">
                        What would you like to execute today?
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[11px] font-bold hover:bg-primary/10 transition-colors">
                        "Explain TLS 1.0 vulnerability"
                      </button>
                      <button className="px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[11px] font-bold hover:bg-primary/10 transition-colors">
                        "Suggest migration to PQC"
                      </button>
                    </div>
                  </div>
                </div>

                {/* User Input Example */}
                <div className="flex gap-4 max-w-3xl ml-auto flex-row-reverse">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex-shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl text-on-surface-variant">person</span>
                  </div>
                  <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-none shadow-md shadow-primary/20">
                    <p className="text-sm font-medium">Scan internal-gateway.pnb.com and email the summary to security@corp.com</p>
                  </div>
                </div>

                {/* Action Execution / Confirmation UI */}
                <div className="flex gap-4 max-w-3xl">
                  <div className="w-10 h-10 rounded-lg bg-primary-container flex-shrink-0 flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="bg-surface-container-low p-5 rounded-2xl rounded-tl-none border border-primary/10">
                      <p className="text-sm font-bold text-primary flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-sm">settings_suggest</span>
                        EXECUTING COMMAND CHAIN...
                      </p>
                      <div className="space-y-3">
                        {/* Success State */}
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-tertiary/20">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-tertiary flex items-center justify-center">
                              <span className="material-symbols-outlined text-[14px] text-white">check</span>
                            </div>
                            <span className="text-xs font-semibold text-on-surface">Scan initiated: pnb.com</span>
                          </div>
                          <span className="text-[10px] font-bold text-tertiary">SUCCESS</span>
                        </div>
                        {/* In Progress State */}
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-primary/20">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                              <span className="material-symbols-outlined text-[14px] text-primary">sync</span>
                            </div>
                            <span className="text-xs font-semibold text-on-surface">Compiling executive summary</span>
                          </div>
                          <span className="text-[10px] font-bold text-primary">PROCESSING</span>
                        </div>
                        {/* Failure/Pending State */}
                        <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-outline-variant/30">
                          <div className="flex items-center gap-3 opacity-50">
                            <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center">
                              <span className="material-symbols-outlined text-[14px]">mail</span>
                            </div>
                            <span className="text-xs font-semibold text-on-surface">Email delivery: security@corp.com</span>
                          </div>
                          <span className="text-[10px] font-bold text-on-surface-variant/40 tracking-widest">QUEUED</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-6 bg-surface-container-low border-t border-outline-variant/10">
                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-2 focus-within:ring-2 ring-primary/20 transition-all flex items-end gap-3 shadow-inner">
                  <button className="p-2 hover:bg-surface-container-low rounded-lg transition-colors text-on-surface-variant">
                    <span className="material-symbols-outlined">attach_file</span>
                  </button>
                  <textarea className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium py-2 resize-none max-h-32 min-h-[40px] text-on-surface" placeholder="Type a command (e.g., 'Schedule a full CBOM audit for next Monday at 9AM')..."></textarea>
                  <button className="bg-primary text-white h-10 w-10 rounded-lg flex items-center justify-center hover:bg-primary-container active:scale-95 transition-all shadow-md shadow-primary/20">
                    <span className="material-symbols-outlined">arrow_upward</span>
                  </button>
                </div>
                <div className="flex justify-between items-center mt-3 px-1">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-on-surface-variant cursor-pointer hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[14px]">history</span>
                      RESTORE SESSION
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-on-surface-variant cursor-pointer hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[14px]">auto_fix</span>
                      MODEL SETTINGS
                    </div>
                  </div>
                  <p className="text-[10px] text-on-surface-variant/60 font-medium">Press ⌘ + Enter to send</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contextual Info Floating Card (Editorial Detail) */}
        <div className="fixed bottom-8 right-8 w-72 glass-panel rounded-xl p-4 shadow-2xl border border-white/40 border-l-4 border-l-primary z-50">
          <div className="flex items-start justify-between mb-3">
            <span className="text-[10px] font-extrabold tracking-widest text-primary uppercase">Active Intelligence</span>
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          </div>
          <p className="text-xs font-bold text-on-surface mb-2">PQC Discovery Engine</p>
          <p className="text-[11px] leading-relaxed text-on-surface-variant">
            The assistant is currently cross-referencing your <span className="font-bold text-on-surface">Kyber-768</span> implementation against the latest NIST draft standards.
          </p>
          <div className="mt-4 pt-3 border-t border-outline-variant/20">
            <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-3/4 rounded-full"></div>
            </div>
            <p className="text-[9px] text-on-surface-variant mt-2 font-medium">75% Context Synchronization Complete</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIAssistant;
