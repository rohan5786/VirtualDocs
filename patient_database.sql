USE patient_database;

-- ALTER TABLE attributes ADD COLUMN 
-- doctor_notes VARCHAR(200);


-- CREATE TABLE IF NOT EXISTS bp_logs(
--     patient_id INT,
--     log_id INT,
--     appt_date DATE,
--     time_of_day TIME, # 24 hr clock
--     reading_number SMALLINT(3), # 3 digits max [-999, 999]
--     SBP VARCHAR(15),
--     DBP VARCHAR(15),
--     pulse VARCHAR(15),
--     patient_status VARCHAR(100)
-- );

-- CREATE TABLE IF NOT EXISTS radiology_logs(
-- 	patient_id INT,
--     log_id INT,
--     appt_date DATE,
--     imaging_type VARCHAR(20),
--     body_part VARCHAR(40),
--     findings VARCHAR(50),
--     patient_status VARCHAR(100)
-- );

-- ALTER TABLE bp_logs ADD PRIMARY KEY (patient_id, log_id);
-- ALTER TABLE radiology_logs ADD PRIMARY KEY (patient_id, log_id);

-- ALTER TABLE attributes ADD COLUMN archived TINYINT(1);
-- ALTER TABLE bp_logs ADD COLUMN archived TINYINT(1);
-- ALTER TABLE radiology_logs ADD COLUMN archived TINYINT(1);

ALTER TABLE bp_logs MODIFY COLUMN SBP int;
ALTER TABLE bp_logs MODIFY COLUMN DBP int;
ALTER TABLE bp_logs MODIFY COLUMN pulse int;