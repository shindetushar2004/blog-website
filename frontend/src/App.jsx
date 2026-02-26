import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import EditBlog from "./pages/EditBlog";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar />

        <div className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Pages */}
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateBlog />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditBlog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />

            <Route path="/blog/:id" element={<BlogDetails />} />
          </Routes>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme="colored"
          style={{ top: "65px", right: "-2px" }}
        />
        <Footer />
      </BrowserRouter>
    </div>
  );
}
