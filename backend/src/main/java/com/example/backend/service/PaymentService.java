package com.example.backend.service;

import com.example.backend.entity.Payment;
import com.example.backend.entity.RecycleItem;
import com.example.backend.entity.SpecialWaste;
import com.example.backend.entity.User;
import com.example.backend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();  // Call on instance, not statically
    }

    public Payment getPaymentById(Long paymentId) {
        return paymentRepository.findById(paymentId).orElse(null);  // Call on instance
    }

    public Payment getPaymentsByRecycleItemId(Long recycleItemId) {
        return paymentRepository.findByRecycleItemId(recycleItemId);
    }

    public Payment getPaymentsBySpecialWasteId(Long specialWasteId) {
        return paymentRepository.findBySpecialWasteId(specialWasteId);
    }

    public Payment savePayment(Payment payment) {
        User user = payment.getUser();
        RecycleItem recycleItem = payment.getRecycleItem();
        SpecialWaste specialWaste = payment.getSpecialWaste();

        if(recycleItem != null) {

            payment.setRecycleItem(recycleItem);
            payment.setType("reward");

            if(recycleItem.getUser() != null) {
                payment.setUser(recycleItem.getUser());
            }

        }else if(specialWaste != null) {

            payment.setSpecialWaste(specialWaste);
            payment.setType("collection");

            if(specialWaste.getUser() != null) {
                payment.setUser(specialWaste.getUser());
            }
        }else if (user != null) {
            payment.setUser(user);
            payment.setType("payment");
            payment.setPaymentType(user.getPaymentType());
        }

        return paymentRepository.save(payment);  // Call on instance
    }

    public void deletePaymentById(Long paymentId) {
        paymentRepository.deleteById(paymentId);  // Call on instance
    }
}
