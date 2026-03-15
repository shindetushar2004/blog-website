import { useState } from "react";
import { registerUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(form);

      // ✅ Register ke baad Firebase auto-login karta hai
      // isliye signOut karke login page pe bhejo
      await signOut(auth);
      localStorage.removeItem("user");

      toast.success("Registration Successful! Please login ✅");
      navigate("/login");
    } catch (err) {
      console.log(err);
      if (err.code === "auth/email-already-in-use") {
        toast.error("Email already registered ❌");
      } else if (err.code === "auth/weak-password") {
        toast.error("Password kam se kam 6 characters ka hona chahiye ❌");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Valid email address daalo ❌");
      } else {
        toast.error("Registration Failed ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-md p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">
          Create account
        </h2>
        <p className="text-gray-500 text-sm mb-6">Join MyBlog today</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full mb-3 p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full mb-3 p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            className="w-full mb-5 p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
