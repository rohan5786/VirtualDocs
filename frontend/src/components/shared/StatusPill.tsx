import { cn } from "@/lib/utils";
import type { DocumentStatus } from "@/data/types";

interface Props {
  status: DocumentStatus;
  className?: string;
}

const config: Record<DocumentStatus, { label: string; className: string }> = {
  parsed: {
    label: "Parsed",
    className: "bg-success-soft text-success border border-success/20",
  },
  flagged: {
    label: "Flagged",
    className: "bg-destructive/10 text-destructive border border-destructive/20",
  },
  review_needed: {
    label: "Review needed",
    className: "bg-warning-soft text-warning border border-warning/20",
  },
};

export function StatusPill({ status, className }: Props) {
  const c = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        c.className,
        className,
      )}
    >
      {c.label}
    </span>
  );
}
