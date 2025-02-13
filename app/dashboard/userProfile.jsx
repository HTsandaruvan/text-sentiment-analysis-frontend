"use client";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "@/lib/api";
import EditProfile from "./editProfileForm";

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUserProfile() {
            try {
                const userData = await fetchUserProfile();
                console.log("User Data Fetched:", userData); // Debug log
                setUser(userData.user); // ✅ Fix: Extract "user" key
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setLoading(false);
            }
        }
        getUserProfile();
    }, []);


    if (loading) return <p>Loading...</p>;

    return (
        <div className="bg-white shadow-md p-6 rounded-md mt-6">
            {editing ? (
                <EditProfile user={user} setUser={setUser} onClose={() => setEditing(false)} />
            ) : (
                <>
                    <h2 className="text-2xl font-semibold">Profile Details</h2>
                    <img
                        src={user?.profilePicture || "https://github.com/shadcn.png"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover mt-4"
                    />
                    <p><strong>Name:</strong> {user?.name || "Not Available"}</p>
                    <p><strong>Email:</strong> {user?.email || "Not Available"}</p>
                    <p><strong>Address:</strong> {user?.address || "Not Provided"}</p>
                    <p><strong>Contact:</strong> {user?.contactNumber || "Not Provided"}</p>

                    <button
                        onClick={() => setEditing(true)}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Edit Profile
                    </button>
                </>
            )}
        </div>
    );
}
