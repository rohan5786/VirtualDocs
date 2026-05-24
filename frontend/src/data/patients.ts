import { fetchPatients } from "@/lib/api";
import { Patient } from "./types";

export const calcAge = (dob: string) => {
  const d = new Date(dob);
  const diff = Date.now() - d.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

export const getPatients = (): Promise<Patient[]> => {
  return fetchPatients() as Promise<Patient[]>;
}