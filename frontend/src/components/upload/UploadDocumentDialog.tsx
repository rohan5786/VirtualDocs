import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileText, Image as ImageIcon, FileCode } from "lucide-react";
import { patients } from "@/data/patients";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadDocumentDialog({ open, onOpenChange }: Props) {
  const [dragOver, setDragOver] = useState(false);

  const handleSubmit = () => {
    onOpenChange(false);
    toast.success("Document queued for parsing", {
      description: "You'll be notified when extraction is complete.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Add a clinical document to a patient record. Files are parsed and routed automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
            }}
            className={`flex flex-col items-center justify-center rounded-[8px] border border-dashed p-7 text-center transition-colors ${
              dragOver ? "border-primary bg-primary-soft" : "border-border bg-secondary/50"
            }`}
          >
            <Upload className="h-5 w-5 text-muted-foreground" strokeWidth={1.75} />
            <p className="mt-2.5 text-[13px] font-medium">Drag and drop files here</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">or click to browse</p>
            <div className="mt-3 flex flex-wrap justify-center gap-1">
              <span className="inline-flex items-center gap-1 rounded-[4px] bg-card px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground border border-border">
                <FileText className="h-3 w-3" strokeWidth={1.75} /> PDF
              </span>
              <span className="inline-flex items-center gap-1 rounded-[4px] bg-card px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground border border-border">
                <ImageIcon className="h-3 w-3" strokeWidth={1.75} /> JPG / PNG
              </span>
              <span className="inline-flex items-center gap-1 rounded-[4px] bg-card px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground border border-border">
                <FileCode className="h-3 w-3" strokeWidth={1.75} /> HL7
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Patient</Label>
              <Select>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.firstName} {p.lastName} · {p.mrn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Document type</Label>
              <Select>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bp">BP Log</SelectItem>
                  <SelectItem value="lab">Outside Lab</SelectItem>
                  <SelectItem value="imaging">Radiology Report</SelectItem>
                  <SelectItem value="note">Provider Note</SelectItem>
                  <SelectItem value="referral">Referral Note</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Notes (optional)</Label>
            <Textarea placeholder="Any context for the reviewer…" className="min-h-[64px] resize-none text-sm" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
