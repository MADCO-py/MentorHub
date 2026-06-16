import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-xs font-medium tracking-[0.15em] uppercase transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:   "bg-primary text-primary-foreground hover:bg-accent border border-primary hover:shadow-glow-green",
        secondary: "bg-white text-black hover:bg-white/90 border border-white",
        outline:   "border border-border bg-transparent hover:border-primary hover:text-primary text-foreground",
        ghost:     "hover:bg-surface-light text-foreground",
        whatsapp:  "bg-whatsapp text-white hover:bg-whatsapp/90 border border-whatsapp",
        link:      "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm:      "h-8 px-4 text-[10px]",
        lg:      "h-12 px-8 text-xs",
        icon:    "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
