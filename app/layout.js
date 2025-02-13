import Navbar from "@/components/Navbar";
import "./styles/globals.css";
import { Toaster } from "react-hot-toast"; // ✅ Import toast provider

export const metadata = {
  title: "Text Sentiment Analysis",
  description: "Analyze text sentiment using AI-powered NLP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
        <Toaster position="top-center" /> {/*toast notification provider */}
      </body>
    </html>
  );
}
