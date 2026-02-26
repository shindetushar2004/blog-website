import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/blogs/${id}`, blog);
      toast.success("Blog updated successfully ✅");
      navigate("/");
    } catch (err) {
      console.log(err);

      // 🔥 If not owner → redirect to home
      if (err.response && err.response.status === 403) {
        toast.error("You are not authorized to edit this blog ❌");
        navigate("/");
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-5 text-center">Edit Blog</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            placeholder="Enter blog title"
            className="border w-full p-2 mb-3 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <textarea
            value={blog.content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
            placeholder="Write your content..."
            rows="6"
            className="border w-full p-2 mb-4 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
