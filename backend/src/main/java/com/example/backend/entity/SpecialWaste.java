package com.example.backend.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "special_wastes")
public class SpecialWaste {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String wasteType;
    private String description;
    private Double wasteQuantity;
    private LocalDateTime dateTime;
    private Double earn;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
