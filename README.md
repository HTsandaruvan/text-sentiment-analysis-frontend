# **Text Sentiment Analysis - Frontend**

## 📌 Project Description  
This is the frontend for the **Text Sentiment Analysis** project, built with **Next.js (React)** and styled using **TailwindCSS** and **ShadCN**.  
It allows users to input text, analyze sentiment using an ML model, and view analysis history. The application features **role-based authentication** (User/Admin) and a fully responsive UI.  

---

## 🚀 Features  
- ✅ **User Authentication** (Sign-up, Login, JWT-based auth)  
- ✅ **Role-Based Access Control** (User/Admin dashboard)  
- ✅ **Text Sentiment Analysis** (API integration with Flask backend)  
- ✅ **History Management** (View previous analyses)  
- ✅ **Fully Mobile Responsive UI** (TailwindCSS + ShadCN)  

---

## 🛠 Tech Stack  
- **Frontend:** Next.js (React)  
- **State Management:** Context API / Zustand  
- **Styling:** TailwindCSS + ShadCN  
- **Authentication:** JWT-based auth  
- **API Integration:** Fetching data from Flask backend  
- **Deployment:** Vercel  

⚡ Installation & Setup
1️⃣ Clone the Repository

git clone https://github.com/yourusername/text-sentiment-analysis-frontend.git
cd text-sentiment-analysis-frontend
2️⃣ Install Dependencies

npm install
3️⃣ Configure Environment Variables
Create a .env.local file in the root directory and add:

NEXT_PUBLIC_API_URL=http://localhost:5001  # Flask backend URL
4️⃣ Run the Project Locally

npm run dev
Your app will run at http://localhost:3000 🚀
