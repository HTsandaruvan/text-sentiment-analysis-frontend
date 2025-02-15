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
                    <div className="rounded-md mt-6 flex justify-between items-center">
                        <div className="flex-1">
                            <p><strong>Name:</strong> {user?.name || "Not Available"}</p>
                            <p><strong>Email:</strong> {user?.email || "Not Available"}</p>
                            <p><strong>Address:</strong> {user?.address || "Not Provided"}</p>
                            <p><strong>Contact:</strong> {user?.contactNumber || "Not Provided"}</p>
                        </div>
                        {/* Right Side: Profile Picture */}
                        <div className="w-40 h-40">
                            <img
                                src={user?.profilePicture || "https://github.com/shadcn.png"}
                                alt="Profile"
                                className="w-40 h-40 rounded-full object-cover border-2 border-gray-300 shadow"
                            />
                        </div>

                    </div>

                    <button
                        onClick={() => setEditing(true)}
                        className="mt-2- bg-blue-500 text-white px-4 py-2 rounded-md self-start"
                    >
                        Edit Profile
                    </button>
                </>
            )}
        </div>
    );
}
