import { type InputHTMLAttributes } from "react";

interface DateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

export default function DateInput({
  label,
  error,
  className = "",
  id,
  ...props
}: DateInputProps) {
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
      <input
        id={inputId}
        type="date"
        className={[
          "w-full rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2.5 text-sm outline-none transition-colors",
          "hover:border-[var(--accent)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]",
          error ? "border-red-500 hover:border-red-500 focus:border-red-500 focus:ring-red-500" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
