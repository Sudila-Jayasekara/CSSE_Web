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

    private LocalDateTime nextPaymentDate; // Only used for Flat payment type
    //generate automatically
    @Column(nullable = false)
    private String type;

    //generate automatically
    @Column(nullable = true)
    private String paymentType; // generate automatically  from user's preferred type (flat based/ weight based)

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private LocalDateTime dateTime;

    //reference to user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToOne
    @JoinColumn(name = "recycle_item_id" )
    private RecycleItem recycleItem;

    @OneToOne
    @JoinColumn(name = "special_waste_id")
    private SpecialWaste specialWaste;


}
