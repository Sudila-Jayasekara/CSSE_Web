// src/services/userService.js

const API_URL = "http://localhost:1010/api/user"; // Replace with your backend URL

export const userService = {
    saveUser,
    getAllUsers,
    getUserById,
    deleteUser,
    loginUser 
};

async function saveUser(userData) {
    try {
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error("Failed to register user");
        }
        return await response.json();
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

async function getAllUsers() {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

async function getUserById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}

async function deleteUser(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to delete user");
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}

async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Invalid credentials");
            } else {
                throw new Error("Failed to login");
            }
        }

        return await response.json(); // Return the logged-in user data
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}