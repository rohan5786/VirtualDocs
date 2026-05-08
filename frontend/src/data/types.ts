// SQL-shaped types — mirror what real DB rows would look like.

export type Sex = "M" | "F";

export interface Patient {
  // Existing Lovable/frontend fields
  id: string; // PK
  mrn: string;
  firstName: string;
  lastName: string;
  dob: string; // ISO date
  sex: Sex;
  phone: string;
  primaryDiagnosis: string;
  primaryProvider: string;
  insurance: string;
  allergies: string[];
  summary: string;
  vitals: {
    latestBp: string;
    bpAvg: string;
    creatinine: string;
    creatinineTrend: "up" | "down" | "flat";
    egfr: number;
    egfrTrend: "up" | "down" | "flat";
  };
  lastVisit: string; // ISO

  // NEW: Added fields to match SQL/backend structure
  patientID: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  hippaAgreement: boolean;
  existingMedications: string[];
  documents: string[];
}

export interface BPLog {
  logID: string;
  patientID: string;
  uploadDate: string;
  startDate: string;
  endDate: string;
  SBP: number;
  DBP: number;
  pulse: number;
  readingNumber: number;
  averageSystolic: number;
  averageDiastolic: number;
  readingsCount: number;
  status: string;
}

export interface RadiologyReport {
  reportID: string;
  patientID: string;
  reportDate: string;
  imagingType: string;
  bodyPart: string;
  findings: string;
  status: string;
}

export type DocumentType =
  | "BP Log"
  | "Radiology Report"
  | "Outside Lab"
  | "Provider Note"
  | "Referral Note";

export type DocumentStatus = "parsed" | "flagged" | "review_needed";

export type DocumentCategory =
  | "bp"
  | "lab"
  | "imaging"
  | "note"
  | "referral";

export interface ExtractedField {
  label: string;
  value: string;
  flag?: "high" | "low" | "normal";
  confidence?: number; // 0-1
}

export interface ClinicalDocument {
  // Existing Lovable/frontend fields
  id: string; // PK
  patientId: string; // FK -> patients.id
  type: DocumentType;
  category: DocumentCategory;
  date: string; // ISO
  source: string;
  summary: string;
  status: DocumentStatus;
  extracted: ExtractedField[];

  // NEW: BPLog SQL/class fields
  logID?: string;
  uploadDate?: string;
  startDate?: string;
  endDate?: string;
  SBP?: number;
  DBP?: number;
  pulse?: number;
  readingNumber?: number;
  averageSystolic?: number;
  averageDiastolic?: number;
  readingsCount?: number;

  // NEW: RadiologyReport SQL/class fields
  reportID?: string;
  reportDate?: string;
  imagingType?: string;
  bodyPart?: string;
  findings?: string;
}