import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // Login ke time user data save karna

  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // ✅ FIXED
  }

  return req;
});

export const fetchBlogs = () => API.get("/blogs");
export const createBlog = (data) => API.post("/blogs/create", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

export default API;
