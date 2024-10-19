package com.example.backend.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "garbage_bins")
public class GarbageBin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String garbageType;
    private Integer garbageLevel; //% 60kg , 60%
    private String address;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
