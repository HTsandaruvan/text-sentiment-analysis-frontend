"use client";
import { useState, useEffect } from "react";
import { fetchAdminUserSentimentHistory, fetchUsers } from "@/lib/api";
import { Line } from "react-chartjs-2";
import { toast } from "react-hot-toast";

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
);

export default function SentimentHistoryChart() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [sentimentHistory, setSentimentHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadUsers() {
            const { data } = await fetchUsers();
            setUsers(data);
        }
        loadUsers();
    }, []);

    useEffect(() => {
        async function loadSentimentHistory() {
            if (selectedUser) {
                setLoading(true);
                setSentimentHistory([]); // Clear previous data

                try {
                    //console.log("📡 Fetching sentiment history for user:", selectedUser);
                    const { data } = await fetchAdminUserSentimentHistory(selectedUser);
                    //console.log("✅ Received sentiment history:", data);

                    if (data.length === 0) {
                        toast.error("No sentiment history found for this user.");
                    }

                    setSentimentHistory(data);
                } catch (error) {
                    toast.error("Error fetching sentiment history. Please try again.");
                } finally {
                    setLoading(false);
                }
            }
        }
        loadSentimentHistory();
    }, [selectedUser]);

    const chartData = {
        labels: sentimentHistory.map((entry) => entry.createdAt),
        datasets: [
            {
                label: "Sentiment Confidence",
                data: sentimentHistory.map((entry) => entry.confidence),
                fill: false,
                borderColor: "blue",
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="max-w-4xl mx-auto mt-6 p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">Sentiment History Analysis</h2>

            {/* User Selection Dropdown */}
            <select
                className="border p-2 w-full mb-4 rounded-md"
                onChange={(e) => setSelectedUser(e.target.value)}
                value={selectedUser}
            >
                <option value="">Select a User</option>
                {users.map((user) => (
                    <option key={user._id} value={user._id}>
                        {user.name} ({user.email})
                    </option>
                ))}
            </select>

            {/* Loading State */}
            {loading && <p className="text-center text-blue-500">Loading sentiment history...</p>}

            {/* Sentiment Chart */}
            {selectedUser && sentimentHistory.length > 0 && (
                <div className="w-full">
                    <Line data={chartData} />
                </div>
            )}

            {/* Sentiment History Table */}
            {selectedUser && sentimentHistory.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Sentiment History Details</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-2">Date</th>
                                    <th className="border border-gray-300 px-4 py-2">Text</th>
                                    <th className="border border-gray-300 px-4 py-2">Confidence</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sentimentHistory.map((entry, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">{entry.createdAt}</td>
                                        <td className="border border-gray-300 px-4 py-2">{entry.text}</td>
                                        <td className="border border-gray-300 px-4 py-2">{entry.confidence}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
