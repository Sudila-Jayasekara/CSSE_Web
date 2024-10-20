import axios from 'axios';

// Replace this with your actual API endpoint for reports
const API_URL = "http://localhost:1010/api/reports"; // Adjust the URL as necessary
const API_URL2 = "http://localhost:1010/api/recycle-item"; 

// Function to create a report
export const createReport = async (reportData) => {
    try {
        const response = await axios.post(API_URL, reportData);
        return response.data; // Return the created report data
    } catch (error) {
        console.error("Error creating the report:", error.response?.data || error.message);
        throw error;
    }
};

export const getAllRecycleItems = async () => {
    try {
        const response = await axios.get(API_URL2);
        return response.data; // Return all recycle items fetched
    } catch (error) {
        console.error("Error fetching the recycle items:", error.response?.data || error.message);
        throw error;
    }
};

// Function to fetch all reports from the backend
export const getAllReports = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Return all reports fetched
    } catch (error) {
        console.error("Error fetching the reports:", error.response?.data || error.message);
        throw error;
    }
};

// Function to fetch a single report by its ID
export const getReportById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data; // Return the fetched report
    } catch (error) {
        console.error(`Error fetching the report with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Function to delete a report by its ID
export const deleteReport = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data; // Return success message
    } catch (error) {
        console.error(`Error deleting the report with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Function to update an existing report by its ID
export const updateReport = async (id, updatedReport) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedReport);
        return response.data; // Return updated report data
    } catch (error) {
        console.error(`Error updating the report with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};
