import java.sql.*;

public class Test {
    final static Database db = new Database();

    public static void main(String[] args) throws SQLException {
        db.config();

        // test adding a row & printing all of em ---> WORKS!
         Patient testPatient = new Patient("rohanita", 2, "2001-12-23", 0, "Pollen",
         "Zyrtec daily", "987-564-3210",
         "100 Nonmain Ave", "Dr. Rachit", "Rachit Co.", "N/A", false);
         db.addPatient(testPatient);

        // test removing that very patient ---> WORKS!
        // db.removePatient(2);

        db.onQuery("SELECT * FROM attributes"); // print out evb
    }
}
