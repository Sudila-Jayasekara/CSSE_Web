package com.example.backend.factory;

import com.example.backend.entity.Payment;
import com.example.backend.entity.RecycleItem;
import com.example.backend.entity.SpecialWaste;
import com.example.backend.entity.User;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PaymentFactoryTest {

    @Test
    void testCreatePayment_WithRecycleItem() {
        // Arrange
        User user = new User();
        user.setId(1L);
        RecycleItem recycleItem = new RecycleItem();
        recycleItem.setUser(user);
        Payment payment = new Payment();
        payment.setRecycleItem(recycleItem);

        // Act
        Payment result = PaymentFactory.createPayment(payment);

        // Assert
        assertNotNull(result);
        assertEquals("reward", result.getType());
        assertEquals(user, result.getUser());
        assertEquals(recycleItem, result.getRecycleItem());
        assertNull(result.getSpecialWaste());
    }

    @Test
    void testCreatePayment_WithSpecialWaste() {
        // Arrange
        User user = new User();
        user.setId(1L);
        SpecialWaste specialWaste = new SpecialWaste();
        specialWaste.setUser(user);
        Payment payment = new Payment();
        payment.setSpecialWaste(specialWaste);

        // Act
        Payment result = PaymentFactory.createPayment(payment);

        // Assert
        assertNotNull(result);
        assertEquals("collection", result.getType());
        assertEquals(user, result.getUser());
        assertEquals(specialWaste, result.getSpecialWaste());
        assertNull(result.getRecycleItem());
    }

    @Test
    void testCreatePayment_WithUser() {
        // Arrange
        User user = new User();
        user.setId(1L);
        user.setPaymentType("credit_card");
        Payment payment = new Payment();
        payment.setUser(user);

        // Act
        Payment result = PaymentFactory.createPayment(payment);

        // Assert
        assertNotNull(result);
        assertEquals("payment", result.getType());
        assertEquals(user, result.getUser());
        assertEquals("credit_card", result.getPaymentType());
        assertNull(result.getRecycleItem());
        assertNull(result.getSpecialWaste());
    }

    @Test
    void testCreatePayment_WithNulls() {
        // Arrange
        Payment payment = new Payment();

        // Act
        Payment result = PaymentFactory.createPayment(payment);

        // Assert
        assertNotNull(result);
        assertNull(result.getType());
        assertNull(result.getUser());
        assertNull(result.getRecycleItem());
        assertNull(result.getSpecialWaste());
    }
}
