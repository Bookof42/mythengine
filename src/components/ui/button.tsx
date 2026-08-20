import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] text-sm font-medium tracking-wide transition-[transform,background-color,border-color,color,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        gold: "bg-gold text-ink hover:bg-gold/90 min-h-11 px-6",
        teal: "bg-teal text-ink hover:bg-teal/90 min-h-11 px-6",
        ghost:
          "border border-line-strong bg-transparent text-fg hover:border-teal hover:text-teal min-h-11 px-5",
        quiet: "text-muted hover:text-fg min-h-11 px-3",
      },
    },
    defaultVariants: { variant: "gold" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, type = "button", ...props }: Props) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}
