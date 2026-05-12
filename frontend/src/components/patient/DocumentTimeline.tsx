import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { TimelineItem } from "./TimelineItem";
import { DocumentDrawer } from "./DocumentDrawer";
import { fetchBpLogs, fetchRadiologyReports } from "@/lib/api";
import type { BPLog, RadiologyReport } from "@/data/types";
import { cn } from "@/lib/utils";

type Doc = { kind: "bp"; data: BPLog } | { kind: "radiology"; data: RadiologyReport };
type Filter = "all" | "bp" | "radiology";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "bp", label: "BP Logs" },
  { id: "radiology", label: "Radiology" },
];

export function DocumentTimeline({ patientId }: { patientId: number }) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Doc | null>(null);

  const { data: bpLogs = [] } = useQuery({
    queryKey: ["bplogs", patientId],
    queryFn: () => fetchBpLogs(patientId + ""),
  });

  const { data: radiologyReports = [] } = useQuery({
    queryKey: ["radiology", patientId],
    queryFn: () => fetchRadiologyReports(patientId + ""),
  });

  const allDocs: Doc[] = useMemo(() => [
    ...bpLogs.map((d: BPLog) => ({ kind: "bp" as const, data: d })),
    ...radiologyReports.map((d: RadiologyReport) => ({ kind: "radiology" as const, data: d })),
  ].sort((a, b) => {
    const dateA = a.data.appt_date;
    const dateB = b.data.appt_date;

    // const dateA = a.kind === "bp" ? a.data.appt_date : a.data.appt_date;
    // const dateB = b.kind === "bp" ? b.data.appt_date : b.data.appt_date;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  }), [bpLogs, radiologyReports]);

  const docs = useMemo(() =>
    activeFilter === "all" ? allDocs : allDocs.filter((d) => d.kind === activeFilter),
    [allDocs, activeFilter]
  );

  return (
    <section className="rounded-[8px] border border-border bg-card">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <div>
          <h2 className="text-[13px] font-semibold tracking-tight">Document timeline</h2>
          <p className="text-[11px] text-muted-foreground tabular-nums">
            {allDocs.length} records · newest first
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-0 rounded-[6px] border border-border bg-secondary/40 p-0.5">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={cn(
                "h-6 rounded-[4px] px-2 text-[11px] font-medium transition-colors",
                activeFilter === f.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      <div>
        {docs.length === 0 && (
          <p className="py-10 text-center text-[12px] text-muted-foreground">
            No documents in this category.
          </p>
        )}
        {docs.map((doc) => (
          <TimelineItem
            key={doc.kind === "bp" ? doc.data.log_id : doc.data.log_id}
            doc={doc}
            onSelect={() => setSelected(doc)}
          />
        ))}
      </div>

      <DocumentDrawer
        doc={selected}
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </section>
  );
}