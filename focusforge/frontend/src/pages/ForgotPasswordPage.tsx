import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, ArrowLeft, Mail, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { useSignIn } from '@clerk/clerk-react';

export const ForgotPasswordPage: React.FC = () => {
  const { signIn, isLoaded } = useSignIn();
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signIn || !isLoaded) return;
    setLoading(true);
    setError('');
    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      setStep('code');
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || 'Failed to send reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signIn || !isLoaded) return;
    setLoading(true);
    setError('');
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password: newPassword,
      });
      if (result.status === 'complete') {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || 'Invalid code or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/30">
            <Brain className="w-8 h-8 text-indigo-400" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Reset Password</h2>
          <p className="text-slate-400 mt-2 text-sm">
            {step === 'email' ? "Enter your email and we'll send a reset code." : `Enter the code sent to ${email}`}
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl">
          {success ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Password Reset!</h3>
              <p className="text-slate-400 text-sm">Your password has been updated successfully.</p>
              <Link
                to="/login"
                className="mt-4 block w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors text-center text-sm"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {step === 'email' ? (
                <form onSubmit={handleSendCode} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="h-5 w-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-50 flex items-center justify-center"
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Send Reset Code'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Verification Code</label>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-center tracking-widest font-mono"
                      placeholder="Enter code from email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">New Password</label>
                    <div className="relative">
                      <Lock className="h-5 w-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        placeholder="••••••••"
                        minLength={8}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-50 flex items-center justify-center"
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Reset Password'}
                  </button>
                </form>
              )}

              <div className="text-center mt-6">
                <Link to="/login" className="inline-flex items-center text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
