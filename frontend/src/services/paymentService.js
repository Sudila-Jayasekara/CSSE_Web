const API_URL = "http://localhost:8080/api/payment"; 

export const paymentService = {
    getAllPayments,
    getPaymentById,
    savePayment,
    deletePaymentById,
    getPaymentByRecycleItemId,
    getPaymentBySpecialWasteId
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

// Fetch a payment by RecycleItem ID
async function getPaymentByRecycleItemId(recycleItemId) {
    try {
        const response = await fetch(`${API_URL}/recycle-item/${recycleItemId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch payment for recycle item with id ${recycleItemId}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching payment by recycle item id ${recycleItemId}:`, error);
        throw error;
    }
}

// Fetch a payment by SpecialWaste ID
async function getPaymentBySpecialWasteId(specialWasteId) {
    try {
        const response = await fetch(`${API_URL}/special-waste/${specialWasteId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch payment for special waste with id ${specialWasteId}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching payment by special waste id ${specialWasteId}:`, error);
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
