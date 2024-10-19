package com.example.backend.controller;

import com.example.backend.entity.Report;
import com.example.backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    // Endpoint to create a new report
    @PostMapping
    public Report createReport(@RequestBody Report report) {
        // Logging the received report to the console
        System.out.println("Received report: " + report);
        return reportService.saveReport(report);
    }

    // Endpoint to get all reports
    @GetMapping
    public List<Report> getAllReports() {
        return reportService.getAllReports();
    }
    // Endpoint to get a report by ID
    @GetMapping("/{id}")
    public Report getReportById(@PathVariable Long id) {
        return reportService.getReportById(id);
    }

    // Endpoint to get reports by date
    @GetMapping("/by-date")
    public List<Report> getReportsByDate(@RequestParam("date") String date) {
        LocalDate collectionDate = LocalDate.parse(date);
        return reportService.getReportsByDate(collectionDate);
    }

    // Endpoint to get reports by location
    @GetMapping("/by-location")
    public List<Report> getReportsByLocation(@RequestParam("location") String location) {
        return reportService.getReportsByLocation(location);
    }

    // Endpoint to get high-waste areas based on a weight threshold
    @GetMapping("/high-waste-areas")
    public List<Report> getHighWasteAreas(@RequestParam("threshold") double threshold) {
        return reportService.getHighWasteAreas(threshold);
    }
    @PutMapping("/{id}")
    public Report updateReport(@PathVariable Long id, @RequestBody Report report) {
        report.setId(id); // Set the ID of the report to be updated
        return reportService.saveReport(report); // This will save the updated report
    }

    @DeleteMapping("/{id}")
    public void deleteReport(@PathVariable Long id) {
        reportService.deleteReportById(id);
    }
}
