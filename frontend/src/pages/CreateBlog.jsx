import { useState } from "react";
import { createBlog } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createBlog(blog);
      alert("Blog Created Successfully ✅");
      navigate("/");
    } catch (error) {
      console.log(error.message);
      alert("Error while creating blog ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Create New Blog
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          className="w-full p-2 sm:p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={blog.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Write your blog here..."
          rows="6"
          className="w-full p-2 sm:p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={blog.content}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
}
