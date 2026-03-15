import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleBlog, deleteBlog } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getSingleBlog(id);
        setBlog(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id);
      toast.success("Blog deleted successfully ✅");
      navigate("/");
    } catch (err) {
      toast.error("Failed to delete blog ❌");
    }
  };

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );

  const isAuthor = currentUser?.uid === blog.author?._id;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          {blog.title}
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          By {blog.author?.username || "Unknown"}
        </p>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {blog.content}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm"
          >
            ← Back
          </button>

          {isAuthor && (
            <>
              <button
                onClick={() => navigate(`/edit/${id}`)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition text-sm"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
