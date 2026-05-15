package com.example;

public class RadiologyLog {
    public int patient_id, log_id;
    public String appt_date, imaging_type, body_part, findings, patient_status;

    public RadiologyLog(
        int patient_id,
        int log_id,
        String appt_date,
        String imaging_type,
        String body_part,
        String findings,
        String patient_status
    ) {
        this.patient_id = patient_id;
        this.log_id = log_id;
        this.appt_date = appt_date;
        this.imaging_type = imaging_type;
        this.body_part = body_part;
        this.findings = findings;
        this.patient_status = patient_status;
    }
}
