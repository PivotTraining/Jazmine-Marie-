import { type HTMLAttributes, forwardRef } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: "default" | "warm" | "cream" | "dark";
  size?: "sm" | "md" | "lg" | "full";
}

const bgStyles = {
  default: "bg-white",
  warm: "bg-warm-50",
  cream: "bg-warm-100",
  dark: "bg-warm-800 text-white",
};

const sizeStyles = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  full: "py-0",
};

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className = "", variant = "default", size = "md", children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={`${bgStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div>
      </section>
    );
  }
);

Section.displayName = "Section";
export { Section };
