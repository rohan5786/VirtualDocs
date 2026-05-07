package com.example;

import org.springframework.web.bind.annotation.*;
import java.sql.*;

@RestController
@RequestMapping("/api")
public class APIController {
    private final static Database db = new Database();

    // for getting patients by id
    @GetMapping("/patients/{id}")
    public String getPatientID(@PathVariable int ID) throws SQLException {
        db.config();
        return db.findPatientID(ID).get(0).toString();
    }

    @GetMapping("/googoogaagaa")
    public String googoogaagaa() {
        return "Googoogaagaa";
    }

}
