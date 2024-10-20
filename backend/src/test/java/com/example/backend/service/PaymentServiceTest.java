import com.example.backend.entity.Payment;
import com.example.backend.entity.RecycleItem;
import com.example.backend.entity.SpecialWaste;
import com.example.backend.entity.User;
import com.example.backend.repository.PaymentRepository;
import com.example.backend.service.PaymentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PaymentServiceTest {

    @Mock
    private PaymentRepository paymentRepository;

    @InjectMocks
    private PaymentService paymentService;

    private Payment payment;
    private User user;
    private RecycleItem recycleItem;
    private SpecialWaste specialWaste;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);  // Initialize mocks

        // Mock User, RecycleItem, and SpecialWaste
        user = new User();
        user.setId(1L);
        user.setPaymentType("weight based");  // Set the user's payment type

        recycleItem = new RecycleItem();
        recycleItem.setId(1L);

        specialWaste = new SpecialWaste();
        specialWaste.setId(1L);

        payment = new Payment();
        payment.setId(1L);
        payment.setUser(user);
        payment.setAmount(500.0);
        payment.setPaymentType("weight based");  // Set the paymentType explicitly
    }

    @Test
    void testGetAllPayments() {
        when(paymentRepository.findAll()).thenReturn(Arrays.asList(payment));

        List<Payment> payments = paymentService.getAllPayments();

        assertNotNull(payments);
        assertEquals(1, payments.size());
        assertEquals(500.0, payments.get(0).getAmount());

        verify(paymentRepository, times(1)).findAll();
    }

    @Test
    void testGetPaymentById() {
        when(paymentRepository.findById(1L)).thenReturn(Optional.of(payment));

        Payment foundPayment = paymentService.getPaymentById(1L);

        assertNotNull(foundPayment);
        assertEquals(500.0, foundPayment.getAmount());
        assertEquals("weight based", foundPayment.getPaymentType());

        verify(paymentRepository, times(1)).findById(1L);
    }

    @Test
    void testSavePayment_WithRecycleItem() {
        payment.setRecycleItem(recycleItem);

        when(paymentRepository.save(payment)).thenReturn(payment);

        Payment savedPayment = paymentService.savePayment(payment);

        assertNotNull(savedPayment);
        assertEquals("reward", savedPayment.getType());
        assertEquals(recycleItem, savedPayment.getRecycleItem());

        verify(paymentRepository, times(1)).save(payment);
    }

    @Test
    void testSavePayment_WithSpecialWaste() {
        payment.setSpecialWaste(specialWaste);

        when(paymentRepository.save(payment)).thenReturn(payment);

        Payment savedPayment = paymentService.savePayment(payment);

        assertNotNull(savedPayment);
        assertEquals("collection", savedPayment.getType());
        assertEquals(specialWaste, savedPayment.getSpecialWaste());

        verify(paymentRepository, times(1)).save(payment);
    }

    @Test
    void testDeletePaymentById() {
        paymentService.deletePaymentById(1L);

        verify(paymentRepository, times(1)).deleteById(1L);
    }
}
