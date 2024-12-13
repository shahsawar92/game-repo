// src/utils/axiosInstance.js
import axios from 'axios';
import { parseCookies } from 'cookies-next';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Check if running in a browser environment
        if (typeof window !== 'undefined') {
            // Client-side: Get token from localStorage
            const token = localStorage.getItem("game_user_token");
            const user = JSON.parse(localStorage.getItem("game_user_data")); // Get user info from localStorage

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            // Append sector_id to the request if user role is 2
            if (user && user.role === 2) {
                const sectorId = user.sector_id;
                // For GET requests, append sector_id to query params
                if (config.method === 'get') {
                    config.params = {
                        ...config.params,
                        sector_id: sectorId,  // Add sector_id to params
                    };
                }
            }
        } else {
            // Server-side: Get token from cookies
            const cookies = parseCookies();
            const token = cookies.kpobit_token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    }
);

// Add response interceptor (optional)
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             // Handle unauthorized access (optional)
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
