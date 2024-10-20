import com.example.backend.controller.PaymentController;
import com.example.backend.entity.Payment;
import com.example.backend.service.PaymentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
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
        payment.setAmount(500.0);
        payment.setType("Flat");
    }

    @Test
    void testGetAllPayments() {
        when(paymentService.getAllPayments()).thenReturn(List.of(payment));

        List<Payment> result = paymentController.getAllPayments();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(500.0, result.get(0).getAmount());

        verify(paymentService, times(1)).getAllPayments();
    }

    @Test
    void testGetPaymentById() {
        when(paymentService.getPaymentById(1L)).thenReturn(payment);

        Payment result = paymentController.getPaymentById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals(500.0, result.getAmount());

        verify(paymentService, times(1)).getPaymentById(1L);
    }

    @Test
    void testSavePayment() {
        when(paymentService.savePayment(any(Payment.class))).thenReturn(payment);

        Payment result = paymentController.savePayment(payment);

        assertNotNull(result);
        assertEquals(500.0, result.getAmount());
        assertEquals("Flat", result.getType());

        verify(paymentService, times(1)).savePayment(any(Payment.class));
    }

    @Test
    void testDeletePaymentById() {
        doNothing().when(paymentService).deletePaymentById(1L);

        paymentController.deletePaymentById(1L);

        verify(paymentService, times(1)).deletePaymentById(1L);
    }
}
