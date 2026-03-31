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
    "bg-pink-500 text-white hover:bg-pink-600 active:bg-pink-700",
  secondary:
    "bg-pink-100 text-berry-800 hover:bg-pink-200 active:bg-pink-300",
  outline:
    "border-2 border-cream-400 text-cream-800 hover:border-pink-300 hover:bg-pink-50 active:bg-pink-100",
  ghost:
    "text-cream-700 hover:bg-cream-100 active:bg-cream-200",
  warm:
    "bg-pink-500 text-white hover:bg-pink-600 active:bg-pink-700",
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
        className={`inline-flex items-center justify-center gap-2 rounded-full font-medium font-[family-name:var(--font-body)] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button, type ButtonProps };
