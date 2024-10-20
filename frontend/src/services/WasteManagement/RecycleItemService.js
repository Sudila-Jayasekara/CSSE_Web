const API_URL = "http://localhost:1010/api/recycle-item"; // Replace with your backend API URL

export const recycleItemService = {
    getAllRecycleItems,
    getRecycleItemById,
    saveRecycleItem,
    deleteRecycleItemById,
};

// Fetch all recycle items
async function getAllRecycleItems() {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch recycle items');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching recycle items:', error);
        throw error;
    }
}

// Fetch a recycle item by ID
async function getRecycleItemById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch recycle item with id ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching recycle item by id:', error);
        throw error;
    }
}

// Save a new recycle item
async function saveRecycleItem(recycleItem) {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recycleItem),
        });
        if (!response.ok) {
            throw new Error('Failed to save recycle item');
        }
        return await response.json();
    } catch (error) {
        console.error('Error saving recycle item:', error);
        throw error;
    }
}

// Delete a recycle item by ID
async function deleteRecycleItemById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to delete recycle item with id ${id}`);
        }
    } catch (error) {
        console.error('Error deleting recycle item:', error);
        throw error;
    }
}
