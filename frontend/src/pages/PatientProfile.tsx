import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchPatientById } from "@/lib/api";
import { PatientHeader } from "@/components/patient/PatientHeader";
// import { VitalsCard } from "@/components/patient/VitalsCard";
import { DocumentTimeline } from "@/components/patient/DocumentTimeline";
import { Button } from "@/components/ui/button";

export default function PatientProfile() {
  const { id } = useParams<{ id: string }>();

  const { data: patient, isLoading, error } = useQuery({
    queryKey: ["patient", id],
    queryFn: () => fetchPatientById(id!),
    enabled: !!id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error || !patient) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <h1 className="text-[18px] font-semibold">Patient not found</h1>
        <p className="mt-1.5 text-[13px] text-muted-foreground">
          This record may have been moved or deleted.
        </p>
        <Button asChild className="mt-4 h-8 rounded-[6px] text-[12px]">
          <Link to="/patients">Back to patients</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-5 md:px-8 md:py-6 space-y-4 animate-fade-in">
      <Link
        to="/patients"
        className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" strokeWidth={1.75} /> Back to patients
      </Link>

      <PatientHeader patient={patient} />

      <div>
      {/* <div className="grid gap-4 lg:grid-cols-[260px_1fr]"> */}
        {/* <aside className="lg:sticky lg:top-16 lg:self-start">
          <VitalsCard patient={patient} />
        </aside> */}
        <DocumentTimeline patientId={patient.patient.id} />
      </div>
    </div>
  );
}