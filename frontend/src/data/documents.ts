import type { ClinicalDocument } from "./types";

export const documents: ClinicalDocument[] = [
  // Margaret Alvarez — pt_001
  {
    id: "doc_1001",
    patientId: "pt_001",
    type: "Outside Lab",
    category: "lab",
    date: "2025-04-10T14:22:00Z",
    source: "Quest Diagnostics",
    summary: "Creatinine 1.8 mg/dL (↑ from 1.6). eGFR 38. Potassium 5.1.",
    status: "flagged",
    extracted: [
      { label: "Creatinine", value: "1.8 mg/dL", flag: "high", confidence: 0.98 },
      { label: "eGFR", value: "38 mL/min/1.73m²", flag: "low", confidence: 0.97 },
      { label: "Potassium", value: "5.1 mmol/L", flag: "high", confidence: 0.99 },
      { label: "BUN", value: "32 mg/dL", flag: "high", confidence: 0.96 },
      { label: "Urine ACR", value: "245 mg/g", flag: "high", confidence: 0.94 },
    ],
  },
  {
    id: "doc_1002",
    patientId: "pt_001",
    type: "BP Log",
    category: "bp",
    date: "2025-04-07T09:00:00Z",
    source: "Patient home upload",
    summary: "14-day average 148/94. Morning readings consistently elevated.",
    status: "parsed",

    // NEW: BPLog SQL/class fields
    logID: "doc_1002",
    uploadDate: "2025-04-07",
    startDate: "2025-03-25",
    endDate: "2025-04-07",
    SBP: 148,
    DBP: 94,
    pulse: 78,
    readingNumber: 28,
    averageSystolic: 148,
    averageDiastolic: 94,
    readingsCount: 28,

    extracted: [
      { label: "BP Average", value: "148/94 mmHg", flag: "high", confidence: 0.99 },
      { label: "Morning Avg", value: "152/96 mmHg", flag: "high", confidence: 0.98 },
      { label: "Evening Avg", value: "144/92 mmHg", flag: "high", confidence: 0.98 },
      { label: "Readings", value: "28 entries", confidence: 1.0 },
    ],
  },
  {
    id: "doc_1003",
    patientId: "pt_001",
    type: "Provider Note",
    category: "note",
    date: "2025-04-08T16:30:00Z",
    source: "Dr. Eleanor Chen — Nephrology",
    summary: "Increased losartan to 100 mg daily. Counseled on low-sodium diet. F/U 6 weeks.",
    status: "parsed",
    extracted: [
      { label: "Plan", value: "Increase losartan 50 → 100 mg", confidence: 0.96 },
      { label: "Follow-up", value: "6 weeks", confidence: 1.0 },
      { label: "Diet", value: "<2 g sodium/day", confidence: 0.94 },
    ],
  },
  {
    id: "doc_1004",
    patientId: "pt_001",
    type: "Radiology Report",
    category: "imaging",
    date: "2025-02-19T11:00:00Z",
    source: "UCSF Imaging",
    summary: "Renal ultrasound — bilateral kidneys normal in size. No hydronephrosis.",
    status: "parsed",

    // NEW: RadiologyReport SQL/class fields
    reportID: "doc_1004",
    reportDate: "2025-02-19",
    imagingType: "Renal Ultrasound",
    bodyPart: "Kidneys",
    findings: "Bilateral kidneys normal in size. No hydronephrosis.",

    extracted: [
      { label: "Right kidney", value: "10.8 cm", flag: "normal", confidence: 0.97 },
      { label: "Left kidney", value: "11.1 cm", flag: "normal", confidence: 0.97 },
      { label: "Hydronephrosis", value: "None", confidence: 0.99 },
    ],
  },
  {
    id: "doc_1005",
    patientId: "pt_001",
    type: "Outside Lab",
    category: "lab",
    date: "2025-01-12T08:15:00Z",
    source: "LabCorp",
    summary: "Creatinine 1.6, eGFR 42, HbA1c 7.4%.",
    status: "parsed",
    extracted: [
      { label: "Creatinine", value: "1.6 mg/dL", flag: "high", confidence: 0.98 },
      { label: "eGFR", value: "42 mL/min/1.73m²", flag: "low", confidence: 0.98 },
      { label: "HbA1c", value: "7.4%", flag: "high", confidence: 0.99 },
    ],
  },
  {
    id: "doc_1006",
    patientId: "pt_001",
    type: "Referral Note",
    category: "referral",
    date: "2024-11-04T13:45:00Z",
    source: "Dr. S. Patel — Endocrinology",
    summary: "Co-management for diabetes optimization. Started empagliflozin.",
    status: "parsed",
    extracted: [
      { label: "Medication added", value: "Empagliflozin 10 mg", confidence: 0.97 },
      { label: "Co-management", value: "Endocrinology + Nephrology", confidence: 0.93 },
    ],
  },

  // James Whitfield — pt_002
  {
    id: "doc_2001",
    patientId: "pt_002",
    type: "BP Log",
    category: "bp",
    date: "2025-04-11T07:30:00Z",
    source: "Patient home upload",
    summary: "21-day BP log: average 162/98 despite 4-drug regimen. Adherence confirmed.",
    status: "flagged",

    // NEW: BPLog SQL/class fields
    logID: "doc_2001",
    uploadDate: "2025-04-11",
    startDate: "2025-03-20",
    endDate: "2025-04-11",
    SBP: 162,
    DBP: 98,
    pulse: 82,
    readingNumber: 42,
    averageSystolic: 162,
    averageDiastolic: 98,
    readingsCount: 42,

    extracted: [
      { label: "BP Average", value: "162/98 mmHg", flag: "high", confidence: 0.99 },
      { label: "Highest", value: "184/108 mmHg", flag: "high", confidence: 0.99 },
      { label: "Lowest", value: "138/82 mmHg", confidence: 0.99 },
      { label: "Adherence", value: "Reported 100%", confidence: 0.85 },
    ],
  },
  {
    id: "doc_2002",
    patientId: "pt_002",
    type: "Provider Note",
    category: "note",
    date: "2025-04-11T15:00:00Z",
    source: "Dr. Eleanor Chen — Nephrology",
    summary: "Resistant HTN. Ordered renal artery doppler and aldosterone:renin ratio.",
    status: "review_needed",
    extracted: [
      { label: "Workup", value: "Doppler + ARR", confidence: 0.96 },
      { label: "Plan", value: "Add chlorthalidone 25 mg", confidence: 0.95 },
    ],
  },
  {
    id: "doc_2003",
    patientId: "pt_002",
    type: "Outside Lab",
    category: "lab",
    date: "2025-03-20T09:10:00Z",
    source: "Quest Diagnostics",
    summary: "Aldosterone elevated, renin suppressed. ARR > 30. Suggests primary aldo.",
    status: "flagged",
    extracted: [
      { label: "Aldosterone", value: "28 ng/dL", flag: "high", confidence: 0.97 },
      { label: "Renin", value: "0.4 ng/mL/hr", flag: "low", confidence: 0.97 },
      { label: "ARR", value: "70", flag: "high", confidence: 0.96 },
    ],
  },
  {
    id: "doc_2004",
    patientId: "pt_002",
    type: "Radiology Report",
    category: "imaging",
    date: "2025-03-25T10:30:00Z",
    source: "Stanford Imaging",
    summary: "Renal artery doppler — no hemodynamically significant stenosis.",
    status: "parsed",

    // NEW: RadiologyReport SQL/class fields
    reportID: "doc_2004",
    reportDate: "2025-03-25",
    imagingType: "Renal Artery Doppler",
    bodyPart: "Renal Arteries",
    findings: "No hemodynamically significant stenosis.",

    extracted: [
      { label: "Right RAR", value: "1.8", flag: "normal", confidence: 0.95 },
      { label: "Left RAR", value: "2.1", flag: "normal", confidence: 0.95 },
      { label: "Stenosis", value: "None significant", confidence: 0.97 },
    ],
  },
  {
    id: "doc_2005",
    patientId: "pt_002",
    type: "Referral Note",
    category: "referral",
    date: "2025-04-12T11:00:00Z",
    source: "Dr. Eleanor Chen — Nephrology",
    summary: "Referral to endocrine surgery for adrenal vein sampling consideration.",
    status: "parsed",
    extracted: [
      { label: "Referral to", value: "Endocrine Surgery", confidence: 0.98 },
      { label: "Reason", value: "Suspected primary aldosteronism", confidence: 0.96 },
    ],
  },

  // Priya Nair — pt_003
  {
    id: "doc_3001",
    patientId: "pt_003",
    type: "Radiology Report",
    category: "imaging",
    date: "2025-03-28T14:00:00Z",
    source: "UCSF Imaging",
    summary: "Renal MRI — bilateral cysts, total kidney volume 1,420 mL. Mayo Class 1C.",
    status: "parsed",

    // NEW: RadiologyReport SQL/class fields
    reportID: "doc_3001",
    reportDate: "2025-03-28",
    imagingType: "Renal MRI",
    bodyPart: "Kidneys",
    findings: "Bilateral cysts with enlarged total kidney volume.",

    extracted: [
      { label: "TKV", value: "1,420 mL", flag: "high", confidence: 0.96 },
      { label: "Mayo Class", value: "1C", confidence: 0.94 },
      { label: "Largest cyst", value: "4.2 cm (left)", confidence: 0.92 },
    ],
  },
  {
    id: "doc_3002",
    patientId: "pt_003",
    type: "Provider Note",
    category: "note",
    date: "2025-03-29T10:15:00Z",
    source: "Dr. Marcus Patel — Nephrology",
    summary: "Discussed tolvaptan candidacy. Patient considering. F/U in 3 months.",
    status: "parsed",
    extracted: [
      { label: "Plan", value: "Tolvaptan discussion", confidence: 0.95 },
      { label: "Follow-up", value: "3 months", confidence: 1.0 },
    ],
  },
  {
    id: "doc_3003",
    patientId: "pt_003",
    type: "Outside Lab",
    category: "lab",
    date: "2025-03-15T08:00:00Z",
    source: "Quest Diagnostics",
    summary: "Stable renal function. Creatinine 1.1, eGFR 72.",
    status: "parsed",
    extracted: [
      { label: "Creatinine", value: "1.1 mg/dL", flag: "normal", confidence: 0.99 },
      { label: "eGFR", value: "72 mL/min/1.73m²", flag: "normal", confidence: 0.99 },
      { label: "Urine ACR", value: "18 mg/g", flag: "normal", confidence: 0.97 },
    ],
  },
  {
    id: "doc_3004",
    patientId: "pt_003",
    type: "BP Log",
    category: "bp",
    date: "2025-03-20T07:00:00Z",
    source: "Patient home upload",
    summary: "BP average 132/84 over 14 days. Well-controlled on amlodipine.",
    status: "parsed",

    // NEW: BPLog SQL/class fields
    logID: "doc_3004",
    uploadDate: "2025-03-20",
    startDate: "2025-03-06",
    endDate: "2025-03-20",
    SBP: 132,
    DBP: 84,
    pulse: 72,
    readingNumber: 26,
    averageSystolic: 132,
    averageDiastolic: 84,
    readingsCount: 26,

    extracted: [
      { label: "BP Average", value: "132/84 mmHg", flag: "normal", confidence: 0.99 },
      { label: "Readings", value: "26 entries", confidence: 1.0 },
    ],
  },
  {
    id: "doc_3005",
    patientId: "pt_003",
    type: "Referral Note",
    category: "referral",
    date: "2024-12-10T13:00:00Z",
    source: "Dr. K. Lee — Genetics",
    summary: "PKD1 mutation confirmed. Genetic counseling completed for family.",
    status: "parsed",
    extracted: [
      { label: "Mutation", value: "PKD1 (truncating)", confidence: 0.98 },
      { label: "Counseling", value: "Completed", confidence: 0.99 },
    ],
  },

  // Robert Chen — pt_004
  {
    id: "doc_4001",
    patientId: "pt_004",
    type: "Outside Lab",
    category: "lab",
    date: "2025-04-13T08:45:00Z",
    source: "LabCorp",
    summary: "Creatinine 2.6 (↑), eGFR 24, K 5.3, urine ACR 320.",
    status: "flagged",
    extracted: [
      { label: "Creatinine", value: "2.6 mg/dL", flag: "high", confidence: 0.99 },
      { label: "eGFR", value: "24 mL/min/1.73m²", flag: "low", confidence: 0.99 },
      { label: "Potassium", value: "5.3 mmol/L", flag: "high", confidence: 0.99 },
      { label: "Urine ACR", value: "320 mg/g", flag: "high", confidence: 0.97 },
      { label: "Hgb", value: "10.2 g/dL", flag: "low", confidence: 0.98 },
    ],
  },
  {
    id: "doc_4002",
    patientId: "pt_004",
    type: "Provider Note",
    category: "note",
    date: "2025-04-14T11:00:00Z",
    source: "Dr. Eleanor Chen — Nephrology",
    summary: "CKD 4. Initiated AV fistula planning discussion. Patiromer added for K.",
    status: "review_needed",
    extracted: [
      { label: "Plan", value: "Vascular access referral", confidence: 0.97 },
      { label: "Med added", value: "Patiromer 8.4 g daily", confidence: 0.96 },
      { label: "Stage", value: "CKD 4", confidence: 0.99 },
    ],
  },
  {
    id: "doc_4003",
    patientId: "pt_004",
    type: "Referral Note",
    category: "referral",
    date: "2025-04-15T09:30:00Z",
    source: "Dr. Eleanor Chen — Nephrology",
    summary: "Referral to vascular surgery for AV fistula creation evaluation.",
    status: "parsed",
    extracted: [
      { label: "Referral to", value: "Vascular Surgery", confidence: 0.99 },
      { label: "Reason", value: "AV fistula planning", confidence: 0.98 },
    ],
  },
  {
    id: "doc_4004",
    patientId: "pt_004",
    type: "Radiology Report",
    category: "imaging",
    date: "2025-03-02T10:00:00Z",
    source: "UCSF Imaging",
    summary: "Renal ultrasound — bilateral echogenic kidneys, R 9.2 cm, L 9.0 cm.",
    status: "parsed",

    // NEW: RadiologyReport SQL/class fields
    reportID: "doc_4004",
    reportDate: "2025-03-02",
    imagingType: "Renal Ultrasound",
    bodyPart: "Kidneys",
    findings: "Bilateral echogenic kidneys with reduced size.",

    extracted: [
      { label: "Right kidney", value: "9.2 cm", flag: "low", confidence: 0.97 },
      { label: "Left kidney", value: "9.0 cm", flag: "low", confidence: 0.97 },
      { label: "Echogenicity", value: "Increased bilaterally", confidence: 0.95 },
    ],
  },
  {
    id: "doc_4005",
    patientId: "pt_004",
    type: "BP Log",
    category: "bp",
    date: "2025-04-10T07:15:00Z",
    source: "Patient home upload",
    summary: "BP average 138/76. Adequate control on current regimen.",
    status: "parsed",

    // NEW: BPLog SQL/class fields
    logID: "doc_4005",
    uploadDate: "2025-04-10",
    startDate: "2025-03-27",
    endDate: "2025-04-10",
    SBP: 138,
    DBP: 76,
    pulse: 70,
    readingNumber: 21,
    averageSystolic: 138,
    averageDiastolic: 76,
    readingsCount: 21,

    extracted: [
      { label: "BP Average", value: "138/76 mmHg", flag: "normal", confidence: 0.99 },
      { label: "Readings", value: "21 entries", confidence: 1.0 },
    ],
  },
  {
    id: "doc_4006",
    patientId: "pt_004",
    type: "Outside Lab",
    category: "lab",
    date: "2025-02-08T09:00:00Z",
    source: "LabCorp",
    summary: "Creatinine 2.3, eGFR 27. Stable proteinuria.",
    status: "parsed",
    extracted: [
      { label: "Creatinine", value: "2.3 mg/dL", flag: "high", confidence: 0.99 },
      { label: "eGFR", value: "27 mL/min/1.73m²", flag: "low", confidence: 0.99 },
    ],
  },

  // Aisha Johnson — pt_005
  {
    id: "doc_5001",
    patientId: "pt_005",
    type: "Outside Lab",
    category: "lab",
    date: "2025-04-08T08:30:00Z",
    source: "Quest Diagnostics",
    summary: "Aldosterone:renin ratio 64. Potassium 3.2. Suggests primary aldosteronism.",
    status: "flagged",
    extracted: [
      { label: "Aldosterone", value: "22 ng/dL", flag: "high", confidence: 0.97 },
      { label: "Renin", value: "0.34 ng/mL/hr", flag: "low", confidence: 0.97 },
      { label: "ARR", value: "64", flag: "high", confidence: 0.96 },
      { label: "Potassium", value: "3.2 mmol/L", flag: "low", confidence: 0.99 },
    ],
  },
  {
    id: "doc_5002",
    patientId: "pt_005",
    type: "Provider Note",
    category: "note",
    date: "2025-04-09T14:30:00Z",
    source: "Dr. Marcus Patel — Nephrology",
    summary: "Started spironolactone 25 mg. Adrenal CT ordered.",
    status: "parsed",
    extracted: [
      { label: "Med started", value: "Spironolactone 25 mg", confidence: 0.98 },
      { label: "Imaging", value: "Adrenal CT", confidence: 0.97 },
    ],
  },
  {
    id: "doc_5003",
    patientId: "pt_005",
    type: "BP Log",
    category: "bp",
    date: "2025-04-05T06:45:00Z",
    source: "Patient home upload",
    summary: "BP average 152/96. Highest morning reading 168/102.",
    status: "flagged",

    // NEW: BPLog SQL/class fields
    logID: "doc_5003",
    uploadDate: "2025-04-05",
    startDate: "2025-03-22",
    endDate: "2025-04-05",
    SBP: 152,
    DBP: 96,
    pulse: 84,
    readingNumber: 30,
    averageSystolic: 152,
    averageDiastolic: 96,
    readingsCount: 30,

    extracted: [
      { label: "BP Average", value: "152/96 mmHg", flag: "high", confidence: 0.99 },
      { label: "Highest", value: "168/102 mmHg", flag: "high", confidence: 0.99 },
    ],
  },
  {
    id: "doc_5004",
    patientId: "pt_005",
    type: "Referral Note",
    category: "referral",
    date: "2025-03-22T10:00:00Z",
    source: "Dr. M. Reyes — Primary Care",
    summary: "Referral for new-onset HTN at age 40 with hypokalemia. R/o secondary causes.",
    status: "parsed",
    extracted: [
      { label: "Reason", value: "Secondary HTN workup", confidence: 0.98 },
      { label: "Age at onset", value: "40", confidence: 0.99 },
    ],
  },
  {
    id: "doc_5005",
    patientId: "pt_005",
    type: "Radiology Report",
    category: "imaging",
    date: "2025-04-14T11:15:00Z",
    source: "UCSF Imaging",
    summary: "Adrenal CT — 1.4 cm left adrenal nodule, lipid-rich. Likely adenoma.",
    status: "review_needed",

    // NEW: RadiologyReport SQL/class fields
    reportID: "doc_5005",
    reportDate: "2025-04-14",
    imagingType: "Adrenal CT",
    bodyPart: "Adrenal Glands",
    findings: "1.4 cm lipid-rich left adrenal nodule likely representing adenoma.",

    extracted: [
      { label: "Left adrenal", value: "1.4 cm nodule", flag: "high", confidence: 0.96 },
      { label: "Hounsfield units", value: "8 HU", confidence: 0.95 },
      { label: "Impression", value: "Likely adenoma", confidence: 0.93 },
    ],
  },
];

export const getDocumentsByPatient = (patientId: string) =>
  documents
    .filter((d) => d.patientId === patientId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getRecentDocuments = (limit = 6) =>
  [...documents]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

export const getFlaggedCount = () =>
  documents.filter((d) => d.status === "flagged" || d.status === "review_needed").length;
