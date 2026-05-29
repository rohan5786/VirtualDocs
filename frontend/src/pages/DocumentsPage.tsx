import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Activity, FileImage } from "lucide-react";
import { fetchPatients, fetchBPLogs, fetchRadiologyReports } from "@/lib/api";
import type { Patient } from "@/data/types";
import { formatDate, formatRelative } from "@/lib/format";

// needs to be completely rewritten lowkey

export default function DocumentsPage() {
  const { data: patients = [] } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });

  return (
    <div className="mx-auto max-w-6xl px-5 py-6 md:px-8 md:py-8 space-y-5 animate-fade-in">
      <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight">Documents</h1>
          <p className="mt-0.5 text-[12px] text-muted-foreground">
            Browse by patient below.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[8px] border border-border bg-card divide-y divide-border">
        {patients.map((p: Patient) => (
          <Link
            key={p.patient_id}
            to={`/patients/${p.patient_id}`}
            className="flex items-center justify-between px-4 py-3 hover:bg-secondary/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-secondary text-[10px] font-semibold">
                {p.full_name[0]}
              </div>
              <div>
                <p className="text-[13px] font-medium">{p.full_name}</p>
                <p className="text-[11px] text-muted-foreground">{p.primary_provider}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <Activity className="h-3.5 w-3.5" strokeWidth={1.75} />
              <FileImage className="h-3.5 w-3.5" strokeWidth={1.75} />
              <span>View records →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}