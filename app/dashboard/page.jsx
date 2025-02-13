import ProtectedRoute from "@/components/ProtectedRoutes";
import UserProfile from "./userProfile";
import SentimentHistory from "./sentimentHistory";

export default function DashboardPage() {
    return (
        <ProtectedRoute allowedRoles={["user"]}>
            <div className="container mx-auto mt-12 pt-10 p-4">
                <h1 className="text-3xl font-bold text-center">User Dashboard</h1>

                {/* User Profile Section */}
                <UserProfile />

                {/* Sentiment History Section */}
                <SentimentHistory />
            </div>
        </ProtectedRoute>
    );
}
