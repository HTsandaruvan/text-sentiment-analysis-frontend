import axios from "axios";
import { getToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URI

// ✅ Save token in localStorage
export const setToken = (token) => localStorage.setItem("token", token);

// ✅ Auth Endpoints
export const registerUser = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/auth/login`, userData);

// ✅ Sentiment Analysis Endpoints
export const analyzeText = async (text) => {
    const token = getToken();
    return axios.post(`${API_URL}/sentiment/analyze`, { text }, {
        headers: { Authorization: `Bearer ${token}` },
    }).then(response => response.data);
};

export const fetchUserSentimentHistory = async () => {
    const token = getToken();
    if (!token) {
        console.error("❌ No token found in localStorage");
        return { data: [] };
    }
    try {
        return await axios.get(`${API_URL}/sentiment/history`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error("❌ Error fetching sentiment history:", error.response?.data || error.message);
    }
};

export const deleteSentimentHistory = async (id) => {
    const token = getToken();
    if (!token) {
        console.error("❌ No token found in localStorage");
        return { success: false };
    }
    try {
        await axios.delete(`${API_URL}/sentiment/history/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return { success: true };
    } catch (error) {
        console.error("❌ Error deleting sentiment history:", error.response?.data || error.message);
        return { success: false, error: error.response?.data || error.message };
    }
};

// ✅ User Profile Endpoints for user
export const fetchUserProfile = async () => {
    try {
        return await axios.get(`${API_URL}/users/profile`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        }).then(response => response.data);
    } catch (error) {
        console.error("❌ Error fetching user profile:", error.response?.data || error.message);
        throw error;
    }
};

export const updateUserProfile = async (userData) => {
    try {
        return await axios.put(`${API_URL}/users/profile`, userData, {
            headers: { Authorization: `Bearer ${getToken()}` },
        });
    } catch (error) {
        console.error("❌ Error updating profile:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Admin Endpoints
export const fetchUsers = async () => axios.get(`${API_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${getToken()}` },
});

export const deleteUser = async (userId) => axios.delete(`${API_URL}/admin/user/${userId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
});

export const updateUserRole = async (userId, role) => axios.put(`${API_URL}/admin/user/${userId}/role`,
    { role },
    { headers: { Authorization: `Bearer ${getToken()}` } }
);

export const updateUserDetails = async (userId, userData) => {
    try {
        return await axios.put(`${API_URL}/admin/user/${userId}`, userData, {
            headers: { Authorization: `Bearer ${getToken()}` },
        });
    } catch (error) {
        console.error("❌ Error updating user:", error.response?.data || error.message);
        throw error;
    }
};

export const createUser = async (userData) => {
    return axios.post(`${API_URL}/admin/user`, userData, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
};



export const fetchAdminUserSentimentHistory = async (userId) => {
    if (!userId) {
        console.error("❌ No userId provided to fetch sentiment history");
        return { data: [] };
    }
    const token = getToken();
    if (!token) {
        console.error("❌ No token found in localStorage");
        return { data: [] };
    }
    try {
        return await axios.get(`${API_URL}/admin/user/${userId}/sentiment-history`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        // console.error("❌ Error fetching sentiment history:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Fetch all users
export const fetchAllUsers = async () => axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${getToken()}` },
});
