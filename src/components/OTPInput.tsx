import { useRef, useEffect, type KeyboardEvent, type ClipboardEvent } from 'react';

interface OTPInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

export default function OTPInput({ value, onChange, disabled = false }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, digit: string) => {
    if (!/^\d*$/.test(digit)) return;

    const newValue = [...value];
    newValue[index] = digit.slice(-1);
    onChange(newValue);

    // Auto-focus next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newValue = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    onChange(newValue);

    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  return (
    <div className="flex justify-center gap-2 max-[400px]:gap-1">
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`
            w-11 h-13 text-xl font-semibold text-center
            bg-[var(--color-bg-primary)] border rounded-lg
            text-[var(--color-text-primary)] outline-none
            transition-all
            focus:border-[var(--color-accent)]
            disabled:opacity-50 disabled:cursor-not-allowed
            max-[400px]:w-9 max-[400px]:h-11 max-[400px]:text-base
            ${value[index] ? 'border-[var(--color-accent)] bg-[var(--color-accent-muted)]' : 'border-[var(--color-border)]'}
          `}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
}
