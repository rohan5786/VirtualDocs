import java.io.File;

public class ParseUtil {
    /* 
    as peddie cs server runs the mysql database locally, this will become: 
    String url = "jdbc:mysql://PEDDIE_CS_SERVER_IP:3306/patient_database";

    for now, everybody just runs the instance locally by:
    -Rohan saves .sql file to github repo
    -everybody (alan + diya) who clones repo just runs script in MySQL Workbench on their own now
    -now everybody has a locally running instance

    haven't exported since haven't added proper table/data management system yet
    */
    String url = "jdbc:mysql://localhost:3306/patient_database";
    String user = "alan";
    String pwd = "alanStinks123!";

    public static int patientBP(File rawText) {
        return 0;
    }

    // assign some attribute value to pulse/DBP/SBP
    public static int patientReadingsBP(File rawText, int day, int attribute) {
        return 0;
    }

    // Activity notes
    public static File patientNotesBP(File rawText) {
        return new File("googoogaagaa");
    }

    // kidney notes
    public static File kidneysRadiology(File rawText) {
        return new File("googoogaagaa");
    }

    // bladder notes
    public static File bladderRadiology(File rawText) {
        return new File("googoogaagaa");
    }

    // uterus notes
    public static File uterusRadiology(File rawText) {
        return new File("googoogaagaa");
    }

    // general notes
    public static File patientNotesRadiology(File rawText) {
        return new File("googoogaagaa");
    }

}