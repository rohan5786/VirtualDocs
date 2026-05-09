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

    // for getting patients by id
    @GetMapping("/patients/{id}")
    public Patient getPatientID(@PathVariable int id) throws SQLException {
        db.config();
        return db.findPatientID(id).isEmpty() ? null : db.findPatientID(id).get(0);
    }

    @GetMapping("/patients/{id}/radiology_logs")
    public RadiologyLog getPatientRadiologyID(@PathVariable int id) throws SQLException {
        db.config();
        return db.findRadiologyID(id).isEmpty() ? null : db.findRadiologyID(id).get(0);
    }

}
