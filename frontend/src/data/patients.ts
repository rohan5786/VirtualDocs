import type { Patient } from "./types";

export const patients: Patient[] = [
  {
    id: "pt_001",
    patientID: "pt_001", // NEW: SQL-style patient ID
    mrn: "MRN-48201",
    firstName: "Margaret",
    lastName: "Alvarez",
    fullName: "Margaret Alvarez", // NEW: SQL-style full name
    dob: "1956-03-12",
    sex: "F",
    phone: "(415) 555-0142",
    phoneNumber: "(415) 555-0142", // NEW: SQL-style phone number
    address: "2148 Pine Street, San Francisco, CA", // NEW: patient address
    primaryDiagnosis: "CKD Stage 3b",
    primaryProvider: "Dr. Eleanor Chen",
    insurance: "Blue Shield PPO",
    allergies: ["Lisinopril (cough)", "Sulfa drugs"],
    existingMedications: [ // NEW: medications list
      "Losartan 100 mg",
      "Amlodipine 10 mg",
      "Empagliflozin"
    ],
    hippaAgreement: true, // NEW: HIPAA agreement status
    documents: [ // NEW: linked document IDs
      "doc_1001", "doc_1002", "doc_1003", "doc_1004", "doc_1005", "doc_1006"],
    summary:
      "68 y/o female with progressive CKD secondary to long-standing hypertension and type 2 diabetes. eGFR trending down over 12 months. Currently on losartan 100 mg, amlodipine 10 mg, and empagliflozin.",
    vitals: {
      latestBp: "148/94",
      bpAvg: "144/91",
      creatinine: "1.8",
      creatinineTrend: "up",
      egfr: 38,
      egfrTrend: "down",
    },
    lastVisit: "2025-04-08",
  },

  {
    id: "pt_002",
    patientID: "pt_002", // NEW
    mrn: "MRN-48377",
    firstName: "James",
    lastName: "Whitfield",
    fullName: "James Whitfield", // NEW
    dob: "1962-09-04",
    sex: "M",
    phone: "(415) 555-0188",
    phoneNumber: "(415) 555-0188", // NEW
    address: "87 Laurel Avenue, San Francisco, CA", // NEW
    primaryDiagnosis: "Resistant Hypertension",
    primaryProvider: "Dr. Eleanor Chen",
    insurance: "Aetna HMO",
    allergies: ["NKDA"],
    existingMedications: [ // NEW
      "Chlorthalidone 25 mg",
      "Amlodipine 10 mg",
      "Valsartan 320 mg",
      "Carvedilol 12.5 mg"
    ],
    hippaAgreement: true, // NEW
    documents: [ // NEW
      "doc_2001", "doc_2002", "doc_2003", "doc_2004", "doc_2005"],
    summary:
      "62 y/o male with resistant HTN despite 4-drug regimen. Recent home BP log shows persistent elevation. Workup for secondary causes pending — renal artery doppler ordered.",
    vitals: {
      latestBp: "162/98",
      bpAvg: "158/96",
      creatinine: "1.2",
      creatinineTrend: "flat",
      egfr: 64,
      egfrTrend: "flat",
    },
    lastVisit: "2025-04-11",
  },

  {
    id: "pt_003",
    patientID: "pt_003", // NEW
    mrn: "MRN-48512",
    firstName: "Priya",
    lastName: "Nair",
    fullName: "Priya Nair", // NEW
    dob: "1978-11-22",
    sex: "F",
    phone: "(415) 555-0203",
    phoneNumber: "(415) 555-0203", // NEW
    address: "329 Cedar Lane, Oakland, CA", // NEW
    primaryDiagnosis: "Polycystic Kidney Disease",
    primaryProvider: "Dr. Marcus Patel",
    insurance: "Kaiser Permanente",
    allergies: ["Iodinated contrast"],
    existingMedications: [ // NEW
      "Lisinopril 20 mg",
      "Tolvaptan evaluation pending"
    ],
    hippaAgreement: true, // NEW
    documents: [ // NEW
      "doc_3001", "doc_3002", "doc_3003", "doc_3004", "doc_3005"],
    summary:
      "46 y/o female with ADPKD, family history positive (mother on dialysis at 58). Stable renal function with mild HTN. Counseled on tolvaptan candidacy at last visit.",
    vitals: {
      latestBp: "132/84",
      bpAvg: "130/82",
      creatinine: "1.1",
      creatinineTrend: "flat",
      egfr: 72,
      egfrTrend: "flat",
    },
    lastVisit: "2025-03-29",
  },

  {
    id: "pt_004",
    patientID: "pt_004", // NEW
    mrn: "MRN-48698",
    firstName: "Robert",
    lastName: "Chen",
    fullName: "Robert Chen", // NEW
    dob: "1949-06-30",
    sex: "M",
    phone: "(415) 555-0241",
    phoneNumber: "(415) 555-0241", // NEW
    address: "1059 Mission Street, San Francisco, CA", // NEW
    primaryDiagnosis: "CKD Stage 4 + Proteinuria",
    primaryProvider: "Dr. Eleanor Chen",
    insurance: "Medicare",
    allergies: ["Penicillin"],
    existingMedications: [ // NEW
      "Patiromer",
      "Darbepoetin",
      "Losartan 50 mg"
    ],
    hippaAgreement: true, // NEW
    documents: [ // NEW
      "doc_4001", "doc_4002", "doc_4003", "doc_4004", "doc_4005", "doc_4006"],
    summary:
      "75 y/o male with advanced CKD, urine ACR > 300. Discussion of vascular access planning initiated. Hgb stable on darbepoetin q3 weeks.",
    vitals: {
      latestBp: "138/76",
      bpAvg: "136/78",
      creatinine: "2.6",
      creatinineTrend: "up",
      egfr: 24,
      egfrTrend: "down",
    },
    lastVisit: "2025-04-14",
  },

  {
    id: "pt_005",
    patientID: "pt_005", // NEW
    mrn: "MRN-48804",
    firstName: "Aisha",
    lastName: "Johnson",
    fullName: "Aisha Johnson", // NEW
    dob: "1985-01-17",
    sex: "F",
    phone: "(415) 555-0276",
    phoneNumber: "(415) 555-0276", // NEW
    address: "742 Market Street, San Francisco, CA", // NEW
    primaryDiagnosis: "Secondary Hypertension — workup",
    primaryProvider: "Dr. Marcus Patel",
    insurance: "United Healthcare",
    allergies: ["Latex"],
    existingMedications: [ // NEW
      "Spironolactone 25 mg"
    ],
    hippaAgreement: true, // NEW
    documents: [ // NEW
      "doc_5001", "doc_5002", "doc_5003", "doc_5004", "doc_5005"],
    summary:
      "40 y/o female referred from PCP for new-onset HTN with hypokalemia. Aldosterone:renin ratio elevated; awaiting adrenal imaging. Currently on spironolactone 25 mg.",
    vitals: {
      latestBp: "152/96",
      bpAvg: "149/93",
      creatinine: "0.9",
      creatinineTrend: "flat",
      egfr: 88,
      egfrTrend: "flat",
    },
    lastVisit: "2025-04-09",
  },
];

export const getPatientById = (id: string) => patients.find((p) => p.id === id);

export const calcAge = (dob: string) => {
  const d = new Date(dob);
  const diff = Date.now() - d.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};