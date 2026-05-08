import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import { Flag, CheckCircle2, ExternalLink, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { ClinicalDocument } from "@/data/types";

interface Props {
  document: ClinicalDocument | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DocumentDrawer({ document, open, onOpenChange }: Props) {
  if (!document) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-3xl p-0 overflow-y-auto">
        <SheetHeader className="border-b border-border bg-card px-5 py-3">
          <div className="min-w-0 text-left">
            <SheetTitle className="text-[14px] font-semibold">{document.type} • {document.patientId}</SheetTitle>
            <p className="mt-0.5 text-[11px] text-muted-foreground tabular-nums">
              {document.source} · {formatDateTime(document.date)}
            </p>
          </div>
        </SheetHeader>

        <div className="grid gap-0 lg:grid-cols-[1fr_300px]">
          {/* Document preview */}
          <div className="bg-secondary/40 p-5 lg:border-r lg:border-border min-h-[400px]">
            <div className="mx-auto max-w-md rounded-[6px] border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 border-b border-border pb-2.5">
                <FileText className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                  {document.source}
                </span>
              </div>
              <h4 className="mt-3 text-[13px] font-semibold">{document.type}</h4>
              <p className="text-[10px] text-muted-foreground tabular-nums">
                Report date: {formatDateTime(document.date)}
              </p>

              <div className="mt-4 rounded-[6px] border border-border bg-background p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                  Original Document Preview
                </p>

                <div className="mt-3 space-y-2 text-[11px] leading-relaxed text-foreground/85">
                  <p><strong>Patient:</strong> {document.patientId}</p>
                  <p><strong>Source:</strong> {document.source}</p>
                  <p><strong>Document Type:</strong> {document.type}</p>
                  <p><strong>Status:</strong> {document.status}</p>

                  <div className="mt-3 rounded border border-dashed border-border bg-muted/40 p-4 text-center text-[11px] text-muted-foreground">
                    Mock scanned PDF/image preview
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-[6px] border border-border bg-secondary/60 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                  Summary
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-foreground/85">{document.summary}</p>
              </div>

              <div className="mt-4 space-y-1.5">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="h-1.5 rounded bg-muted" style={{ width: `${85 - i * 10}%` }} />
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" size="sm" className="h-7 gap-1.5 rounded-[6px] px-2.5 text-[11px] shadow-none">
                <ExternalLink className="h-3 w-3" strokeWidth={1.75} /> Open Original Document
              </Button>
            </div>
          </div>

          {/* Extracted data */}
          <div className="p-5 space-y-4">
            <div>
              <h3 className="text-[12px] font-semibold">Parsed Clinical Data</h3>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Structured clinical values extracted from the uploaded document.
              </p>
            </div>

            <dl className="divide-y divide-border rounded-[6px] border border-border bg-card">
              {document.extracted.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-3 px-3 py-2">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
                    {f.label}
                  </dt>
                  <dd className="text-right">
                    <span
                      className={cn(
                        "text-[13px] font-semibold tabular-nums",
                        f.flag === "high" && "text-destructive",
                        f.flag === "low" && "text-warning",
                      )}
                    >
                      {f.value}
                      {f.flag === "high" && <span className="ml-0.5">↑</span>}
                      {f.flag === "low" && <span className="ml-0.5">↓</span>}
                    </span>
                    {f.confidence && (
                      <span className="ml-2 text-[10px] text-muted-foreground tabular-nums">
                        {Math.round(f.confidence * 100)}%
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-1.5 border-t border-border pt-3">
              <Button
                size="sm"
                className="h-8 w-full justify-center gap-1.5 rounded-[6px] text-[12px] shadow-none"
                onClick={() => {
                  toast.success("Marked as reviewed");
                  onOpenChange(false);
                }}
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
