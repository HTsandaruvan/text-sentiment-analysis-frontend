import { jwtDecode } from "jwt-decode"; // ✅ Correct way to import

export const setToken = (token) => {
    console.log("🔑 Setting Token:", token); // ✅ Debug
    localStorage.setItem("token", token);
};
export const getToken = () => localStorage.getItem("token");

export const getUser = () => {
    const token = getToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        console.log("Decoded User:", decoded); // ✅ Debugging
        return decoded;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};


export const logout = () => {
    localStorage.removeItem("token");
};


