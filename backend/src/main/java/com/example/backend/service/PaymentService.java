package com.example.backend.service;

import com.example.backend.entity.Payment;
import com.example.backend.factory.PaymentFactory;
import com.example.backend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
        // Use PaymentFactory to create the appropriate Payment
        Payment finalizedPayment = PaymentFactory.createPayment(payment);
        return paymentRepository.save(finalizedPayment);
    }

    public void deletePaymentById(Long paymentId) {
        paymentRepository.deleteById(paymentId);  // Call on instance
    }
}
