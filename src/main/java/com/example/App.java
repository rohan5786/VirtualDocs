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
        // db.addPatient(
        //     new Patient(
        //         "first last",
        //         3,
        //         "1992-03-20",
        //         1,
        //         "Pollen",
        //         "N/A",
        //         "123-455-4321",
        //         "50 Semimain Road",
        //         "Dr. Koltur",
        //         "Insurance Inc.",
        //         "N/A",
        //         true,
        //         "bro going back home",
        //         false
        //     )
        // );
        // db.addPatient(
        //     new Patient(
        //         "tuff ster",
        //         4,
        //         "1992-03-21",
        //         1,
        //         "Pollen",
        //         "N/A",
        //         "123-455-4321",
        //         "50 Semimain Road",
        //         "Dr. Koltur",
        //         "Insurance Inc.",
        //         "N/A",
        //         true,
        //         "bro going back home",
        //         true
        //     )
        // );
        // for (int i = 1; i < 5; i++) {
        //     db.addBPLogs(
        //         new BPLog(
        //             3,
        //             i,
        //             "2024-05-14",
        //             "05:" + (11 + i) + ":00",
        //             75 + i,
        //             114,
        //             39,
        //             190,
        //             "bro not going back home",
        //             true
        //         )            
        //     );
        // }

        SpringApplication.run(App.class, args);
    }
}
