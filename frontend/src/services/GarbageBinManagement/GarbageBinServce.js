const API_URL = "http://localhost:8080/api/garbage-bin"; // Replace with your backend API URL

export const garbageBinService = {
    getAllGarbageBins,
    getGarbageBinById,
    saveGarbageBin,
    deleteGarbageBinById,
    updateGarbageBin,
};

// Fetch all garbage bins
async function getAllGarbageBins() {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch garbage bins');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching garbage bins:', error);
        throw error;
    }
}

// Fetch a garbage bin by ID
async function getGarbageBinById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch garbage bin with id ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching garbage bin by id:', error);
        throw error;
    }
}

// Save a new garbage bin
async function saveGarbageBin(garbageBin) {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(garbageBin),
        });
        if (!response.ok) {
            throw new Error('Failed to save garbage bin');
        }
        return await response.json();
    } catch (error) {
        console.error('Error saving garbage bin:', error);
        throw error;
    }
}

// Update an existing garbage bin by ID
async function updateGarbageBin(id, garbageBin) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(garbageBin),
        });
        if (!response.ok) {
            throw new Error('Failed to update garbage bin');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating garbage bin:', error);
        throw error;
    }
}

// Delete a garbage bin by ID
async function deleteGarbageBinById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to delete garbage bin with id ${id}`);
        }
    } catch (error) {
        console.error('Error deleting garbage bin:', error);
        throw error;
    }
}