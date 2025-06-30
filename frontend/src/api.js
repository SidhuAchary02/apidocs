import axios from "axios";

// Create a pre-configured axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false, // set to true if using cookies
});

export default api;
