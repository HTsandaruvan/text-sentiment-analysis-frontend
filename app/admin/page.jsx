// app/admin/page.jsx

import ProtectedRoute from "@/components/ProtectedRoutes";

export default function AdminDashboard() {
    return (
        <ProtectedRoute allowedRoles={["admin"]}>

            <div>
                <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
                <p className="mt-2 text-gray-600">Manage users and analyze sentiment history.</p>
            </div>
        </ProtectedRoute>
    );
}
