import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { isLoggedIn } from "../utils/auth";
import { toast } from "react-toastify";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await API.get(`/blogs/${id}`);
      setBlog(res.data);
    };
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?",
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/blogs/${id}`);
      toast.success("Blog deleted successfully ✅");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete blog ❌");
    }
  };

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      <p className="mb-6">{blog.content}</p>
      <p className="text-gray-600 mb-4">
        By {blog.author?.username || "Unknown"}
      </p>
      {isLoggedIn() &&
        blog.author?._id === JSON.parse(localStorage.getItem("user")).id && (
          <div className="flex gap-4">
            <button
              onClick={() => navigate(`/edit/${id}`)}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>

            <button
              onClick={() => navigate("/")}
              className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm"
            >
              ← Back
            </button>
          </div>
        )}
    </div>
  );
};

export default BlogDetail;
