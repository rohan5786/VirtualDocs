package com.example;

import java.util.HashMap;

public class Patient {
    public String full_name, date_of_birth, allergies, existing_medications, phone_number, address,
            primary_provider, insurance, documents, doctor_notes;
    public int patient_id, sex; // 1 = male, 0 = female
    public boolean hipaa_agreement;

    private HashMap<Integer, BPLog> bpLogs;
    private HashMap<Integer, RadiologyLog> radiologyLogs;

    public Patient(
        String full_name,
        int patient_id,
        String date_of_birth, 
        int sex, 
        String allergies,
        String existing_medications,
        String phone_number,
        String address,
        String primary_provider,
        String insurance,
        String documents,
        boolean hipaa_agreement,
        String doctor_notes
    ) {
        this.full_name = full_name;
        this.patient_id = patient_id;
        this.date_of_birth = date_of_birth;
        this.sex = sex;
        this.allergies = allergies;
        this.existing_medications = existing_medications;
        this.phone_number = phone_number;
        this.address = address;
        this.primary_provider = primary_provider;
        this.insurance = insurance;
        this.documents = documents;
        this.hipaa_agreement = hipaa_agreement;
        this.doctor_notes = doctor_notes;

        bpLogs = new HashMap<>();
        radiologyLogs = new HashMap<>();
    }

    public void addBP(BPLog bp) {
        bpLogs.put(bp.log_id, bp);
    }

    public void addRadiology(RadiologyLog rl) {
        radiologyLogs.put(rl.log_id, rl);
    }

    public String toString() {
        final String patient_string =  
            full_name + " | " +
            patient_id + " | " +
            date_of_birth + " | " +
            (sex == 1 ? "male" : "female") + " | " +
            allergies + " | " +
            existing_medications + " | " +
            phone_number + " | " +
            address + " | " +
            primary_provider + " | " +
            insurance + " | " +
            documents + " | " +
            hipaa_agreement;
        return patient_string;
    }

}
