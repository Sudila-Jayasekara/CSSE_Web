const API_URL = "http://localhost:8080/api/payment"; 

export const paymentService = {
    getAllPayments,
    getPaymentById,
    savePayment,
    deletePaymentById,
};

// Fetch all Payments
async function getAllPayments() {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Optional if the API requires JSON responses
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch payments');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching payments:', error);
        throw error;
    }
}

// Fetch a payment by ID
async function getPaymentById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch payment with id ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching payment by id ${id}:`, error);
        throw error;
    }
}



async function savePayment(paymentData) {
    try {
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
        });
        if (!response.ok) {
            throw new Error("Failed to save payment");
        }
        return await response.json();
    } catch (error) {
        console.error("Error saving payment:", error);
        throw error;
    }
}



// Delete a payment by ID
async function deletePaymentById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to delete payment with id ${id}`);
        }
    } catch (error) {
        console.error(`Error deleting payment with id ${id}:`, error);
        throw error;
    }
}
