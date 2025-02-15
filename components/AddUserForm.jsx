"use client"

import { useState } from "react";
import { createUser } from "@/lib/api";
import { toast } from "react-hot-toast";

export default function AddUserModal({ onClose, onUserAdded }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(formData);
            toast.success("User added successfully!");
            onUserAdded(); // Refresh the user table
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add user. Try again!");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Add New User</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mb-2"
                        placeholder="Full Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mb-2"
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mb-2"
                        placeholder="Password"
                        required
                    />
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mb-4"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-400 text-white rounded">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
