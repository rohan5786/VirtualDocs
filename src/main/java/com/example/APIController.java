package com.example;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.nio.file.Files;
import java.nio.file.Paths;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class APIController {
    private final static Database db = new Database();

    @GetMapping("/patients")
    public List<Patient> getPatients() throws Exception {
        db.config();
        return db.allPatients();
    }

    @GetMapping("/patients/{id}")
    public Patient getPatientID(@PathVariable int id) throws Exception {
        db.config();
        List<Patient> results = db.findPatientID(id);
        return results.isEmpty() ? null : results.get(0);
    }

    @GetMapping("/patients/{id}/radiology_logs")
    public List<RadiologyLog> getPatientRadiologyID(@PathVariable int id) throws Exception {
        db.config();
        return db.findRadiologyID(id);
    }

    @GetMapping("/patients/{id}/bp_logs")
    public List<BPLog> getPatientBPID(@PathVariable int id) throws Exception {
        db.config();
        return db.findBPID(id);
    }

    @GetMapping("/patients/{id}/{isArchived}")
    public void archivePatientID(@PathVariable int id, @PathVariable int isArchived) throws Exception {
        db.config();
        final boolean archived = isArchived == 1;
        db.setArchivedPatient(id, archived);
        db.setArchivedBPLogs(id, archived);
        db.setArchivedRadiologyLogs(id, archived);
    }

    @PostMapping("/patients/{id}/documents")
    public ResponseEntity<String> uploadDocument(@PathVariable int id, @RequestParam("file") MultipartFile file)
            throws Exception {

        String uploadDir = System.getProperty("user.dir") + "/uploads/" + id + "/";
        Files.createDirectories(Paths.get(uploadDir));

        String filename = file.getOriginalFilename();
        String filepath = uploadDir + filename;
        file.transferTo(Paths.get(filepath));

        db.config();
        db.appendDocument(id, filepath);

        return ResponseEntity.ok("Uploaded: " + filename);
    }

    @GetMapping("/patients/{id}/documents/{filename}")
    public ResponseEntity<byte[]> getDocument(
            @PathVariable int id,
            @PathVariable String filename) throws Exception {

        String filepath = System.getProperty("user.dir") + "/uploads/" + id + "/" + filename;
        byte[] fileBytes = Files.readAllBytes(Paths.get(filepath));

        return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "inline; filename=\"" + filename + "\"")
                .body(fileBytes);
    }
}