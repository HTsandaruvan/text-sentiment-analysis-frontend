"use client";
import Link from "next/link";
import { getUser, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion";


export default function Navbar() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        };

        fetchUser(); // ✅ Fetch on mount

        // ✅ Listen for profile update event
        const handleUserUpdate = () => {
            console.log("🔄 User updated event received!");
            fetchUser();
        };

        window.addEventListener("userUpdated", handleUserUpdate);

        return () => {
            window.removeEventListener("userUpdated", handleUserUpdate);
        };
    }, []);


    const Button2 = ({ children }) => {
        return (

            <Link href="/auth/login" passHref>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-all bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700"
                >
                    {children}
                </motion.div>
            </Link>
        );
    };

    const handleLogout = () => {
        logout();
        setUser(null);
        localStorage.removeItem("user"); // ✅ Clear stored user data
        window.dispatchEvent(new Event("userUpdated")); // ✅ Notify other components
        router.push("/auth/login");
    };
    return (
        <nav className="bg-gray-900 text-white p-4 fixed top-0 left-0 w-full shadow-md z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Right side logo */}
                <Link href="/" className="text-lg font-bold mr-1">Sentiment Analysis</Link>
                {/* Left side links */}
                <div className="flex items-center gap-x-6">

                    {user ? (
                        <>
                            {user.role === "user" && <Link href="/sentiment">Analyze</Link>}
                            {user.role === "admin" && <Link href="/admin">Admin</Link>}
                            <div className="relative">
                                <DropdownMenu className="bg-white">
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                            <Avatar className="h-10 w-10 border-2 border-blue-500">
                                                <AvatarImage src={user?.profilePicture || "https://github.com/shadcn.png"} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent className="bg-white">
                                        <DropdownMenuLabel>
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none text-primary-400">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs leading-none text-muted-foreground">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem><Link href="/dashboard" className="block">Profile</Link></DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href="/dashboard" className="block">Dashboard</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-slate-500/25" />
                                        <DropdownMenuItem>
                                            <button onClick={handleLogout} className="block py-2 w-full text-left">
                                                Logout
                                            </button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </>
                    ) : (
                        <>

                            <div className="flex space-x-4">

                                <Button2>Login</Button2>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </nav>

    );
}
