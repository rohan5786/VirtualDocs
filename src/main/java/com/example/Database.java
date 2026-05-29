package com.example;

import java.sql.SQLException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;
import java.util.LinkedList;

public class Database {
    private static Connection db_connection;
    final String url = "jdbc:mysql://localhost:3306/patient_database";
    final String user = Utils.db_user;
    final String pwd = Utils.db_pwd;

    public Database() {
    }

    public void config() throws SQLException {
        db_connection = DriverManager.getConnection(url, user, pwd);
    }

    public boolean patientExists(int ID) throws SQLException {
        return findPatientID(ID).size() > 0;
    }

    public void addPatient(Patient p) throws SQLException {
        final String query = "INSERT IGNORE INTO attributes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        PreparedStatement sql = db_connection.prepareStatement(query);

        sql.setString(1, p.full_name);
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
        sql.setString(13, p.doctor_notes);
        sql.setInt(14, p.archived ? 1 : 0);

        sql.executeUpdate();
        sql.close();
    }

    public void setArchivedPatient(int patient_id, boolean archived) throws SQLException {
        final String query = "UPDATE attributes SET archived = ? WHERE patient_id = ?;";
        PreparedStatement sql = db_connection.prepareStatement(query);

        sql.setInt(1, archived ? 1 : 0);
        sql.setInt(2, patient_id);

        sql.executeUpdate();
        sql.close();
    }

    public List<Patient> findPatientID(int ID) throws SQLException {
        final String query = "SELECT * FROM attributes WHERE patient_id = ?;";
        PreparedStatement sql = db_connection.prepareStatement(query);
        sql.setInt(1, ID);

        ResultSet rs = sql.executeQuery();
        List<Patient> list = new LinkedList<>();

        while (rs.next()) {
            list.add(new Patient(
                rs.getString(1),
                rs.getInt(2),
                rs.getString(3),
                rs.getInt(4),
                rs.getString(5),
                rs.getString(6),
                rs.getString(7),
                rs.getString(8),
                rs.getString(9),
                rs.getString(10),
                rs.getString(11),
                rs.getInt(12) == 1,
                rs.getString(13),
                rs.getInt(14) == 1
            ));
        }

        rs.close();
        sql.close();
        return list;
    }

    public void addBPLogs(BPLog bp) throws SQLException {
        final String query = "INSERT IGNORE INTO bp_logs VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        PreparedStatement sql = db_connection.prepareStatement(query);

        sql.setInt(1, bp.patient_id);
        sql.setInt(2, bp.log_id);
        sql.setString(3, bp.appt_date);
        sql.setString(4, bp.time_of_day);
        sql.setInt(5, bp.reading_number);
        sql.setInt(6, bp.SBP);
        sql.setInt(7, bp.DBP);
        sql.setInt(8, bp.pulse);
        sql.setString(9, bp.patient_status);
        sql.setInt(10, bp.archived ? 1 : 0);

        sql.executeUpdate();
        sql.close();
    }

    public void setArchivedBPLogs(int log_id, boolean archived) throws SQLException {
        final String query = "UPDATE bp_logs SET archived = ? WHERE log_id = ?;";
        PreparedStatement sql = db_connection.prepareStatement(query);

        sql.setInt(1, archived ? 1 : 0);
        sql.setInt(2, log_id);

        sql.executeUpdate();
        sql.close();
    }

    public List<BPLog> findBPID(int ID) throws SQLException {
        final String query = "SELECT * FROM bp_logs WHERE patient_id = ?;";
        PreparedStatement sql = db_connection.prepareStatement(query);
        sql.setInt(1, ID);

        ResultSet rs = sql.executeQuery();
        List<BPLog> list = new LinkedList<>();

        while (rs.next()) {
            list.add(new BPLog(
                rs.getInt(1),
                rs.getInt(2),
                rs.getString(3),
                rs.getString(4),
                rs.getInt(5),
                rs.getInt(6),
                rs.getInt(7),
                rs.getInt(8),
                rs.getString(9),
                rs.getInt(10) == 1
            ));
        }

        rs.close();
        sql.close();
        return list;
    }

