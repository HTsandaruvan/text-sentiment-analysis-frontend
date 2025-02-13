import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <AuthForm isRegister={false} />
        </div>
    );
}
