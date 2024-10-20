package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "garbage_trucks")
public class GarbageTruck  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime notificationTime;

    @Column(nullable = false)
    private boolean isCollected;

    @OneToMany(mappedBy = "garbageTruck")
    private List<GarbageBin> garbageBins; // List of associated GarbageBins

}
