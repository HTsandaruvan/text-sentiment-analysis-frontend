"use client"

import { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from "@/lib/api";
import { toast } from "react-hot-toast";
import EditUserForm from "./EditUserForm"; // ✅ Import the EditUserForm component
import AddUserModal from "./AddUserForm"; // Import AddUserModal

export default function UserTable() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [isAddingUser, setIsAddingUser] = useState(false);

    useEffect(() => {
        async function loadUsers() {
            try {
                const { data } = await fetchUsers();
                setUsers(data);
            } catch (error) {
                console.error("❌ Error fetching users:", error.response?.data || error.message);
            }
        }
        loadUsers();
    }, []);
    const loadUsers = async () => {
        try {
            const { data } = await fetchUsers();
            setUsers(data);
        } catch (error) {
            console.error("❌ Error fetching users:", error.message);
        }
    };
    const handleDelete = async (userId) => {
        toast((t) => (
            <div>
                <p className="text-sm">Are you sure you want to delete this user?</p>
                <div className="mt-2 flex justify-end gap-2">
                    <button
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                await deleteUser(userId);
                                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
                                toast.success("User deleted successfully!");
                            } catch (error) {
                                toast.error("Failed to delete user. Try again!");
                                console.error("Error deleting user:", error);
                            }
                        }}
                    >
                        Yes, Delete
                    </button>
                    <button
                        className="bg-gray-300 px-3 py-1 rounded text-sm"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), { duration: 7000 });
    };


    return (
        <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">User Management</h2>
                <button
                    onClick={() => setIsAddingUser(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    + Add User
                </button>
            </div>

            <table className="w-full border-collapse border border-gray-300 min-w-[600px]">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="text-center">
                            <td className="border p-2">{user.name}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">{user.role}</td>
                            <td className="border p-2">
                                <button
                                    onClick={() => setEditingUser(user)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingUser && <EditUserForm userId={editingUser._id} onClose={() => setEditingUser(null)} onUpdate={loadUsers} // Reload table after update
            />}
            {isAddingUser && (
                <AddUserModal
                    onClose={() => setIsAddingUser(false)}
                    onUserAdded={loadUsers}
                />
            )}
        </div>
    );
}
