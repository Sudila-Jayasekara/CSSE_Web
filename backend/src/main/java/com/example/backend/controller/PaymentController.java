package com.example.backend.controller;

import com.example.backend.entity.Payment;
import com.example.backend.entity.RecycleItem;
import com.example.backend.entity.SpecialWaste;
import com.example.backend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id);
    }

    @GetMapping("/recycle-item/{recycleItemId}")
    public ResponseEntity<Payment> getPaymentsByRecycleItemId(@PathVariable Long recycleItemId) {
        Payment payments = paymentService.getPaymentsByRecycleItemId(recycleItemId);
        return ResponseEntity.ok(payments); // Return the payments as a response
    }

    @GetMapping("/special-waste/{specialWasteId}")
    public ResponseEntity<Payment> getPaymentsBySpecialWasteId(@PathVariable Long specialWasteId) {
        Payment payments = paymentService.getPaymentsBySpecialWasteId(specialWasteId);
        return ResponseEntity.ok(payments); // Return the payments as a response
    }

    @PostMapping
    public Payment savePayment(@RequestBody Payment payment) {
        return paymentService.savePayment(payment);
    }

    @DeleteMapping("/{id}")
    public void deletePaymentById(@PathVariable Long id) {
        paymentService.deletePaymentById(id);
    }

}
