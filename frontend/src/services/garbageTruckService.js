const API_URL = "http://localhost:8080/api/garbage-truck"; // Replace with your backend API URL

export const garbageBinTruckService = {
    getAllFullGarbageBins,
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
