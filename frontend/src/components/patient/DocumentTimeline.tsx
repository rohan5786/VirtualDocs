import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { TimelineItem } from "./TimelineItem";
import { DocumentDrawer } from "./DocumentDrawer";
import { fetchBpLogs, fetchRadiologyReports, fetchPatientById } from "@/lib/api";
import type { BPLog, RadiologyReport } from "@/data/types";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

type Doc = { kind: "bp"; data: BPLog } | { kind: "radiology"; data: RadiologyReport };
type Filter = "all" | "bp" | "radiology";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "bp", label: "BP Logs" },
  { id: "radiology", label: "Radiology" },
];

type UploadedFile = { type: "bp" | "imaging"; filename: string; filepath: string };

export function DocumentTimeline({ patientId }: { patientId: number }) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Doc | null>(null);

  const { data: bpLogs = [] } = useQuery({
    queryKey: ["bplogs", patientId],
    queryFn: () => fetchBpLogs(patientId),
  });

  const { data: radiologyReports = [] } = useQuery({
    queryKey: ["radiology", patientId],
    queryFn: () => fetchRadiologyReports(patientId),
  });

  const { data: patient } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => fetchPatientById(String(patientId)),
  });

  // Parse "bp:filepath" or "imaging:filepath" entries
  const uploadedFiles: UploadedFile[] = useMemo(() => {
    if (!patient?.documents || patient.documents.trim() === "") return [];
    return patient.documents.split(",").map((entry: string) => {
      const trimmed = entry.trim();
      const colonIndex = trimmed.indexOf(":");
      // handle Windows paths like C:\... which also have colons
      // so we only split on the FIRST colon if it's "bp" or "imaging"
      const prefix = trimmed.substring(0, colonIndex);
      const filepath = trimmed.substring(colonIndex + 1);
      const type = (prefix === "bp" || prefix === "imaging") ? prefix : "bp";
      const filename = filepath.split(/[\\/]/).pop() ?? filepath;
      return { type, filename, filepath };
    });
  }, [patient]);

  const allDocs: Doc[] = useMemo(() => [
    ...bpLogs.map((d: BPLog) => ({ kind: "bp" as const, data: d })),
    ...radiologyReports.map((d: RadiologyReport) => ({ kind: "radiology" as const, data: d })),
  ].sort((a, b) =>
    new Date(b.data.appt_date).getTime() - new Date(a.data.appt_date).getTime()
  ), [bpLogs, radiologyReports]);

  const docs = useMemo(() =>
    activeFilter === "all" ? allDocs : allDocs.filter((d) => d.kind === activeFilter),
    [allDocs, activeFilter]
  );

  // Filter uploaded files to match the active tab
  const visibleUploads = useMemo(() => {
    if (activeFilter === "all") return uploadedFiles;
    if (activeFilter === "bp") return uploadedFiles.filter(f => f.type === "bp");
    if (activeFilter === "radiology") return uploadedFiles.filter(f => f.type === "imaging");
    return [];
  }, [uploadedFiles, activeFilter]);

  const totalCount = allDocs.length + uploadedFiles.length;

  return (
    <section className="rounded-[8px] border border-border bg-card">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <div>
          <h2 className="text-[13px] font-semibold tracking-tight">Document timeline</h2>
          <p className="text-[11px] text-muted-foreground tabular-nums">
            {totalCount} records · newest first
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
        {docs.length === 0 && visibleUploads.length === 0 && (
          <p className="py-10 text-center text-[12px] text-muted-foreground">
            No documents in this category.
          </p>
        )}

        {docs.map((doc) => (
          <TimelineItem
            key={doc.data.log_id}
            doc={doc}
            onSelect={() => setSelected(doc)}
          />
        ))}

        {visibleUploads.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-t border-border px-4 py-3 hover:bg-secondary/30 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
              <div>
                <p className="text-[13px] font-medium">{file.filename}</p>
                <p className="text-[11px] text-muted-foreground">
                  {file.type === "bp" ? "BP Log PDF" : "Radiology PDF"}
                </p>
              </div>
            </div>
            <a
              href={`/api/patients/${patientId}/documents/${file.filename}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-primary hover:underline"
            >
              View
            </a>
          </div>
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