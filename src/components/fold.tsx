import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Fold({
  label,
  children,
  className,
  summaryClassName,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  summaryClassName?: string;
}) {
  return (
    <details className={cn("group border-t border-line", className)}>
      <summary
        className={cn(
          "flex min-h-11 cursor-pointer list-none items-center gap-2 py-3 text-gold",
          summaryClassName,
        )}
      >
        <span>{label}</span>
        <ChevronDown
          className="h-4 w-4 shrink-0 opacity-80 transition-transform duration-200 group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="hidden pb-2 group-open:block">{children}</div>
    </details>
  );
}
