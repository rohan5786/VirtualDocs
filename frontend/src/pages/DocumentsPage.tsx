import { Link } from "react-router-dom";
import { FileText, Activity, FlaskConical, FileImage, GitPullRequest } from "lucide-react";
import { documents } from "@/data/documents";
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

const labelFor = (cat: DocumentCategory) => {
  switch (cat) {
    case "bp": return "BP";
    case "lab": return "Lab";
    case "imaging": return "Img";
    case "note": return "Note";
    case "referral": return "Ref";
  }
};

export default function DocumentsPage() {
  const sorted = [...documents].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="mx-auto max-w-6xl px-5 py-6 md:px-8 md:py-8 space-y-5 animate-fade-in">
      <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight">Documents</h1>
          <p className="mt-0.5 text-[12px] text-muted-foreground tabular-nums">
            {sorted.length} records across all patients
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[8px] border border-border bg-card">
        <div className="grid grid-cols-[90px_60px_1fr_auto] gap-4 border-b border-border bg-secondary/40 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
          <span>Date</span>
          <span>Type</span>
          <span>Document</span>
          <span>Uploaded</span>
        </div>
        {sorted.map((doc) => {
          const patient = getPatientById(doc.patientId);
          const Icon = iconFor(doc.category);
          return (
            <Link
              key={doc.id}
              to={`/patients/${doc.patientId}`}
              className="grid grid-cols-[90px_60px_1fr_auto] items-start gap-4 border-b border-border px-4 py-2.5 transition-colors last:border-b-0 hover:bg-secondary/40"
            >
              <span className="text-[12px] font-semibold tabular-nums text-foreground">
                {formatDate(doc.date)}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                {labelFor(doc.category)}
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-foreground">
                  {doc.type}
                  <span className="ml-2 font-normal text-muted-foreground">
                    · {patient?.lastName}, {patient?.firstName}
                  </span>
                </p>
                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                  {doc.source} · {doc.summary}
                </p>
              </div>
              <span className="text-[11px] text-muted-foreground tabular-nums">
                {formatRelative(doc.date)}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
