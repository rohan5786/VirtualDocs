import java.sql.*;
import java.util.ArrayList;

public class Test {
    final static Database db = new Database();

    public static void main(String[] args) throws SQLException {
        db.config();

        // works
        final ArrayList<Patient> pList = db.findPatientID(2);
        for (Patient p : pList)
            System.out.println(p);

    }
}
