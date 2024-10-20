package com.example.backend.factory;

import com.example.backend.entity.Payment;
import com.example.backend.entity.RecycleItem;
import com.example.backend.entity.SpecialWaste;
import com.example.backend.entity.User;

public class PaymentFactory {

    public static Payment createPayment(Payment payment) {
        User user = payment.getUser();
        RecycleItem recycleItem = payment.getRecycleItem();
        SpecialWaste specialWaste = payment.getSpecialWaste();

        if (recycleItem != null) {
            payment.setRecycleItem(recycleItem);
            payment.setType("reward");

            if (recycleItem.getUser() != null) {
                payment.setUser(recycleItem.getUser());
            }

        } else if (specialWaste != null) {
            payment.setSpecialWaste(specialWaste);
            payment.setType("collection");

            if (specialWaste.getUser() != null) {
                payment.setUser(specialWaste.getUser());
            }

        } else if (user != null) {
            payment.setUser(user);
            payment.setType("payment");
            payment.setPaymentType(user.getPaymentType());
        }

        return payment;
    }
}
