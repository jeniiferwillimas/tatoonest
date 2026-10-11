import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  icon,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={[
            "w-full rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2.5 text-sm outline-none transition-colors",
            "hover:border-[var(--accent)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]",
            icon ? "pl-10" : "",
            error ? "border-red-500 hover:border-red-500 focus:border-red-500 focus:ring-red-500" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
