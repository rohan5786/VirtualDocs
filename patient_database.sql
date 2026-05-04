CREATE TABLE IF NOT EXISTS bp_logs(
    patient_id INT,
    log_id INT,
    appt_date DATE,
    time_of_day TIME, # 24 hr clock
    reading_number SMALLINT(3), # 3 digits max [-999, 999]
    SBP VARCHAR(15),
    DBP VARCHAR(15),
    pulse VARCHAR(15),
    patient_status VARCHAR(100)
);

SELECT * from bp_logs;