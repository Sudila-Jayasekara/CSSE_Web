package com.example.backend.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private String phone;
    private String paymentType; //preferred payment type

    //special waste list
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<SpecialWaste> specialWastes;

    //recycle item list
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<RecycleItem> recycleItems;

    //payment
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Payment> payments;

}
