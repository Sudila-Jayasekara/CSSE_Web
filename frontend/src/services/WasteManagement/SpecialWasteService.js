const API_URL = "http://localhost:8080/api/special-waste"; // Replace with your backend API URL

export const specialWasteService = {
    getAllSpecialWastes,
    getSpecialWasteById,
    saveSpecialWaste,
    deleteSpecialWasteById,
};

// Fetch all special wastes
async function getAllSpecialWastes() {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch special wastes');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching special wastes:', error);
        throw error;
    }
}

// Fetch a special waste by ID
async function getSpecialWasteById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch special waste with id ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching special waste by id:', error);
        throw error;
    }
}

// Save a new special waste
async function saveSpecialWaste(specialWaste) {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(specialWaste),
        });
        if (!response.ok) {
            throw new Error('Failed to save special waste');
        }
        return await response.json();
    } catch (error) {
        console.error('Error saving special waste:', error);
        throw error;
    }
}

// Delete a special waste by ID
async function deleteSpecialWasteById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to delete special waste with id ${id}`);
        }
    } catch (error) {
        console.error('Error deleting special waste:', error);
        throw error;
    }
}
