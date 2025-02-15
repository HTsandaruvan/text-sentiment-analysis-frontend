"use client";
import { useState, useEffect } from "react";
import { updateUserDetails, fetchUsers } from "@/lib/api";
import { toast } from "react-hot-toast";

export default function EditUserForm({ userId, onClose, onUpdate }) {
    const [userData, setUserData] = useState({ name: "", email: "", role: "user" });

    useEffect(() => {
        async function loadUser() {
            try {
                const { data } = await fetchUsers();
                const user = data.find(user => user._id === userId);
                if (user) {
                    setUserData({ name: user.name, email: user.email, role: user.role });
                }
            } catch (error) {
                console.error("❌ Error fetching user details:", error.response?.data || error.message);
            }
        }
        loadUser();
    }, [userId]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserDetails(userId, userData);
            toast.success("User details updated successfully!");
            onUpdate();
            onClose();
        } catch (error) {
            toast.error("Failed to update user. Try again!");
            console.error("❌ Error:", error);
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="block text-sm font-medium">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium">Role:</label>
                    <select
                        name="role"
                        value={userData.role}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="flex justify-end">
                    <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
