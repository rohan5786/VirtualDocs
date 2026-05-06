import java.sql.SQLException;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet; 
import java.util.ArrayList;

public class Database {
    private static Connection database_connection;
    final String url = "jdbc:mysql://localhost:3306/patient_database";
    final String user = Utils.db_user;
    final String pwd = Utils.db_pwd;

    public Database() {
    }

    public void config() throws SQLException {
        database_connection = DriverManager.getConnection(url, user, pwd);
    }

    public boolean patientExists(int ID) throws SQLException {
        return findPatientID(ID).size() > 0;
    }

    // for patient attributes only

    public void addPatient(Patient p) throws SQLException {
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
        final String query = "DELETE FROM attributes WHERE patient_id = ?;";
        PreparedStatement sql = database_connection.prepareStatement(query);
        sql.setInt(1, patient_id);

        sql.executeUpdate();
    }

    // next 2 methods return all patients of this parameter
    public ArrayList<Patient> findPatientID(int ID) throws SQLException {
        // send query
        final String query = "SELECT * FROM attributes WHERE patient_id = ?;";
        PreparedStatement sql = database_connection.prepareStatement(query);
        sql.setInt(1, ID);

        ResultSet rs = sql.executeQuery();
        ArrayList<Patient> list = new ArrayList<>();

        while (rs.next()) {
            list.add(
                new Patient(
                    rs.getString("full_name"),
                    rs.getInt("patient_id"),
                    rs.getString("date_of_birth"),
                    rs.getInt("sex"),
                    rs.getString("allergies"),
                    rs.getString("existing_medications"),
                    rs.getString("phone_number"),
                    rs.getString("address"),
                    rs.getString("primary_provider"),
                    rs.getString("insurance"),
                    rs.getString("documents"),
                    rs.getInt("hipaa_agreement") == 1
                )
            );
        }
        return list;
    }

    public ArrayList<Patient> findPatientName(String name) throws SQLException {
        final String query = "SELECT * FROM attributes WHERE full_name = ?;";
        PreparedStatement sql = database_connection.prepareStatement(query);
        sql.setString(1, name);

        ResultSet rs = sql.executeQuery();
        ArrayList<Patient> list = new ArrayList<>();

        while (rs.next()) {
            list.add(
                new Patient(
                    rs.getString("full_name"),
                    rs.getInt("patient_id"),
                    rs.getString("date_of_birth"),
                    rs.getInt("sex"),
                    rs.getString("allergies"),
                    rs.getString("existing_medications"),
                    rs.getString("phone_number"),
                    rs.getString("address"),
                    rs.getString("primary_provider"),
                    rs.getString("insurance"),
                    rs.getString("documents"),
                    rs.getInt("hipaa_agreement") == 1
                )
            );
        }
        return list;
    }

    // for bp logs only

    public void addBPLogs(BPLog bp) throws SQLException{
        final String query = "INSERT INTO bp_logs VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
        PreparedStatement sql = database_connection.prepareStatement(query);

        sql.setInt(1, bp.patient_id); // indexing starts at 1 for jdbc
        sql.setInt(2, bp.log_id);
        sql.setString(3, bp.appt_date);
        sql.setString(4, bp.time_of_day);
        sql.setInt(5, bp.reading_number);
        sql.setString(6, bp.SBP);
        sql.setString(7, bp.DBP);
        sql.setString(8, bp.pulse);
        sql.setString(9, bp.patient_status);

        sql.executeUpdate();
    }

    public void removeBPLogs(int patient_id) throws SQLException {
        final String query = "DELETE FROM bp_logs WHERE patient_id = ?;";
        PreparedStatement sql = database_connection.prepareStatement(query);
        sql.setInt(1, patient_id);

        sql.executeUpdate();
    }

    public ArrayList<BPLog> findBPID(int ID) throws SQLException {
        final String query = "SELECT * FROM bp_logs WHERE patient_id = ?;";
        PreparedStatement sql = database_connection.prepareStatement(query);
        sql.setInt(1, ID);

        ResultSet rs = sql.executeQuery();
        ArrayList<BPLog> list = new ArrayList<>();

        while (rs.next()) {
            list.add(
                new BPLog(
                    rs.getInt(1),
                    rs.getInt(2),
                    rs.getString(3),
                    rs.getString(4),
                    rs.getInt(5),
                    rs.getString(6),
                    rs.getString(7),
                    rs.getString(8),
                    rs.getString(9)
                )
            );
        }
        return list;
    }

    // for raidology logs only

    public void addRadiologyLog(RadiologyLog rl) throws SQLException {
        final String query = "INSERT INTO radiology_logs VALUES (?, ?, ?, ?, ?, ?, ?);";
        PreparedStatement sql = database_connection.prepareStatement(query);
        
        sql.setInt(1, rl.patient_id);
        sql.setInt(2, rl.log_id);
        sql.setString(3, rl.appt_date);
        sql.setString(4, rl.imaging_type);
        sql.setString(5, rl.body_part);
        sql.setString(6, rl.findings);
        sql.setString(7, rl.patient_status);

        sql.executeUpdate();
    }

    public void removeRadiologyLog(int ID) throws SQLException {
        final String query = "DELETE FROM radiology_logs WHERE patient_id = ?;";
        PreparedStatement sql = database_connection.prepareStatement(query);
        sql.setInt(1, ID);

        sql.executeUpdate();
    }

    public ArrayList<RadiologyLog> findRadiologyID(int ID) throws SQLException {
        final String query = "SELECT * FROM radiology_logs WHERE patient_id = ?;";
        PreparedStatement sql = database_connection.prepareStatement(query);
        sql.setInt(1, ID);

        ResultSet rs = sql.executeQuery();
        ArrayList<RadiologyLog> list = new ArrayList<>();
        while (rs.next()) {
            list.add(
                new RadiologyLog(
                    rs.getInt(1),
                    rs.getInt(2),
                    rs.getString(3),
                    rs.getString(4),
                    rs.getString(5),
                    rs.getString(6),
                    rs.getString(7)
                )
            );
        }
        
        return list;
    }

    // prints all users by some query's rules
    public void onResultQuery(String sqlQuery) throws SQLException {
        PreparedStatement sql = database_connection.prepareStatement(sqlQuery);
        ResultSet rs = sql.executeQuery();
        printPatientSet(rs);
    }

    private void printPatientSet(ResultSet rs) throws SQLException {
        while (rs.next()) {
            System.out.println(
                new Patient(
                    rs.getString("full_name"),
                    rs.getInt("patient_id"),
                    rs.getString("date_of_birth"),
                    rs.getInt("sex"),
                    rs.getString("allergies"),
                    rs.getString("existing_medications"),
                    rs.getString("phone_number"),
                    rs.getString("address"),
                    rs.getString("primary_provider"),
                    rs.getString("insurance"),
                    rs.getString("documents"),
                    rs.getInt("hipaa_agreement") == 1
                )
            );
        }
    }

}
