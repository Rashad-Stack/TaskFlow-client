import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

// axios
const axiosFetch = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/`,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the Google Auth token to the headers
axiosFetch.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token"); // Replace 'token' with your token key

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    if (error.response.status === 401) {
      signOut(auth);
    }
    return Promise.reject(error);
  }
);

export default axiosFetch;
