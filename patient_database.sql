CREATE DATABASE IF NOT EXISTS patient_database;
USE patient_database;

CREATE TABLE attributes (
	full_name VARCHAR(100),
    patient_id INT,
	date_of_birth DATE,
	sex TINYINT(1), #1 = male, 0 = female
	allergies MEDIUMTEXT,
	existing_medications MEDIUMTEXT,
	phone_number VARCHAR(15),
	address VARCHAR(75),
	primary_provider VARCHAR(75),
	insurance VARCHAR(75),
	documents VARCHAR(150),
	hippa_agreement TINYINT(1) # 1 = true, 0 = false
 );
 
INSERT INTO attributes 
VALUES (
	"Alan",
    1,
    "1927-01-01",
    1,
    "N/A",
    "N/A",
    "123-456-7890",
    "1 Main St",
    "Dr. Doctor",
    "Insurance Co.",
    "N/A",
    1
);

SELECT * FROM attributes;
