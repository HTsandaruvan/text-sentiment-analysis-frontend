"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar({ onLinkClick }) {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-full p-6">
            <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
            <nav>
                <ul>
                    <li className={`mb-2 ${pathname === "/admin/user-management" ? "font-bold" : ""}`}>
                        <Link href="/admin/user-management" onClick={onLinkClick}>
                            👤 User Management
                        </Link>
                    </li>
                    <li className={`mb-2 ${pathname === "/admin/sentiment-history" ? "font-bold" : ""}`}>
                        <Link href="/admin/sentiment-history" onClick={onLinkClick}>
                            📊 Sentiment Analysis
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
