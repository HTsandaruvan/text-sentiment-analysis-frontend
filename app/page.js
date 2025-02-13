export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">Welcome to Text Sentiment Analysis</h1>
      <p className="mt-4 text-lg text-gray-600">
        Enter your text and get an AI-powered sentiment analysis.
      </p>
      <a href="/sentiment">
        <button className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-md">
          Get Started
        </button>
      </a>
    </div>
  );
}
