import { useState, type FormEvent } from 'react';
import { X, ArrowLeft, Mail, Loader2, CheckCircle } from 'lucide-react';
import OTPInput from './OTPInput';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'email' | 'otp' | 'success';

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call - replace with actual Firebase function call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // TODO: Call Firebase Cloud Function to send OTP
      // await sendOTPEmail(email);
      setStep('otp');
    } catch {
      setError('Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // TODO: Verify OTP with Firebase
      // await verifyOTP(email, otpString);
      setStep('success');
    } catch {
      setError('Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep('email');
    setOtp(Array(6).fill(''));
    setError('');
  };

  const handleClose = () => {
    setStep('email');
    setEmail('');
    setOtp(Array(6).fill(''));
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 animate-[fade-in_0.15s_ease]" onClick={handleClose}>
      <div className="relative w-full max-w-[380px] p-12 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl animate-[fade-in_0.2s_ease]" onClick={e => e.stopPropagation()}>
        <button className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-lg text-[var(--color-text-muted)] transition-all hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]" onClick={handleClose} aria-label="Close">
          <X size={20} />
        </button>

        {step === 'email' && (
          <form onSubmit={handleEmailSubmit} className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-14 h-14 bg-[var(--color-accent-muted)] rounded-lg text-[var(--color-accent)] mb-6">
              <Mail size={28} />
            </div>
            <h2 className="text-xl mb-1">Get Started</h2>
            <p className="text-sm mb-8 max-w-[280px] text-[var(--color-text-secondary)]">
              Enter your email to receive a 6-digit verification code.
            </p>

            <div className="w-full mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full py-2 px-4 text-sm bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] outline-none transition-all focus:border-[var(--color-accent)] placeholder:text-[var(--color-text-muted)]"
                disabled={isLoading}
                autoFocus
              />
            </div>

            {error && <p className="w-full py-2 px-4 mb-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-[13px] text-left">{error}</p>}

            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                'Continue'
              )}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleOTPSubmit} className="flex flex-col items-center text-center">
            <button
              type="button"
              className="flex items-center gap-1 self-start mb-6 text-[13px] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
              onClick={handleBack}
              disabled={isLoading}
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <h2 className="text-xl mb-1">Check your email</h2>
            <p className="text-sm mb-8 max-w-[280px] text-[var(--color-text-secondary)]">
              We sent a 6-digit code to <strong className="text-[var(--color-text-primary)]">{email}</strong>
            </p>

            <OTPInput
              value={otp}
              onChange={setOtp}
              disabled={isLoading}
            />

            {error && <p className="w-full py-2 px-4 mt-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-[13px] text-left">{error}</p>}

            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
              disabled={isLoading || otp.join('').length !== 6}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify'
              )}
            </button>

            <button type="button" className="mt-6 text-[13px] text-[var(--color-text-muted)]" disabled={isLoading}>
              Didn't receive a code? <span className="text-[var(--color-accent)] font-medium cursor-pointer hover:underline">Resend</span>
            </button>
          </form>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center text-center">
            <div className="text-[var(--color-accent)] mb-6">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-xl mb-1 text-[var(--color-accent)]">You're in!</h2>
            <p className="text-sm mb-8 max-w-[280px] text-[var(--color-text-secondary)]">
              Welcome to CloudAICAD. Your account has been verified.
            </p>
            <button onClick={handleClose} className="btn btn-primary w-full">
              Start Designing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
