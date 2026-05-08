import { Link } from "react-router-dom";
import { ArrowRight, FileText, Activity, FlaskConical, FileImage, GitPullRequest } from "lucide-react";
import { getRecentDocuments } from "@/data/documents";
import { getPatientById } from "@/data/patients";
import { formatDate, formatRelative } from "@/lib/format";
import type { DocumentCategory } from "@/data/types";

const iconFor = (cat: DocumentCategory) => {
  switch (cat) {
    case "bp": return Activity;
    case "lab": return FlaskConical;
    case "imaging": return FileImage;
    case "note": return FileText;
    case "referral": return GitPullRequest;
  }
};

export function RecentUploads() {
  const recent = getRecentDocuments(6);

  return (
    <section className="rounded-[8px] border border-border bg-card">
      <header className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div>
          <h3 className="text-[13px] font-semibold tracking-tight">Recent uploads</h3>
          <p className="text-[11px] text-muted-foreground">Across all patients</p>
        </div>
        <Link to="/patients" className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline">
          Browse patients <ArrowRight className="h-3 w-3" />
        </Link>
      </header>
      <div className="divide-y divide-border">
        {recent.map((doc) => {
          const patient = getPatientById(doc.patientId);
          const Icon = iconFor(doc.category);
          return (
            <Link
              key={doc.id}
              to={`/patients/${doc.patientId}`}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-2.5 transition-colors hover:bg-secondary/50"
            >
              <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-foreground">{doc.type}</p>
                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                  {patient?.firstName} {patient?.lastName} · {doc.source}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-medium text-foreground tabular-nums">{formatDate(doc.date)}</p>
                <p className="text-[10px] text-muted-foreground">{formatRelative(doc.date)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
