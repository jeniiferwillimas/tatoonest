import { type HTMLAttributes, type ReactNode, type ElementType } from "react";

type TextVariant = "h1" | "h2" | "h3" | "h4" | "body" | "body-sm" | "caption" | "label" | "overline";

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  children: ReactNode;
  accent?: boolean;
  as?: ElementType;
}

const variantConfig: Record<TextVariant, { tag: ElementType; className: string }> = {
  h1: { tag: "h1", className: "text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl" },
  h2: { tag: "h2", className: "text-3xl font-bold tracking-tight sm:text-4xl" },
  h3: { tag: "h3", className: "text-xl font-semibold" },
  h4: { tag: "h4", className: "text-lg font-semibold" },
  body: { tag: "p", className: "text-base leading-relaxed" },
  "body-sm": { tag: "p", className: "text-sm leading-relaxed" },
  caption: { tag: "p", className: "text-xs" },
  label: { tag: "span", className: "text-sm font-medium" },
  overline: { tag: "span", className: "text-xs font-semibold uppercase tracking-[0.2em]" },
};

export default function Text({
  variant = "body",
  accent = false,
  as,
  className = "",
  children,
  ...props
}: TextProps) {
  const config = variantConfig[variant];
  const Tag = as || config.tag;

  return (
    <Tag
      className={[
        config.className,
        accent ? "text-[var(--accent)]" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}
