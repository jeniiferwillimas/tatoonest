import { type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({
  label,
  error,
  className = "",
  id,
  ...props
}: TextareaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={[
          "w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2.5 text-sm outline-none transition-colors",
          "hover:border-[var(--accent)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]",
          error ? "border-red-500 hover:border-red-500 focus:border-red-500 focus:ring-red-500" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        rows={4}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
