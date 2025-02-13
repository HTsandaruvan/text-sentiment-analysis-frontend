"use client";
import { useState } from "react";
import { analyzeText } from "@/lib/api";

export default function SentimentForm() {
    const [text, setText] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); // 🚀 Add error state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResult(null);
        setError("");

        if (!text.trim()) {
            setError("Text input cannot be empty!");
            return;
        }

        setLoading(true);
        try {
            const { data } = await analyzeText(text);
            console.log("API Response:", data); // ✅ Debugging API response

            if (data && data.sentiment && data.confidence !== undefined) {
                setResult({
                    sentiment: data.sentiment,  // ✅ Ensure correct extraction
                    confidence: data.confidence
                });
            } else {
                setError("Invalid response from server");
            }
        } catch (err) {
            console.error("Error analyzing text", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-lg mx-auto mt-10 w-full">
            <h2 className="text-2xl font-semibold text-center mb-4">Analyze Sentiment</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
                <textarea
                    className="border w-full p-2 mb-2"
                    rows="4"
                    placeholder="Enter your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>

                {/* 🚨 Show error message */}
                {error && <p className="text-red-500 mb-2">{error}</p>}

                <button disabled={loading} type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
                    {loading ? "Analyzing..." : "Analyze"}
                </button>
            </form>

            {/* ✅ Display result only if available */}
            {result && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                    <h3 className="text-lg font-bold">Result:</h3>
                    <p>
                        Sentiment: <span className="font-semibold">
                            {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
                        </span>
                        {result.sentiment === "positive" ? " 😊" : result.sentiment === "negative" ? " 😞" : " 😐"}
                    </p>                    <p>Confidence: {Math.round(result.confidence * 100)}%</p>
                </div>
            )}
        </div>
    );
}
