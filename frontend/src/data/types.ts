// SQL-shaped types — mirror what real DB rows would look like.

export interface Patient {
  // from the sql database table
  full_name: string;
  patient_id: number;
  date_of_birth: string;
  sex: number;
  allergies: string;
  existing_medications: string;
  phone_number: string;
  address: string;
  primary_provider: string;
  insurance: string;
  documents: string;
  hipaa_agreement: boolean;
  doctor_notes: string;
  archived: boolean;
}

export interface BPLog {
  patient_id: number;
  log_id: number;
  appt_date: string;
  time_of_day: string;
  SBP: string;
  DBP: string;
  pulse: string;
  patient_status: string;
  archived: boolean;
}

export interface RadiologyReport {
  patient_id: number;
  log_id: number;
  appt_date: string;
  imaging_type: string;
  body_part: string;
  findings: string;
  patient_status: string;
  archived: boolean;
}