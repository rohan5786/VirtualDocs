import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Flag, CheckCircle2, Activity, FileImage } from "lucide-react";
import { toast } from "sonner";
import type { BPLog, RadiologyReport } from "@/data/types";

type Doc = { kind: "bp"; data: BPLog } | { kind: "radiology"; data: RadiologyReport };

interface Props {
  doc: Doc | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DocumentDrawer({ doc, open, onOpenChange }: Props) {
  if (!doc) return null;

  const isBP = doc.kind === "bp";
  const title = isBP ? "BP Log" : doc.data.imaging_type;
  const date = isBP ? doc.data.appt_date : doc.data.appt_date;
  const Icon = isBP ? Activity : FileImage;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-3xl p-0 overflow-y-auto">
        <SheetHeader className="border-b border-border bg-card px-5 py-3">
          <div className="min-w-0 text-left">
            <SheetTitle className="text-[14px] font-semibold flex items-center gap-2">
              <Icon className="h-4 w-4" strokeWidth={1.75} />
              {title}
            </SheetTitle>
            <p className="mt-0.5 text-[11px] text-muted-foreground tabular-nums">
              {isBP ? `Patient ${doc.data.patient_id}` : `${doc.data.body_part} · Patient ${doc.data.patient_id}`} · {date}
            </p>
          </div>
        </SheetHeader>

        <div className="p-5 space-y-4">
          {isBP ? (
            <dl className="divide-y divide-border rounded-[6px] border border-border bg-card">
              {[
                ["Log ID", doc.data.log_id],
                ["Appt Date", doc.data.appt_date],
                // ["Period", `${doc.data.startDate} → ${doc.data.endDate}`],
                // ["Avg Systolic", `${doc.data.averageSystolic} mmHg`],
                // ["Avg Diastolic", `${doc.data.averageDiastolic} mmHg`],
                ["SBP", doc.data.SBP],
                ["DBP", doc.data.DBP],
                ["Pulse", doc.data.pulse],
                // ["Readings", doc.data.readingsCount],
                ["Status", doc.data.patient_status],
              ].map(([label, value]) => (
                <div key={label} className="flex items-baseline justify-between gap-3 px-3 py-2">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground">{label}</dt>
                  <dd className="text-[13px] font-semibold tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <dl className="divide-y divide-border rounded-[6px] border border-border bg-card">
              {[
                ["Report ID", doc.data.log_id],
                ["Report Date", doc.data.appt_date],
                ["Imaging Type", doc.data.imaging_type],
                ["Body Part", doc.data.body_part],
                ["Findings", doc.data.findings],
                ["Status", doc.data.patient_status],
              ].map(([label, value]) => (
                <div key={label} className="flex items-baseline justify-between gap-3 px-3 py-2">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground">{label}</dt>
                  <dd className="text-[13px] font-semibold tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="flex flex-col gap-1.5 border-t border-border pt-3">
            <Button
              size="sm"
              className="h-8 w-full justify-center gap-1.5 rounded-[6px] text-[12px] shadow-none"
              onClick={() => { toast.success("Marked as reviewed"); onOpenChange(false); }}
            >
              <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={1.75} /> Mark as reviewed
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-full justify-center gap-1.5 rounded-[6px] text-[12px] text-muted-foreground shadow-none hover:text-foreground"
              onClick={() => toast("Flagged for follow-up")}
            >
              <Flag className="h-3.5 w-3.5" strokeWidth={1.75} /> Flag for follow-up
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}