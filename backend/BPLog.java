public class BPLog {
    public int patient_id, log_id, reading_number;
    public String appt_date, time_of_day, SBP, DBP, pulse, patient_status;

    public BPLog(
        int patient_id,
        int log_id,
        int reading_number,
        String appt_date,
        String time_of_day,
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

    public String toString() {
        final String bp_string = 
            patient_id + " | " + 
            log_id + " | " + 
            reading_number + " | " + 
            appt_date + " | " + 
            time_of_day + " | " + 
            SBP + " | " + 
            DBP + " | " + 
            pulse + " | " + 
            patient_status;
        return bp_string;
    }
}
