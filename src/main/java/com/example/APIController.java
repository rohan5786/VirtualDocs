package com.example;

import org.springframework.web.bind.annotation.*;
import java.sql.*;

// basically saying it's ok for frontend to run on 5173 while backend runs on 8080
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class APIController {
    private final static Database db = new Database();

    // for getting patients by id
    @GetMapping("/patients/{id}")
    public String getPatientID(@PathVariable int id) throws SQLException {
        db.config();
        return db.findPatientID(id).isEmpty() ? "No such patient" : db.findPatientID(id).get(0).toString();
    }

    @GetMapping("/patients/{id}/radiology_logs")
    public String getPatientRadiologyID(@PathVariable int id) throws SQLException {
        db.config();
        return db.findRadiologyID(id).isEmpty() ? "No logs" : db.findRadiologyID(id).get(0).toString();
    }

}
