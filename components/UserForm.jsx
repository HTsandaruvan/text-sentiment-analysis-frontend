// components/UserForm.jsx

"use client";
import { useState, useEffect } from "react";
import { createUser, updateUser, fetchUserById } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";

export default function UserForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get("id");

    const [form, setForm] = useState({ name: "", email: "", role: "user" });
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadUserData() {
            if (userId) {
                try {
                    const { data } = await fetchUserById(userId);
                    setForm(data);
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            }
        }
        loadUserData();
    }, [userId]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (userId) {
                await updateUserData(userId, { name: form.name, email: form.email });
                await updateUserRole(userId, form.role);
            } else {
                await createUser(form);
            }
            router.push("/admin/user-management");
        } catch (err) {
            setError("Failed to save user. Please check your input.");
        }
    };

    return (
        <div className="max-w-lg w-full mx-auto mt-6 p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-center">{userId ? "Edit User" : "Add User"}</h2>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border w-full p-2 mb-2 rounded-md"
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border w-full p-2 mb-2 rounded-md"
                    required
                />
                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="border w-full p-2 mb-2 rounded-md"
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button className="w-full bg-green-500 text-white py-2 rounded-md">
                    {userId ? "Update User" : "Create User"}
                </button>
            </form>
        </div>

    );
}
