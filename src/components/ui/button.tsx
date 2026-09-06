import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-fg hover:bg-sea shadow-none",
        outline:
          "border border-border bg-card text-fg hover:bg-surface",
        ghost: "text-fg hover:bg-surface",
        map: "border border-border bg-card text-primary hover:bg-surface",
        sea: "bg-sea text-primary-fg hover:opacity-90",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-[8px]",
        md: "h-11 px-4 text-sm rounded-[12px]",
        lg: "h-12 px-5 text-base rounded-[12px]",
        icon: "size-11 rounded-[12px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
