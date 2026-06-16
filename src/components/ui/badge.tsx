import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 border font-mono text-[10px] tracking-[0.15em] uppercase transition-colors",
  {
    variants: {
      variant: {
        default:   "border-border bg-surface-light text-muted px-2.5 py-1",
        primary:   "border-primary/50 bg-primary/10 text-primary px-2.5 py-1",
        secondary: "border-white/20 bg-white/5 text-white px-2.5 py-1",
        outline:   "border-border text-muted px-2.5 py-1",
        green:     "border-primary bg-primary text-black px-2.5 py-1 font-semibold",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
