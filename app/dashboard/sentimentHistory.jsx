"use client";
import { useEffect, useState } from "react";
import { fetchUserSentimentHistory, deleteSentimentHistory } from "@/lib/api";
import { toast } from "react-hot-toast";

export default function SentimentHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const { data } = await fetchUserSentimentHistory();
                console.log("✅ Fetched Sentiment History:", data);
                setHistory(data);
            } catch (error) {
                console.error("❌ Error loading sentiment history:", error);
            }
        };
        loadHistory();
    }, []);


    const handleDelete = async (id) => {
        toast(
            (t) => (
                <div>
                    <p className="text-sm">Are you sure you want to delete this entry?</p>
                    <div className="mt-2 flex justify-end gap-2">
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                            onClick={async () => {
                                toast.dismiss(t.id);
                                const response = await deleteSentimentHistory(id);
                                if (response.success) {
                                    setHistory((prevHistory) => prevHistory.filter((item) => item._id !== id));
                                    toast.success("Sentiment history deleted successfully!");
                                } else {
                                    toast.error("Error deleting history.");
                                    console.error("Error deleting history:", response.error);
                                }
                            }}
                        >
                            Yes, Delete
                        </button>
                        <button
                            className="bg-gray-300 px-3 py-1 rounded text-sm"
                            onClick={() => toast.dismiss(t.id)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ),
            { duration: 7000 }
        );
    };


    return (
        <div className="bg-white shadow-md p-4 sm:p-6 rounded-md mt-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-center">Sentiment Analysis History</h2>

            {/* Responsive Scrollable Table */}
            <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse border border-gray-300 min-w-[600px]">
                    <thead>
                        <tr className="bg-gray-200 text-sm sm:text-base">
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Text</th>
                            <th className="border p-2">Sentiment</th>
                            <th className="border p-2">Confidence</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, index) => (
                            <tr key={index} className="text-center text-xs sm:text-sm">
                                <td className="border p-2">{item.createdAt}</td>
                                <td className="border p-2 truncate max-w-[150px] sm:max-w-[300px]">{item.text}</td>
                                <td className="border p-2">{item.sentiment}</td>
                                <td className="border p-2">{Math.round(item.confidence * 100)}%</td>
                                <td className="border p-2">
                                    <button
                                        className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
