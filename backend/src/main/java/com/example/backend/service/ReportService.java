package com.example.backend.service;

import com.example.backend.entity.Report;
import com.example.backend.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReportService {

    private static final String GEMINI_AI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCg6EbRVZf4rwCqzaTfSa-gZ4vz1NS35HU";


    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private RestTemplate restTemplate;

    // Save a new report
    public Report saveReport(Report report) {
        return reportRepository.save(report);
    }

    // Get all reports
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    // Send report data to Gemini AI for analysis
    public String analyzeReportsWithAI(List<Report> reports) {
        try {
            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Create request body
            HttpEntity<List<Report>> request = new HttpEntity<>(reports, headers);

            // Send POST request to Gemini AI API
            ResponseEntity<String> response = restTemplate.postForEntity(GEMINI_AI_API_URL, request, String.class);

            // Check if the response was successful
            if (response.getStatusCode().is2xxSuccessful()) {
                return response.getBody();
            } else {
                System.err.println("Failed with status code: " + response.getStatusCode());
                System.err.println("Response body: " + response.getBody());
                return "Error occurred while analyzing data.";
            }
        } catch (Exception e) {
            // Log detailed error
            System.err.println("Error occurred: " + e.getMessage());
            e.printStackTrace();
            return "Error occurred while analyzing data.";
        }
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
