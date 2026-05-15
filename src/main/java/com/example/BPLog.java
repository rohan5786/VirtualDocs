package com.example;

public class BPLog {
    public int patient_id, log_id, reading_number;
    public String appt_date, time_of_day, SBP, DBP, pulse, patient_status;

    public BPLog(
        int patient_id,
        int log_id,
        String appt_date,
        String time_of_day,
        int reading_number,
        String SBP,
        String DBP,
        String pulse,
        String patient_status
    ) {
        this.patient_id = patient_id;
        this.log_id = log_id;
        this.reading_number = reading_number;
        this.appt_date = appt_date;
        this.time_of_day = time_of_day;
        this.SBP = SBP;
        this.DBP = DBP;
        this.pulse = pulse;
        this.patient_status = patient_status;
    }
}
