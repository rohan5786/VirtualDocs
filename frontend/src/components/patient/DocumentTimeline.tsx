import { useState, useMemo } from "react";
import { TimelineItem } from "./TimelineItem";
import { DocumentDrawer } from "./DocumentDrawer";
import { getDocumentsByPatient } from "@/data/documents";
import type { ClinicalDocument, DocumentCategory } from "@/data/types";
import { cn } from "@/lib/utils";

const filters: { id: "all" | DocumentCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "bp", label: "BP Logs" },
  { id: "lab", label: "Labs" },
  { id: "imaging", label: "Imaging" },
  { id: "note", label: "Notes" },
  { id: "referral", label: "Referrals" },
];

export function DocumentTimeline({ patientId }: { patientId: string }) {
  const [activeFilter, setActiveFilter] = useState<"all" | DocumentCategory>("all");
  const [selected, setSelected] = useState<ClinicalDocument | null>(null);

  const allDocs = useMemo(() => getDocumentsByPatient(patientId), [patientId]);
  const docs = useMemo(
    () => (activeFilter === "all" ? allDocs : allDocs.filter((d) => d.category === activeFilter)),
    [allDocs, activeFilter],
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
            key={doc.id}
            document={doc}
            onSelect={() => setSelected(doc)}
          />
        ))}
      </div>

      <DocumentDrawer
        document={selected}
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </section>
  );
}
