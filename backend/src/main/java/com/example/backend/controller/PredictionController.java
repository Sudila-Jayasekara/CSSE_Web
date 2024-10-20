package com.example.backend.controller;

import com.example.backend.entity.Report;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/predictions")
public class PredictionController {

    @PostMapping("/getFutureWastePrediction")
    public ResponseEntity<?> getFuturePrediction(@RequestBody List<Report> reportList) {
        try {
            // 1. Preprocess data for AI API
            String apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCg6EbRVZf4rwCqzaTfSa-gZ4vz1NS35HU";

            // Initialize the contents list
            List<Map<String, Object>> contents = new ArrayList<>();

            // Populate the contents list with the reports
            for (Report report : reportList) {
                Map<String, Object> part = new HashMap<>();
                part.put("text", "Predict future waste based on the following data: " +
                        "Pickup Location: " + report.getPickupLocation() + ", " +
                        "Waste Type: " + report.getWasteType() + ", " +
                        "Waste Weight: " + report.getWasteWeight() + "kg.");

                // Wrap it in the expected structure
                contents.add(Map.of("parts", List.of(part)));
            }

            // Create the request body including the "role" field
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("role", "user");  // Adding the role field
            requestBody.put("contents", contents);

            // 2. Set headers
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

            // Make the API call
            ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, request, String.class);

            // 3. Handle and process the response
            if (response.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.ok(response.getBody());
            } else {
                return ResponseEntity.status(response.getStatusCode()).body("Error calling Gemini AI API: " + response.getBody());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Server error: " + e.getMessage());
        }
    }
}
