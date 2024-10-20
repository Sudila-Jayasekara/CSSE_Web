package com.example.backend.factory;

import com.example.backend.entity.Payment;
import com.example.backend.entity.RecycleItem;
import com.example.backend.entity.SpecialWaste;
import com.example.backend.entity.User;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PaymentFactoryTest {

    @Test
    void testCreateRewardPayment() {
        // Arrange
        RecycleItem recycleItem = new RecycleItem();
        recycleItem.setUser(new User());

        Payment payment = new Payment();
        payment.setRecycleItem(recycleItem);

        // Act
        Payment createdPayment = PaymentFactory.createPayment(payment);

        // Assert
        assertEquals("reward", createdPayment.getType());
    }

    @Test
    void testCreateCollectionPayment() {
        // Arrange
        SpecialWaste specialWaste = new SpecialWaste();
        specialWaste.setUser(new User());

        Payment payment = new Payment();
        payment.setSpecialWaste(specialWaste);

        // Act
        Payment createdPayment = PaymentFactory.createPayment(payment);

        // Assert
        assertEquals("collection", createdPayment.getType());
    }

    @Test
    void testCreateUserPayment() {
        // Arrange
        User user = new User();
        user.setPaymentType("flat");

        Payment payment = new Payment();
        payment.setUser(user);

        // Act
        Payment createdPayment = PaymentFactory.createPayment(payment);

        // Assert
        assertEquals("payment", createdPayment.getType());
        assertEquals("flat", createdPayment.getPaymentType());
    }
}
