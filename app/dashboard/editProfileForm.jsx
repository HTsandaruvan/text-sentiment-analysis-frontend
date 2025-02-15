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
        profilePicture: null,
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
            const maxSize = 5 * 1024 * 1024; // 5MB limit

            if (file.size > maxSize) {
                toast.error("❌ File size exceeds 5MB. Please choose a smaller file.");
                return;
            }

            setFormData({ ...formData, profilePicture: file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user._id) {
            toast.error("User ID is not found.");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("address", formData.address);
        formDataToSend.append("contactNumber", formData.contactNumber);
        if (formData.profilePicture instanceof File) {
            formDataToSend.append("profilePicture", formData.profilePicture);
        }

        try {
            await updateUserProfile(formDataToSend);
            const updatedUser = await fetchUserProfile();
            setUser(updatedUser.user);
            onClose();
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Failed to update profile.");
            console.error("❌ Error updating profile:", error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="mt-4" encType="multipart/form-data">
                <label className="block">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full" />

                <label className="block mt-2">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 w-full" disabled />

                <label className="block mt-2">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className="border p-2 w-full" />

                <label className="block mt-2">Contact Number</label>
                <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="border p-2 w-full" />

                <label className="block mt-2">Profile Picture</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 w-full" />

                {formData.profilePicture && (
                    <img src={typeof formData.profilePicture === "string" ? formData.profilePicture : URL.createObjectURL(formData.profilePicture)} alt="Profile Preview" className="mt-2 w-20 h-20 object-cover rounded-full" />
                )}

                <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">Save Changes</button>
                <button type="button" onClick={onClose} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md ml-2">Cancel</button>
            </form>
        </div>
    );
}
