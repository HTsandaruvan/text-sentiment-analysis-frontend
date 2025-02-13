"use client";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loggedInUser = getUser();

        // Redirect unauthenticated users to login
        if (!loggedInUser) {
            router.replace("/auth/login");
            return;
        }

        // Redirect unauthorized users to home
        if (allowedRoles.length && !allowedRoles.includes(loggedInUser.role)) {
            router.replace("/");
            return;
        }

        setUser(loggedInUser);
        setLoading(false);
    }, [allowedRoles]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return children;
}
