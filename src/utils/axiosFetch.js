import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

// axios
const axiosFetch = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosFetch.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    console.log(error.response);
    if (error.response.status === 401) {
      signOut(auth);
    }
    return Promise.reject(error);
  }
);

export default axiosFetch;
