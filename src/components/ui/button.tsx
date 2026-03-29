import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "warm";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-warm-800 text-white hover:bg-warm-900 active:bg-warm-900",
  secondary:
    "bg-blush-100 text-warm-800 hover:bg-blush-200 active:bg-blush-300",
  outline:
    "border-2 border-warm-300 text-warm-800 hover:border-warm-400 hover:bg-warm-50 active:bg-warm-100",
  ghost:
    "text-warm-700 hover:bg-warm-100 active:bg-warm-200",
  warm:
    "bg-blush-400 text-white hover:bg-blush-500 active:bg-blush-500",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 rounded-full font-medium font-[family-name:var(--font-body)] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum-400 disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button, type ButtonProps };
