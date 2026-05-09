import { Activity, FileImage, ChevronRight } from "lucide-react";
import { formatDate, formatRelative } from "@/lib/format";
import type { BPLog, RadiologyReport } from "@/data/types";

type Doc = { kind: "bp"; data: BPLog } | { kind: "radiology"; data: RadiologyReport };

interface Props {
  doc: Doc;
  onSelect: () => void;
}

export function TimelineItem({ doc, onSelect }: Props) {
  const isBP = doc.kind === "bp";
  const Icon = isBP ? Activity : FileImage;
  const label = isBP ? "BP" : "Img";
  const date = doc.data.appt_date;
  // const date = isBP ? doc.data.appt_date : doc.data.reportDate;
  const title = isBP ? `BP Log` : doc.data.imaging_type;
  const subtitle = isBP
    ? `${doc.data.SBP}/${doc.data.DBP} mmHg · Pulse ${doc.data.pulse}`
    : `${doc.data.body_part} · ${doc.data.findings}`;

  return (
    <button
      onClick={onSelect}
      className="group grid w-full grid-cols-[110px_auto_1fr_auto] items-start gap-4 border-b border-border px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-secondary/40"
    >
      <div className="pt-0.5">
        <p className="text-[12px] font-semibold tabular-nums text-foreground">{formatDate(date)}</p>
        <p className="mt-0.5 text-[10px] text-muted-foreground">{formatRelative(date)}</p>
      </div>

      <div className="flex items-center gap-1.5 pt-1">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
        <span className="text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
          {label}
        </span>
      </div>

      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-[12px] leading-relaxed text-foreground/80 line-clamp-2">{subtitle}</p>
        {isBP && (
          <div className="mt-1.5 flex flex-wrap gap-x-3 text-[11px] text-muted-foreground tabular-nums">
            <span>SBP <span className="font-semibold text-foreground/90">{doc.data.SBP}</span></span>
            <span>DBP <span className="font-semibold text-foreground/90">{doc.data.DBP}</span></span>
            <span>Pulse <span className="font-semibold text-foreground/90">{doc.data.pulse}</span></span>
          </div>
        )}
      </div>

      <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-colors group-hover:text-foreground" />
    </button>
  );
}