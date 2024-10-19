package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "reports")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate collectionDate; // Date of Collection

    private String pickupLocation; // Pickup Location

    private String wasteType; // Waste Type

    private double wasteWeight; // Waste Quantity (Weight)

    private String routeID; // Assigned Collection Route

    private String processingType; // Processing Type
}
