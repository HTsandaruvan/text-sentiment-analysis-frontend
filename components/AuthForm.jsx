"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser, loginUser, setToken } from "@/lib/api";
import { toast } from "react-hot-toast"; // ✅ Import toast notifications
import { Loader2 } from "lucide-react"
import Link from "next/link";
import { motion } from "framer-motion";

export default function AuthForm({ isRegister = false }) {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState(null);
    const router = useRouter();

    const [isLoading, setLoading] = useState(false)


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (isRegister && !form.name.trim()) {
            setError("Name is required.");
            return false;
        }
        if (!form.email.trim()) {
            setError("Email is required.");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            setError("Invalid email format.");
            return false;
        }
        if (!form.password.trim()) {
            setError("Password is required.");
            return false;
        }
        if (form.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true)
        try {
            if (isRegister) {

                await registerUser(form);
                toast.success("Registration successful! Please log in.");
                router.push("/auth/login");
            } else {
                const { data } = await loginUser(form);
                setToken(data.token);

                // ✅ Store user data in localStorage
                localStorage.setItem("user", JSON.stringify(data.user));

                // ✅ Dispatch a custom event to notify Navbar
                window.dispatchEvent(new Event("userUpdated"));

                // ✅ Redirect based on role
                if (data.user.role === "admin") {
                    router.push("/admin");
                } else {
                    router.push("/sentiment");
                }

                toast.success("Login successful!");
            }
        } catch (err) {
            if (isRegister && err.response?.data?.message === "User already exists") {
                setError("An account with this email already exists. Please log in.");
                toast.error("User already exists. Try logging in.");
            }
            else {
                setError("Authentication failed. Please check your details.");
                toast.error("Authentication failed.");
            }
        }

        setLoading(false)

    };


    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center">{isRegister ? "Register" : "Login"}</h2>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <form onSubmit={handleSubmit}>
                {isRegister && (
                    <input name="name" placeholder="Name" onChange={handleChange} className="border w-full p-2 mb-2" />
                )}
                <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border w-full p-2 mb-2" />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border w-full p-2 mb-2" />
                {!isRegister && (<div className="flex text-sm font-medium text-gray-500 space-x-1 my-1">
                    <span>Don’t have an account yet? </span>
                    <Link
                        className="text-sm text-blue-700 hover:underline"
                        href="/auth/register"
                    >
                        Sign up
                    </Link>
                </div>)}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className=" flex items-center justify-center gap-2 w-full px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-all bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:ring-4 focus:ring-green-300"

                    disabled={isLoading}
                >
                    {isLoading && <Loader2 className="animate-spin w-5 h-5" />}
                    {isRegister ? "Register" : "Login"}
                </motion.button>

            </form>
        </div>
    );
}
