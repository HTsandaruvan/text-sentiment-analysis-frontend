"use client";

import { useState, useEffect } from "react";
import { updateUserProfile, fetchUserProfile } from "@/lib/api";
import { toast } from "react-toastify";

export default function EditProfile({ user, setUser, onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        contactNumber: "",
        profilePicture: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                address: user.address || "",
                contactNumber: user.contactNumber || "",
                profilePicture: user.profilePicture || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFormData({ ...formData, profilePicture: reader.result });
            };
        }
    };

    const handleProfileUpdate = async () => {
        const updatedUser = await fetchUserProfile();
        setUser(updatedUser.user); // ✅ Update the user state in the parent component
        toast.success("Profile updated successfully!");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user._id) {
            console.error("❌ User ID is missing!");
            toast.error("User ID is not found.");
            return;
        }

        console.log("User ID:", user._id);
        console.log("Form Data:", formData);

        try {
            await updateUserProfile(formData);
            handleProfileUpdate(); // ✅ Refresh user state immediately
            onClose();
        } catch (error) {
            console.error("❌ Error updating profile:", error);
            toast.error("Failed to update profile.");
        }
    };

    return (
        <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <label className="block">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />

                <label className="block mt-2">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />

                <label className="block mt-2">Address</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />

                <label className="block mt-2">Contact Number</label>
                <input
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />

                <label className="block mt-2">Profile Picture</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border p-2 w-full"
                />

                {formData.profilePicture && (
                    <img
                        src={formData.profilePicture}
                        alt="Profile Preview"
                        className="mt-2 w-20 h-20 object-cover rounded-full"
                    />
                )}

                <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">
                    Save Changes
                </button>

                <button type="button" onClick={onClose} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md ml-2">
                    Cancel
                </button>
            </form>
        </div>
    );
}
