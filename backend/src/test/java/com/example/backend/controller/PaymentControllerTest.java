package com.example.backend.controller;

import com.example.backend.entity.Payment;
import com.example.backend.service.PaymentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class PaymentControllerTest {

    @InjectMocks
    private PaymentController paymentController;

    @Mock
    private PaymentService paymentService;

    private Payment payment;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        payment = new Payment();
        payment.setId(1L);
        // Set other fields of payment as needed
    }

    @Test
    void testGetAllPayments() {
        List<Payment> payments = new ArrayList<>();
        payments.add(payment);

        when(paymentService.getAllPayments()).thenReturn(payments);

        List<Payment> result = paymentController.getAllPayments();
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(paymentService, times(1)).getAllPayments();
    }

    @Test
    void testGetPaymentById() {
        when(paymentService.getPaymentById(1L)).thenReturn(payment);

        Payment result = paymentController.getPaymentById(1L);
        assertNotNull(result);
        assertEquals(payment.getId(), result.getId());
        verify(paymentService, times(1)).getPaymentById(1L);
    }

    @Test
    void testGetPaymentsByRecycleItemId() {
        when(paymentService.getPaymentsByRecycleItemId(1L)).thenReturn(payment);

        ResponseEntity<Payment> response = paymentController.getPaymentsByRecycleItemId(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(payment.getId(), response.getBody().getId());
        verify(paymentService, times(1)).getPaymentsByRecycleItemId(1L);
    }

    @Test
    void testGetPaymentsBySpecialWasteId() {
        when(paymentService.getPaymentsBySpecialWasteId(1L)).thenReturn(payment);

        ResponseEntity<Payment> response = paymentController.getPaymentsBySpecialWasteId(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(payment.getId(), response.getBody().getId());
        verify(paymentService, times(1)).getPaymentsBySpecialWasteId(1L);
    }

    @Test
    void testSavePayment() {
        when(paymentService.savePayment(any(Payment.class))).thenReturn(payment);

        Payment result = paymentController.savePayment(payment);
        assertNotNull(result);
        assertEquals(payment.getId(), result.getId());
        verify(paymentService, times(1)).savePayment(any(Payment.class));
    }

    @Test
    void testDeletePaymentById() {
        doNothing().when(paymentService).deletePaymentById(1L);

        paymentController.deletePaymentById(1L);
        verify(paymentService, times(1)).deletePaymentById(1L);
    }
}
