package com.example.backend.controller;

import com.example.backend.entity.Report;
import com.example.backend.service.ReportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {


    private static final Logger logger = LoggerFactory.getLogger(ReportController.class);

    @Autowired
    private ReportService reportService;

    // Endpoint to create a new report
    @PostMapping
    public Report createReport(@RequestBody Report report) {
        logger.info("Received report for creation: {}", report);
        Report savedReport = reportService.saveReport(report);
        logger.info("Created report: {}", savedReport);
        return savedReport;
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
    // Endpoint to update a report
    @PutMapping("/{id}")
    public Report updateReport(@PathVariable Long id, @RequestBody Report report) {
        report.setId(id); // Set the ID of the report to be updated
        Report updatedReport = reportService.saveReport(report); // This will save the updated report
        logger.info("Updated report with ID {}: {}", id, updatedReport);
        return updatedReport;
    }

    // Endpoint to delete a report
    @DeleteMapping("/{id}")
    public void deleteReport(@PathVariable Long id) {
        reportService.deleteReportById(id);
        logger.info("Deleted report with ID {}", id);
    }

    @PostMapping("/analyze")
    public String analyzeReports(@RequestBody List<Report> reports) {
        return reportService.analyzeReportsWithAI(reports);
    }
}
