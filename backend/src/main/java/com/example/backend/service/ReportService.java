package com.example.backend.service;

import com.example.backend.entity.Report;
import com.example.backend.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    // Save a new report
    public Report saveReport(Report report) {
        return reportRepository.save(report);
    }

    // Get all reports
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    // Fetch a report by its ID
    public Report getReportById(Long id) {
        return reportRepository.findById(id).orElse(null);
    }

    // Get reports by date
    public List<Report> getReportsByDate(LocalDate date) {
        return reportRepository.findByCollectionDate(date);
    }

    // Get reports by location
    public List<Report> getReportsByLocation(String location) {
        return reportRepository.findByPickupLocation(location);
    }

    // Get high-waste areas (waste amount greater than a threshold)
    public List<Report> getHighWasteAreas(double weightThreshold) {
        return reportRepository.findByWasteWeightGreaterThan(weightThreshold);
    }

    public void deleteReportById(Long id) {
        reportRepository.deleteById(id);
    }
}
