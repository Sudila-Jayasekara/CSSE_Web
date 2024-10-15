package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; //this get automatically  from user's preferred type
    private Double amount;
    private LocalDateTime dateTime;

    //reference to user
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
