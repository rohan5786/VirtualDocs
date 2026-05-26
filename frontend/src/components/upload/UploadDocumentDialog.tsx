import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { fetchPatients } from "@/lib/api";
import type { Patient } from "@/data/types";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadDocumentDialog({ open, onOpenChange }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: patients = [] } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });

  const handleSubmit = async () => {
    if (!selectedPatientId || !documentType || !selectedFile) {
      toast.error("Please select a patient, document type, and file.");
      return;
    }

    try {
      const form = new FormData();
      form.append("file", selectedFile);
      form.append("documentType", documentType); // sends "bp" or "imaging"

      const response = await fetch(`/api/patients/${selectedPatientId}/documents`, {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      toast.success("Document uploaded successfully", {
        description: `${selectedFile.name} was attached to patient ${selectedPatientId}.`,
      });

      setSelectedPatientId("");
      setDocumentType("");
      setNotes("");
      setSelectedFile(null);
      onOpenChange(false);

    } catch (error) {
      toast.error("Upload failed", {
        description: "Could not upload the document. Please try again.",
      });
    }
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
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const file = e.dataTransfer.files?.[0];
              if (file) setSelectedFile(file);
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

            <input
              type="file"
              className="mt-4 text-xs"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
            />

            {selectedFile && (
              <p className="mt-2 text-[11px] text-muted-foreground">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Patient</Label>
              <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((p: Patient) => (
                    <SelectItem key={p.patient_id} value={String(p.patient_id)}>
                      {p.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Document type</Label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bp">BP Log</SelectItem>
                  <SelectItem value="imaging">Radiology Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Notes (optional)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any context for the reviewer…"
              className="min-h-[64px] resize-none text-sm"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}