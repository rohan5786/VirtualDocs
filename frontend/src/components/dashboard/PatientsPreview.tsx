import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { ArrowRight, ChevronRight } from "lucide-react";
import { calcAge, getPatients } from "@/data/patients";
import { Patient } from "@/data/types";
// import { patients } from '@/data/patients';

export function PatientsPreview() {
  /*
  doesn't really sort by recent visits, kind of just gets most recently added
  i'm not storing by 
  */
  // fetching from backend
  const [patients, setPatients] = useState<Patient[]>([]);
  useEffect(() => {
    getPatients().then((data) => setPatients(data));
  }, []);

  

  return (
    <section className="rounded-[8px] border border-border bg-card">
      <header className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div>
          <h3 className="text-[13px] font-semibold tracking-tight">Recently added patients</h3>
          <p className="text-[11px] text-muted-foreground">Sorted by last 5 added</p>
        </div>
        <Link to="/patients" className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline">
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </header>
      <div className="divide-y divide-border">
        {patients.slice(0, 5).map((p) => (
          <Link
            key={p.patient_id}
            to={`/patients/${p.patient_id}`}
            className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-secondary/50"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-secondary text-[10px] font-semibold text-foreground">
              {p.full_name[0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium">{p.full_name} </p>
              <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                {calcAge(p.date_of_birth)} · {p.sex} · {p.doctor_notes}
              </p>
            </div>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
          </Link>
        ))}
      </div>
    </section>
  );
}
