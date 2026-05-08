import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import type { Patient } from "@/data/types";
import { cn } from "@/lib/utils";

const TrendIcon = ({ trend }: { trend: "up" | "down" | "flat" }) => {
  const cls = "h-3 w-3";
  if (trend === "up") return <TrendingUp className={cn(cls, "text-destructive")} strokeWidth={1.75} />;
  if (trend === "down") return <TrendingDown className={cn(cls, "text-warning")} strokeWidth={1.75} />;
  return <Minus className={cn(cls, "text-muted-foreground")} strokeWidth={1.75} />;
};

export function VitalsCard({ patient }: { patient: Patient }) {
  const egfrTone =
    patient.vitals.egfr < 30 ? "text-destructive" :
    patient.vitals.egfr < 60 ? "text-warning" : "text-success";

  return (
    <div className="space-y-4">
      <section className="rounded-[8px] border border-border bg-card">
        <header className="border-b border-border px-4 py-2.5">
          <h3 className="text-[13px] font-semibold tracking-tight">Latest vitals</h3>
          <p className="text-[11px] text-muted-foreground">Most recent extracted values</p>
        </header>
        <dl className="divide-y divide-border text-[13px]">
          <VitalRow
            label="Blood pressure"
            value={patient.vitals.latestBp}
            sub={`14-day avg ${patient.vitals.bpAvg}`}
          />
          <VitalRow
            label="Creatinine"
            value={`${patient.vitals.creatinine} mg/dL`}
            sub={
              <span className="inline-flex items-center gap-1">
                <TrendIcon trend={patient.vitals.creatinineTrend} />
                {patient.vitals.creatinineTrend === "up"
                  ? "Trending up"
                  : patient.vitals.creatinineTrend === "down"
                    ? "Trending down"
                    : "Stable"}
              </span>
            }
          />
          <VitalRow
            label="eGFR"
            value={
              <span className={cn("tabular-nums", egfrTone)}>
                {patient.vitals.egfr}
                <span className="ml-1 text-[10px] font-normal text-muted-foreground">mL/min</span>
              </span>
            }
            sub={
              <span className="inline-flex items-center gap-1">
                <TrendIcon trend={patient.vitals.egfrTrend} />
                1.73m²
              </span>
            }
          />
        </dl>
      </section>

      <section className="rounded-[8px] border border-border bg-card">
        <header className="border-b border-border px-4 py-2.5">
          <h3 className="text-[13px] font-semibold tracking-tight">Care team</h3>
        </header>
        <div className="divide-y divide-border">
          <CareMember name={patient.primaryProvider} role="Nephrology · Primary" initials="EC" />
          <CareMember name="Dr. Marcus Patel" role="Nephrology · Co-management" initials="MP" />
          <CareMember name="Dr. M. Reyes" role="Primary care" initials="MR" />
        </div>
      </section>
    </div>
  );
}

function VitalRow({
  label,
  value,
  sub,
}: {
  label: string;
  value: React.ReactNode;
  sub: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 px-4 py-2.5">
      <dt className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground">{label}</dt>
      <dd className="text-right">
        <div className="text-[14px] font-semibold leading-tight tabular-nums">{value}</div>
        <div className="mt-0.5 text-[11px] text-muted-foreground">{sub}</div>
      </dd>
    </div>
  );
}

function CareMember({ name, role, initials }: { name: string; role: string; initials: string }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-secondary text-[10px] font-semibold text-foreground">
        {initials}
      </div>
      <div className="min-w-0">
        <p className="truncate text-[12px] font-medium">{name}</p>
        <p className="truncate text-[11px] text-muted-foreground">{role}</p>
      </div>
    </div>
  );
}
