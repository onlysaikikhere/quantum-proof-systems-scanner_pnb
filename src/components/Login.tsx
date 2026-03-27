import { useState } from 'react';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      setErrorMsg('');
      try {
        const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/api/auth/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        if (res.ok) {
          setStep('otp');
        } else {
          setErrorMsg('Failed to send OTP. Is the backend running?');
        }
      } catch (err) {
        setErrorMsg('Network error connecting to backend.');
      }
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length === 6) {
      setLoading(true);
      setErrorMsg('');
      try {
        const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/api/auth/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp: code })
        });
        if (res.ok) {
          onLogin();
        } else {
          setErrorMsg('Invalid or expired OTP.');
        }
      } catch (err) {
        setErrorMsg('Network error.');
      }
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-md w-full bg-surface-container-lowest p-8 rounded-2xl shadow-lg border border-outline-variant/10">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shadow-inner">
            <span className="material-symbols-outlined text-[32px] text-primary" data-icon="shield_lock">shield_lock</span>
          </div>
        </div>
        <h2 className="text-2xl font-extrabold text-on-surface text-center mb-2">Quantum Shield</h2>
        <p className="text-sm font-medium text-on-surface-variant text-center mb-8">
          {step === 'login' ? 'Enterprise Secure Gateway' : 'Two-Factor Authentication'}
        </p>

        {step === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Work Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-surface-container-highest rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-medium text-on-surface"
                placeholder="admin@quantumshield.local"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-surface-container-highest rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-medium text-on-surface"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Sending OTP...' : 'Sign In with 2FA'} <span className="material-symbols-outlined text-[18px]">lock_open</span>
            </button>
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-outline-variant/30"></div>
              <span className="flex-shrink-0 mx-4 text-xs text-on-surface-variant font-bold uppercase">or</span>
              <div className="flex-grow border-t border-outline-variant/30"></div>
            </div>
            <button
              type="button"
              onClick={onLogin}
              className="w-full py-3 bg-surface-container-highest text-on-surface border border-outline-variant/30 rounded-xl font-bold text-sm hover:bg-surface-variant transition-colors flex items-center justify-center gap-2"
            >
              Direct Admin Access <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
            </button>
            {errorMsg && <p className="text-error text-xs font-bold text-center mt-2">{errorMsg}</p>}
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-6">
            <p className="text-xs font-bold text-on-surface-variant text-center mb-4">
              Enter the 6-digit code sent to {email}
            </p>
            <div className="flex justify-between gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  required
                  className="w-12 h-14 bg-surface-container-highest rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xl font-bold text-center text-on-surface"
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'} <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </button>
            {errorMsg && <p className="text-error text-xs font-bold text-center mt-2">{errorMsg}</p>}
            <button
              type="button"
              onClick={() => { setStep('login'); setErrorMsg(''); setOtp(['','','','','','']); }}
              className="w-full py-2 text-primary font-bold text-xs uppercase hover:underline mt-2"
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
