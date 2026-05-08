import { FileText, Activity, FlaskConical, FileImage, GitPullRequest, ChevronRight } from "lucide-react";
import { formatDate, formatRelative } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ClinicalDocument, DocumentCategory } from "@/data/types";

const iconFor = (cat: DocumentCategory) => {
  switch (cat) {
    case "bp": return Activity;
    case "lab": return FlaskConical;
    case "imaging": return FileImage;
    case "note": return FileText;
    case "referral": return GitPullRequest;
  }
};

const labelFor = (cat: DocumentCategory) => {
  switch (cat) {
    case "bp": return "BP";
    case "lab": return "Lab";
    case "imaging": return "Img";
    case "note": return "Note";
    case "referral": return "Ref";
  }
};

interface Props {
  document: ClinicalDocument;
  onSelect: () => void;
}

export function TimelineItem({ document: doc, onSelect }: Props) {
  const Icon = iconFor(doc.category);

  return (
    <button
      onClick={onSelect}
      className="group grid w-full grid-cols-[110px_auto_1fr_auto] items-start gap-4 border-b border-border px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-secondary/40"
    >
      {/* Date column */}
      <div className="pt-0.5">
        <p className="text-[12px] font-semibold tabular-nums text-foreground">{formatDate(doc.date)}</p>
        <p className="mt-0.5 text-[10px] text-muted-foreground">{formatRelative(doc.date)}</p>
      </div>

      {/* Category chip */}
      <div className="flex items-center gap-1.5 pt-1">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
        <span className="text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
          {labelFor(doc.category)}
        </span>
      </div>

      {/* Content */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <p className="text-[13px] font-semibold text-foreground">{doc.type}</p>
          <span className="text-[11px] text-muted-foreground">· {doc.source}</span>
        </div>
        <p className="mt-1 text-[12px] leading-relaxed text-foreground/80 line-clamp-2">
          {doc.summary}
        </p>
        {doc.extracted.length > 0 && (
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground tabular-nums">
            {doc.extracted.slice(0, 4).map((f) => (
              <span key={f.label} className="inline-flex items-center gap-1">
                <span>{f.label}</span>
                <span
                  className={cn(
                    "font-semibold text-foreground/90",
                    f.flag === "high" && "text-destructive",
                    f.flag === "low" && "text-warning",
                  )}
                >
                  {f.value}
                  {f.flag === "high" && <span className="ml-0.5">↑</span>}
                  {f.flag === "low" && <span className="ml-0.5">↓</span>}
                </span>
              </span>
            ))}
            {doc.extracted.length > 4 && (
              <span>+{doc.extracted.length - 4}</span>
            )}
          </div>
        )}
      </div>

      {/* Affordance */}
      <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-colors group-hover:text-foreground" />
    </button>
  );
}
