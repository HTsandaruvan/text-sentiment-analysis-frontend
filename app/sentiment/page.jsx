import ProtectedRoute from "@/components/ProtectedRoutes";
import SentimentForm from "@/components/SentimentForm";

export default function SentimentPage() {
    return (
        <ProtectedRoute allowedRoles={["user"]}>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <SentimentForm />
            </div>
        </ProtectedRoute>
    );
}
