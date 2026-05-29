import { useEffect, useState } from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Flag, CheckCircle2, Activity, FileImage } from "lucide-react";
import type { BPLog, RadiologyReport } from "@/data/types";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement, LineElement, LineController } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { fetchBPLogs, fetchLogDates, fetchRadiologyReports } from "@/lib/api";

type Doc = { kind: "bp"; data: BPLog } | { kind: "radiology"; data: RadiologyReport };
ChartJS.register(LineController, LineElement, PointElement, LineElement, CategoryScale);

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

  const [BPLogs, setBPLogs] = useState<BPLog[]>([]);

  // fetch em and set em safely
  useEffect(() => {
    fetchBPLogs(doc.data.patient_id).then(setBPLogs).catch(console.error);
  }, [doc?.data.patient_id]);

  {/* sort the bp logs on appt date,  then time of day*/}
  const sortedBPLogs = [...BPLogs].sort(
    (a,b) => {
      if ((new Date(a.appt_date)).getTime() !== (new Date(b.appt_date)).getTime()) {
        return (new Date(a.appt_date)).getTime() - (new Date(b.appt_date)).getTime();
      }
      return (new Date(a.time_of_day)).getTime() - (new Date(b.time_of_day)).getTime();
    }
  );

  const allBPChartData = {
    labels: sortedBPLogs.map((log) => log.appt_date),
    datasets: [
      {
        label: "SBP",
        data: sortedBPLogs.map((log) => log.SBP),
        borderColor: "rgb(255, 0, 0)",
        backgroundColor: "rgba(255, 255, 255, 1)",
        tension: 0.4,
        pointRadius: 3,
      },
      {
        label: "DBP",
        data: sortedBPLogs.map((log) => log.DBP),
        borderColor: "rgb(0, 255, 0)",
        backgroundColor: "rgba(255, 255, 255, 1)",
        tension: 0.4,
        pointRadius: 3,
      },
      {
        label: "Pulse",
        data: sortedBPLogs.map((log) => log.pulse),
        borderColor: "rgb(0, 0, 255)",
        backgroundColor: "rgba(255, 255, 255, 1)",
        tension: 0.4,
        pointRadius: 3,
      },
    ]
  };


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
          {/* Basically grpahing all lines over time for all logs */}
          <div className="Graph">
            <Line data={allBPChartData}/>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}