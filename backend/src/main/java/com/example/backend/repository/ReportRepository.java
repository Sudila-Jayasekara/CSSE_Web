package com.example.backend.repository;

import com.example.backend.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    // Fetch reports by specific date
    List<Report> findByCollectionDate(LocalDate collectionDate);

    // Fetch reports by pickup location
    List<Report> findByPickupLocation(String pickupLocation);

    // Fetch reports by waste type
    List<Report> findByWasteType(String wasteType);

    // Fetch high-waste areas (example for later use)
    List<Report> findByWasteWeightGreaterThan(double weight);
}
