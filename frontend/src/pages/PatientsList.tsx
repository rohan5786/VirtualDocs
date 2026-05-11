import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { fetchPatients } from "@/lib/api";
import { calcAge } from "@/data/patients";
import type { Patient } from "@/data/types";

export default function PatientsList() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [providerFilter, setProviderFilter] = useState<string>("all");

  const { data: patients = [], isLoading, error } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });

  const providers: string[] = Array.from(new Set(patients.map((p: Patient) => p.primary_provider)));

  const filtered = useMemo(() => {
    return patients.filter((p: Patient) => {
      const matchesQuery = p.full_name.toLowerCase().includes(query.toLowerCase());
      const matchesProv = providerFilter === "all" || p.primary_provider === providerFilter;
      return matchesQuery && matchesProv;
    });
  }, [patients, query, providerFilter]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading patients</div>;

  return (
    <div className="mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-8 space-y-5 animate-fade-in">
      <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight">Patients</h1>
          <p className="mt-0.5 text-[12px] text-muted-foreground tabular-nums">
            {filtered.length} of {patients.length} records
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" strokeWidth={1.75} />
          <Input
            placeholder="Search by name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-8 rounded-[6px] border-border bg-card pl-8 text-[13px] shadow-none"
          />
        </div>
        <Select value={providerFilter} onValueChange={setProviderFilter}>
          <SelectTrigger className="h-8 w-[180px] rounded-[6px] text-[13px] shadow-none">
            <SelectValue placeholder="Provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All providers</SelectItem>
            {providers.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-[8px] border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border bg-secondary/40 hover:bg-secondary/40">
              <TableHead className="h-9 px-4 text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">Patient</TableHead>
              <TableHead className="h-9 px-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">Patient ID</TableHead>
              <TableHead className="h-9 px-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">Age / Sex</TableHead>
              <TableHead className="h-9 px-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">Provider</TableHead>
              <TableHead className="h-9 px-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">Insurance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p: Patient) => (
              <TableRow
                key={p.patient_id}
                onClick={() => navigate(`/patients/${p.patient_id}`)}
                className="cursor-pointer border-b border-border/70 transition-colors hover:bg-secondary/40"
              >
                <TableCell className="px-4 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-secondary text-[10px] font-semibold text-foreground">
                      {p.full_name[0]}
                    </div>
                    <span className="text-[13px] font-medium">{p.full_name}</span>
                  </div>
                </TableCell>
                <TableCell className="px-3 py-2.5 text-[12px] text-muted-foreground tabular-nums">{p.patient_id}</TableCell>
                <TableCell className="px-3 py-2.5 text-[12px] tabular-nums">{calcAge(p.date_of_birth)} · {p.sex === 1 ? "M" : "F"}</TableCell>
                <TableCell className="px-3 py-2.5 text-[12px] text-muted-foreground">{p.primary_provider}</TableCell>
                <TableCell className="px-3 py-2.5 text-[12px] text-muted-foreground">{p.insurance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}