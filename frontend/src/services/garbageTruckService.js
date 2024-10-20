const API_URL = "http://localhost:8080/api/garbage-truck"; // Replace with your backend API URL

export const garbageBinTruckService = {
    getAllFullGarbageBins,
    toggleCollectBin
};

// Fetch all full garbage bins from the API
async function getAllFullGarbageBins() {
    try {
        const response = await fetch(`${API_URL}/check-full-bins`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`Failed to fetch garbage bins, status: ${response.status}`);
        }
        
        // Parse the JSON response
        const fullBins = await response.json();
        return fullBins;
    } catch (error) {
        // Log error to the console and rethrow it for handling in the component
        console.error('Error fetching full garbage bins:', error);
        throw error;
    }
}

// Toggle collect status for a specific garbage bin
async function toggleCollectBin(binId) {
    try {
        const response = await fetch(`${API_URL}/bins/${binId}/collect`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to update collect status, status: ${response.status}`);
        }

        return await response.json(); // Return the updated bin
    } catch (error) {
        console.error('Error updating collect status:', error);
        throw error;
    }
}
