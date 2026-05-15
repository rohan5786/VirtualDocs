import { Phone, Shield } from "lucide-react";
import { calcAge } from "@/data/patients";
import { formatDate } from "@/lib/format";
import type { Patient } from "@/data/types";

export function PatientHeader({ patient }: { patient: Patient }) {
  return (
    <section className="rounded-[8px] border border-border bg-card">
      {/* Identity band */}
      <div className="flex flex-wrap items-start gap-5 px-6 py-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-primary-soft text-[13px] font-semibold text-primary">
          {patient.full_name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-[20px] font-semibold tracking-tight">
              {patient.full_name}
            </h1>
            {/* If the patient is archived, display the following */}
            {patient.archived && (
              <span className = "inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                Archived
              </span>
            )}
            <span className="text-[12px] text-muted-foreground tabular-nums">
              {calcAge(patient.date_of_birth)} yrs · {patient.sex == 1 ? "Male" : "Female"} · DOB {formatDate(patient.date_of_birth)}
            </span>
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-x-8 gap-y-1.5 text-[12px] sm:grid-cols-4">
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">MRN</dt>
              <dd className="mt-0.5 font-medium tabular-nums">{patient.patient_id + ""}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">Doctor Notes</dt>
              <dd className="mt-0.5 font-medium">{patient.doctor_notes}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">Provider</dt>
              <dd className="mt-0.5 font-medium">{patient.primary_provider}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">Insurance</dt>
              <dd className="mt-0.5 inline-flex items-center gap-1 font-medium">
                <Shield className="h-3 w-3 text-muted-foreground" strokeWidth={1.75} />
                {patient.insurance}
              </dd>
            </div>
          </dl>
        </div>
        <div className="text-right text-[12px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Phone className="h-3 w-3" strokeWidth={1.75} />
            <span className="tabular-nums">{patient.phone_number}</span>
          </span>
        </div>
      </div>

      {/* Allergies strip */}
      {patient.allergies && (
        <div className="flex flex-wrap items-center gap-2 border-t border-border bg-destructive/[0.03] px-6 py-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-destructive">Allergies</span>
          <span className="inline-flex items-center rounded-[4px] border border-destructive/25 bg-card px-1.5 py-0.5 text-[11px] font-medium text-destructive">
            {patient.allergies}
          </span>
        </div>
      )}
    </section>
  );
}
