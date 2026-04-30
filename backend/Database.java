import java.sql.*;

import com.mysql.cj.x.protobuf.MysqlxPrepare.Prepare;

public class Database {
    private static Connection database_connection;
    final String url = "jdbc:mysql://localhost:3306/patient_database";
    final String user = Utils.db_user;
    final String pwd = Utils.db_pwd;

    public Database() {}

    public void config() throws SQLException {
        database_connection = DriverManager.getConnection(url, user, pwd);
    }

    public void addPatient(Patient p) throws SQLException {
        // create query
        final String query = "INSERT INTO attributes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        PreparedStatement sql = database_connection.prepareStatement(query);

        sql.setString(1, p.full_name); // indexing starts at 1 for jdbc
        sql.setInt(2, p.patient_id);
        sql.setString(3, p.date_of_birth);
        sql.setInt(4, p.sex);
        sql.setString(5, p.allergies);
        sql.setString(6, p.existing_medications);
        sql.setString(7, p.phone_number);
        sql.setString(8, p.address);
        sql.setString(9, p.primary_provider);
        sql.setString(10, p.insurance);
        sql.setString(11, p.documents);
        sql.setInt(12, p.hipaa_agreement ? 1 : 0);

        sql.executeUpdate();
    }

    public void removePatient(int patient_id) throws SQLException {
        final String query = "DELETE FROM attributes WHERE patient_id = ?";
        PreparedStatement sql = database_connection.prepareStatement(query);
        sql.setInt(1, patient_id);

        sql.executeUpdate();
    }

    public Patient findPatientID(int ID) {
        // send query
        return new Patient();
    }

    public Patient findPatientName(String name) {
        // send query
        return new Patient();
    }

    public boolean patientExists(int ID) {
        return true;
    }

    // prints all users by some query's rules
    public void onQuery(String sqlQuery) throws SQLException {
        PreparedStatement sql = database_connection.prepareStatement(sqlQuery);

        ResultSet res = sql.executeQuery();

        while (res.next()) {
            final String fn = res.getString("full_name");
            final int id = res.getInt("patient_id");
            final String dob = res.getString("date_of_birth");
            final String sex = res.getInt("sex") == 1 ? "Male" : "Female";

            System.out.println(fn + " | " + id + " | " + dob + " | " + sex);
        }
    }
}
