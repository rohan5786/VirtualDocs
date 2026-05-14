package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.sql.SQLException;

@SpringBootApplication
public class App {
    // just starting the server
    public static void main(String[] args) throws SQLException {
        Database db = new Database();
        db.config();
        // db.removeBPLogs(2);
        db.addBPLogs(
            new BPLog(
                2,
                1,
                "2024-05-13",
                "05:11:00",
                76,
                "114/39",
                "139/41",
                "190 BPM",
                "bro not going back home"
            )            
        );

        SpringApplication.run(App.class, args);
    }
}
