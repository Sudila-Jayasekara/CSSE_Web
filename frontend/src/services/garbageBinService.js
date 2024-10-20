// services/garbageBinService.js
import axios from 'axios';

// Define the base URL for the API (adjust this based on your backend setup)
const API_BASE_URL = 'http://localhost:1010/api/garbage-bin'; // Replace with your actual API URL

export const garbageBinService = {
    // Method to get all garbage bins
    getAllGarbageBins: async () => {
        try {
            const response = await axios.get(API_BASE_URL);
            return response.data; // Assuming the response data is an array of garbage bins
        } catch (error) {
            console.error('Error fetching garbage bins:', error);
            throw error;
        }
    },

    // Method to get a garbage bin by ID
    getGarbageBinById: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${id}`);
            return response.data; // Assuming the response contains the garbage bin data
        } catch (error) {
            console.error(`Error fetching garbage bin with ID ${id}:`, error);
            throw error;
        }
    },

    // Method to create a new garbage bin (if needed)
    createGarbageBin: async (garbageBinData) => {
        try {
            const response = await axios.post(API_BASE_URL, garbageBinData);
            return response.data; // Assuming the response contains the created garbage bin
        } catch (error) {
            console.error('Error creating garbage bin:', error);
            throw error;
        }
    },

    // Method to update a garbage bin by ID (if needed)
    updateGarbageBin: async (id, updatedData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData);
            return response.data; // Assuming the response contains the updated garbage bin
        } catch (error) {
            console.error(`Error updating garbage bin with ID ${id}:`, error);
            throw error;
        }
    },

    // Method to delete a garbage bin by ID (if needed)
    deleteGarbageBin: async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${id}`);
            return response.data; // Assuming the response contains a success message or the deleted garbage bin
        } catch (error) {
            console.error(`Error deleting garbage bin with ID ${id}:`, error);
            throw error;
        }
    }
};
