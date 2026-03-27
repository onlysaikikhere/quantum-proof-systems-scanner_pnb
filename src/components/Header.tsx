interface HeaderProps {
  setSidebarOpen: (val: boolean) => void;
}

const Header = ({ setSidebarOpen }: HeaderProps) => {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 z-40 border-b border-slate-100/50">
      <div className="flex items-center gap-2 md:gap-4">
        <button onClick={() => setSidebarOpen(true)} className="md:hidden flex items-center justify-center p-2 text-slate-500 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="relative group hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-primary transition-colors" data-icon="search">search</span>
          <input className="bg-slate-50 border-none rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all w-full sm:w-64" placeholder="Quantum search..." type="text"/>
        </div>
        <div className="h-6 w-px bg-slate-200 mx-2"></div>
        <span className="text-blue-700 font-bold text-sm">PQC Readiness: 98%</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-slate-500">
          <a href="https://github.com/Mohitlikestocode/Quantum-Proof-Systems-Scanner_PNB" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center justify-center relative w-full sm:w-auto title='GitHub Repository'">
             <svg viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[20px]"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <button className="hover:text-primary transition-colors relative w-full sm:w-auto">
            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
          </button>
          <button className="hover:text-primary transition-colors w-full sm:w-auto">
            <span className="material-symbols-outlined" data-icon="history_edu">history_edu</span>
          </button>
        </div>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right">
            <p className="text-xs font-bold text-on-surface">Dr. Elena Vance</p>
            <p className="text-[10px] text-slate-500 uppercase font-semibold">Security Lead</p>
          </div>
          <img alt="User Profile" className="w-8 h-8 rounded-full bg-slate-200 ring-2 ring-primary/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4m4uQj26XYNGbRfWBWujIwu9Jbnk-BcynptYihITRejMLaKK9qDRkH8o2337gU4LWijGOvF5fP075QGs6vehIinXA9jikwqEUJe5wKq5b-z6OplJaLJTfS3gGr7KwIJ7Lkc19oWIAsmmVKD5KsxjLoRBClJDXoS8ekoO9gDLDE0W2OK_OLS5_1ovnBtspxA1Xm5DhyBPzSiUZZawqmIY31645DtCA6PNNLRCx4xPzS7wwdrt_TK4uNr5ayz9blsD0coP1d4xLp97S"/>
        </div>
      </div>
    </header>
  );
};

export default Header;
