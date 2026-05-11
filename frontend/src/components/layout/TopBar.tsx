import { Bell, Search, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadDocumentDialog } from "@/components/upload/UploadDocumentDialog";
import { fetchPatients } from "@/lib/api";
import type { Patient } from "@/data/types";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";

export function TopBar() {
  const navigate = useNavigate();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const { data: patients = [] } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });

  const results = query
    ? patients.filter((p: Patient) =>
        `${p.full_name}`.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  return (
    <header className="sticky top-0 z-30 flex h-12 items-center gap-3 border-b border-border bg-background px-3 md:px-4">
      <SidebarTrigger className="h-7 w-7 text-muted-foreground hover:text-foreground" />

      <div className="h-4 w-px bg-border" aria-hidden />

      <div className="relative flex-1 max-w-lg">
        <Popover open={open && results.length > 0} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" strokeWidth={1.75} />
              <Input
                placeholder="Search patients by name"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
                onFocus={() => setOpen(true)}
                className="h-8 rounded-[6px] border-border bg-secondary/60 pl-8 pr-14 text-[13px] shadow-none focus-visible:bg-card focus-visible:ring-1"
              />
              <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden items-center gap-1 rounded-[4px] border border-border bg-background px-1 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-flex">
                ⌘K
              </kbd>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-1 rounded-[6px]" align="start" onOpenAutoFocus={(e) => e.preventDefault()}>
            <div className="max-h-80 overflow-y-auto">
              {results.map((p: Patient) => (
                <button
                  key={p.patient_id}
                  onClick={() => {
                    navigate(`/patients/${p.patient_id}`);
                    setQuery("");
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-[4px] px-2.5 py-1.5 text-left text-[13px] hover:bg-accent"
                >
                  <div>
                    <div className="font-medium">{p.full_name}</div>
                    <div className="text-[11px] text-muted-foreground tabular-nums">{p.primary_provider}</div>
                  </div>
                  <span className="text-[11px] text-muted-foreground">{p.sex}</span>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <Button
          onClick={() => setUploadOpen(true)}
          size="sm"
          className="h-8 gap-1.5 rounded-[6px] px-3 text-[12px] font-medium shadow-none"
        >
          <Upload className="h-3.5 w-3.5" strokeWidth={2} />
          <span className="hidden sm:inline">Upload</span>
        </Button>
        <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-[6px] text-muted-foreground hover:text-foreground">
          <Bell className="h-4 w-4" strokeWidth={1.75} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
        </Button>
      </div>

      <UploadDocumentDialog open={uploadOpen} onOpenChange={setUploadOpen} />
    </header>
  );
}