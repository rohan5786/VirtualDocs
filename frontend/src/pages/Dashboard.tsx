import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Users, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RecentUploads } from "@/components/dashboard/RecentUploads";
import { patients } from "@/data/patients";

export default function Dashboard() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const results = query
    ? patients.filter((p) =>
        `${p.firstName} ${p.lastName} ${p.mrn} ${p.primaryDiagnosis}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      )
    : [];

  return (
    <div className="mx-auto max-w-4xl px-5 py-6 md:px-8 md:py-8 space-y-6 animate-fade-in">
      <div className="flex items-end justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
            Tuesday · April 28, 2026
          </p>
          <h1 className="mt-1 text-[22px] font-semibold tracking-tight text-foreground">
            Overview
          </h1>
        </div>
        <Button asChild size="sm" variant="outline" className="h-8 gap-1.5 rounded-[6px] px-3 text-[12px]">
          <Link to="/patients">
            <Users className="h-3.5 w-3.5" strokeWidth={1.75} />
            All patients
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </div>

      {/* Quick patient search */}
      <div>
        <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
          Find a patient
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.75} />
          <Input
            placeholder="Search by name, MRN, or diagnosis"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 rounded-[8px] border-border bg-card pl-10 text-[14px] shadow-sm focus-visible:ring-1"
          />
        </div>
        {results.length > 0 && (
          <div className="mt-2 divide-y divide-border rounded-[8px] border border-border bg-card shadow-sm">
            {results.slice(0, 6).map((p) => (
              <button
                key={p.id}
                onClick={() => navigate(`/patients/${p.id}`)}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-secondary/60"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-secondary text-[10px] font-semibold text-foreground">
                  {p.firstName[0]}{p.lastName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium">{p.firstName} {p.lastName}</p>
                  <p className="text-[11px] text-muted-foreground tabular-nums">{p.mrn} · {p.primaryDiagnosis}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Recent activity across all patients */}
      <RecentUploads />
    </div>
  );
}
