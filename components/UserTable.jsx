// components/UserTable.jsx

"use client";
import { useState, useEffect } from "react";
import { fetchUsers, deleteUser, updateUserRole } from "@/lib/api";
import Link from "next/link";
import { toast } from "react-hot-toast"; // ✅ Import toast notifications

export default function UserTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            try {
                const { data } = await fetchUsers();
                console.log("📢 Fetched Users:", data);
                setUsers(data);
            } catch (error) {
                console.error("❌ Error fetching users:", error.response?.data || error.message);
            }
        }
        loadUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (confirm("Are you sure you want to delete this user?")) {
            toast.promise(
                deleteUser(userId).then(() => {
                    setUsers(users.filter(user => user._id !== userId));
                }),
                {
                    loading: "Deleting user...",
                    success: "User deleted successfully!",
                    error: "Failed to delete user. Try again!",
                }
            );
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateUserRole(userId, newRole);
            setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
        } catch (error) {
            console.error("❌ Error updating role:", error.response?.data || error.message);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">User Management</h2>
                <Link href="/admin/user-management/edit-user">
                    <button className="bg-green-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded">+ Add User</button>
                </Link>
            </div>

            <table className="w-full border-collapse border border-gray-300 min-w-[600px]">
                <thead>
                    <tr className="bg-gray-200 text-sm sm:text-base">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="text-center text-xs sm:text-sm">
                            <td className="border p-2">{user.name}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">
                                <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    className="border p-1 rounded"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td className="border p-2">
                                <Link href={`/admin/user-management/edit-user?id=${user._id}`}>
                                    <button className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded mr-2">Edit</button>
                                </Link>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
