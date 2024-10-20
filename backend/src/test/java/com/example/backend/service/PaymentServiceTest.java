package com.example.backend.service;

import com.example.backend.entity.Payment;
import com.example.backend.factory.PaymentFactory;
import com.example.backend.repository.PaymentRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class PaymentServiceTest {

    @Mock
    private PaymentRepository paymentRepository;

    @InjectMocks
    private PaymentService paymentService;

    // Initialize mocks
    public PaymentServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllPayments() {
        // Arrange
        Payment payment1 = new Payment();
        Payment payment2 = new Payment();
        when(paymentRepository.findAll()).thenReturn(Arrays.asList(payment1, payment2));

        // Act
        List<Payment> payments = paymentService.getAllPayments();

        // Assert
        assertEquals(2, payments.size());
        verify(paymentRepository, times(1)).findAll();
    }

    @Test
    void testGetPaymentById_Found() {
        // Arrange
        Long paymentId = 1L;
        Payment payment = new Payment();
        when(paymentRepository.findById(paymentId)).thenReturn(Optional.of(payment));

        // Act
        Payment result = paymentService.getPaymentById(paymentId);

        // Assert
        assertNotNull(result);
        verify(paymentRepository, times(1)).findById(paymentId);
    }

    @Test
    void testGetPaymentById_NotFound() {
        // Arrange
        Long paymentId = 1L;
        when(paymentRepository.findById(paymentId)).thenReturn(Optional.empty());

        // Act
        Payment result = paymentService.getPaymentById(paymentId);

        // Assert
        assertNull(result);
        verify(paymentRepository, times(1)).findById(paymentId);
    }

    @Test
    void testGetPaymentsByRecycleItemId() {
        // Arrange
        Long recycleItemId = 1L;
        Payment payment = new Payment();
        when(paymentRepository.findByRecycleItemId(recycleItemId)).thenReturn(payment);

        // Act
        Payment result = paymentService.getPaymentsByRecycleItemId(recycleItemId);

        // Assert
        assertNotNull(result);
        verify(paymentRepository, times(1)).findByRecycleItemId(recycleItemId);
    }

    @Test
    void testGetPaymentsBySpecialWasteId() {
        // Arrange
        Long specialWasteId = 1L;
        Payment payment = new Payment();
        when(paymentRepository.findBySpecialWasteId(specialWasteId)).thenReturn(payment);

        // Act
        Payment result = paymentService.getPaymentsBySpecialWasteId(specialWasteId);

        // Assert
        assertNotNull(result);
        verify(paymentRepository, times(1)).findBySpecialWasteId(specialWasteId);
    }

    @Test
    void testSavePayment() {
        // Arrange
        Payment payment = new Payment();
        Payment savedPayment = new Payment();
        when(paymentRepository.save(any(Payment.class))).thenReturn(savedPayment);

        // Act
        Payment result = paymentService.savePayment(payment);

        // Assert
        assertNotNull(result);
        verify(paymentRepository, times(1)).save(any(Payment.class));
    }

    @Test
    void testDeletePaymentById() {
        // Arrange
        Long paymentId = 1L;

        // Act
        paymentService.deletePaymentById(paymentId);

        // Assert
        verify(paymentRepository, times(1)).deleteById(paymentId);
    }
}
