package com.example.backend.repository;

import com.example.backend.entity.Payment;
import com.example.backend.entity.RecycleItem;
import com.example.backend.entity.SpecialWaste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository  extends JpaRepository<Payment, Long> {
    Payment findByRecycleItemId(Long recycleItemId);
    Payment findBySpecialWasteId(Long specialWasteId);
}
