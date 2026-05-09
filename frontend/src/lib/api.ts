const BASE = "/api";   // proxied to localhost:8080 by Vite (what runs the frontend)

// patients only
export async function fetchPatients() {
  const res = await fetch(`${BASE}/patients`);
  if (!res.ok) throw new Error(`Failed to fetch patients: ${res.status}`);
  return res.json();
}

export async function fetchPatientById(id: string) {
  const res = await fetch(`${BASE}/patients/${parseInt(id)}`);
  if (!res.ok) throw new Error(`Patient not found: ${res.status}`);
  return res.json();
}

export async function createPatient(patient: object) {
  const res = await fetch(`${BASE}/patients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  });
  if (!res.ok) throw new Error(`Create patient failed: ${res.status}`);
  return res.json();
}

// BP logs
export async function fetchBpLogs(patientId: string) {
  const res = await fetch(`${BASE}/patients/${patientId}/bplogs`);
  if (!res.ok) throw new Error(`Failed to fetch BP logs: ${res.status}`);
  return res.json();
}

export async function createBpLog(patientId: string, log: object) {
  const res = await fetch(`${BASE}/patients/${patientId}/bplogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(log),
  });
  if (!res.ok) throw new Error(`Create BP log failed: ${res.status}`);
  return res.json();
}

// Radiology logs
export async function fetchRadiologyReports(patientId: string) {
  const res = await fetch(`${BASE}/patients/${patientId}/radiology`);
  if (!res.ok) throw new Error(`Failed to fetch reports: ${res.status}`);
  return res.json();
}

export async function createRadiologyReport(patientId: string, report: object) {
  const res = await fetch(`${BASE}/patients/${patientId}/radiology`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report),
  });
  if (!res.ok) throw new Error(`Create report failed: ${res.status}`);
  return res.json();
}