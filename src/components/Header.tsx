

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 z-40 border-b border-slate-100/50">
      <div className="flex items-center gap-4">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-primary transition-colors" data-icon="search">search</span>
          <input className="bg-slate-50 border-none rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Quantum search..." type="text"/>
        </div>
        <div className="h-6 w-px bg-slate-200 mx-2"></div>
        <span className="text-blue-700 font-bold text-sm">PQC Readiness: 98%</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-slate-500">
          <button className="hover:text-primary transition-colors relative">
            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
          </button>
          <button className="hover:text-primary transition-colors">
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