    public void addRadiologyLog(RadiologyLog rl) throws SQLException {
        PreparedStatement testArchived = db_connection.prepareStatement(
            "SELECT archived FROM attributes WHERE patient_id = ?;");
        testArchived.setInt(1, rl.patient_id);
        ResultSet rs = testArchived.executeQuery();
        while (rs.next())
            if (rs.getInt(1) == 1) return;

        final String query = "INSERT IGNORE INTO radiology_logs VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
        PreparedStatement sql = db_connection.prepareStatement(query);

        sql.setInt(1, rl.patient_id);
        sql.setInt(2, rl.log_id);
        sql.setString(3, rl.appt_date);
        sql.setString(4, rl.imaging_type);
        sql.setString(5, rl.body_part);
        sql.setString(6, rl.findings);
        sql.setString(7, rl.patient_status);
        sql.setInt(8, rl.archived ? 1 : 0);

        sql.executeUpdate();
        sql.close();
    }

    public void setArchivedRadiologyLogs(int log_id, boolean archived) throws SQLException {
        final String query = "UPDATE radiology_logs SET archived = ? WHERE log_id = ?;";
        PreparedStatement sql = db_connection.prepareStatement(query);

        sql.setInt(1, archived ? 1 : 0);
        sql.setInt(2, log_id);

        sql.executeUpdate();
        sql.close();
    }

    public List<RadiologyLog> findRadiologyID(int ID) throws SQLException {
        final String query = "SELECT * FROM radiology_logs WHERE patient_id = ?;";
        PreparedStatement sql = db_connection.prepareStatement(query);
        sql.setInt(1, ID);

        ResultSet rs = sql.executeQuery();
        List<RadiologyLog> list = new LinkedList<>();

        while (rs.next()) {
            list.add(new RadiologyLog(
                rs.getInt(1),
                rs.getInt(2),
                rs.getString(3),
                rs.getString(4),
                rs.getString(5),
                rs.getString(6),
                rs.getString(7),
                rs.getInt(8) == 1
            ));
        }

        rs.close();
        sql.close();
        return list;
    }

    public void appendDocument(int patientId, String filepath) throws SQLException {
        final String getQuery = "SELECT documents FROM attributes WHERE patient_id = ?";
        PreparedStatement getStmt = db_connection.prepareStatement(getQuery);
        getStmt.setInt(1, patientId);
        ResultSet rs = getStmt.executeQuery();

        String current = "";
        if (rs.next()) current = rs.getString(1);
        rs.close();
        getStmt.close();

        String updated = (current == null || current.isEmpty())
            ? filepath
            : current + "," + filepath;

        final String updateQuery = "UPDATE attributes SET documents = ? WHERE patient_id = ?";
        PreparedStatement updateStmt = db_connection.prepareStatement(updateQuery);
        updateStmt.setString(1, updated);
        updateStmt.setInt(2, patientId);
        updateStmt.executeUpdate();
        updateStmt.close();
    }
    
    public List<Patient> allPatients() throws SQLException {
        final String query = "SELECT * FROM attributes";
        PreparedStatement sql = db_connection.prepareStatement(query);
        ResultSet rs = sql.executeQuery();

        List<Patient> list = new LinkedList<>();
        while (rs.next()) {
            list.add(new Patient(
                rs.getString(1),
                rs.getInt(2),
                rs.getString(3),
                rs.getInt(4),
                rs.getString(5),
                rs.getString(6),
                rs.getString(7),
                rs.getString(8),
                rs.getString(9),
                rs.getString(10),
                rs.getString(11),
                rs.getInt(12) == 1,
                rs.getString(13),
                rs.getInt(14) == 1
            ));
        }

        rs.close();
        sql.close();
        return list;
    }
}