package com.example;

import org.springframework.web.bind.annotation.*;
import java.sql.*;
import java.util.List;

// basically saying it's ok for frontend to run on 5173 while backend runs on 8080
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class APIController {
    private final static Database db = new Database();

    @GetMapping("/patients")
    public List<Patient> getPatients() throws SQLException {
        db.config();
        return db.allPatients();
    }

    /**
     * returns a patient by their id
     * 
     * @param id the id of the patient to be retrieved
     * @return
     * @throws SQLException returns stack trace to debug w/JDBC driver or database error
     */
    @GetMapping("/patients/{id}")
    public Patient getPatientID(@PathVariable int id) throws SQLException {
        db.config();
        return db.findPatientID(id).isEmpty() ? null : db.findPatientID(id).get(0);
    }

    /**
     * returns all of the radiology logs belonging to a patient
     * 
     * @param id the id of the patient whose radiology logs are to be retrieved
     * @return
     * @throws SQLException returns stack trace to debug w/JDBC driver or database error
     */
    @GetMapping("/patients/{id}/radiology_logs")
    public List<RadiologyLog> getPatientRadiologyID(@PathVariable int id) throws SQLException {
        db.config();
        return db.findRadiologyID(id);
    }

    @GetMapping("/patients/{id}/bp_logs")
    public List<BPLog> getPatinetBPID(@PathVariable int id) throws SQLException {
        db.config();
        return db.findBPID(id);
    }

    /**
     * sets the archive status of a patient & their respective logs (to be un-modifiable)
     * 
     * @param id the id of the patient whose archive status is to be set
     * @param isArchived the archive status you want to set
     * @throws SQLException returns stack trace to debug w/JDBC driver or database error
     */
    @GetMapping("/patients/{id}/{isArchived}")
    public void archivePatientID(@PathVariable int id, @PathVariable int isArchived) throws SQLException {
        db.config();
        final boolean archived = isArchived == 1;
        db.setArchivedPatient(id, archived);
        db.setArchivedBPLogs(id, archived);
        db.setArchivedRadiologyLogs(id, archived);
    }

}
