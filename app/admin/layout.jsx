"use client";
import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { IoMenu, IoClose } from "react-icons/io5"; // Import icons

export default function AdminLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Function to close sidebar when clicking outside
    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex flex-col sm:flex-row h-screen">
            {/* Header Section */}

            {/* Move Hamburger Icon to Bottom of Header */}
            <button
                className="sm:hidden p-3 bg-gray-200 rounded-full fixed bottom-5 left-5 z-50"
                onClick={() => setIsSidebarOpen(true)}
            >
                <IoMenu size={28} />
            </button>


            {/* Sidebar + Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
                    onClick={handleCloseSidebar} // Click outside to close
                ></div>
            )}

            {/* Sidebar with Slide Effect */}
            <div
                className={` mt-20 fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform transform z-40 
                ${isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"} sm:relative sm:translate-x-0 sm:opacity-100`}
            >
                {/* Close Button Inside Sidebar */}
                <button
                    className="sm:hidden absolute top-5 right-5 text-gray-600"
                    onClick={handleCloseSidebar}
                >
                    <IoClose size={28} />
                </button>

                {/* Sidebar Content */}
                <AdminSidebar onLinkClick={handleCloseSidebar} />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 bg-gray-100 overflow-auto mt-16">{children}</div>
        </div>
    );
}
