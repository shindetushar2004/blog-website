import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ✅ Add token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// BLOG APIs
export const fetchBlogs = () => API.get("/blogs"); // Get all blogs
export const fetchMyBlogs = () => API.get("/blogs/me"); // Logged-in user's blogs
export const getSingleBlog = (id) => API.get(`/blogs/${id}`); // Single blog
export const createBlog = (data) => API.post("/blogs/create", data); // Create blog
export const updateBlog = (id, data) => API.put(`/blogs/${id}`, data); // Update blog
export const deleteBlog = (id) => API.delete(`/blogs/${id}`); // Delete blog

// AUTH APIs
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

export default API;
