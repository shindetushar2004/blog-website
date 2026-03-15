import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleBlog, updateBlog } from "../services/api";
import { toast } from "react-toastify";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateBlog(id, { title: blog.title, content: blog.content });
      toast.success("Blog updated successfully ✅");
      navigate("/");
    } catch (err) {
      if (err.message === "Not authorized") {
        toast.error("You are not authorized to edit this blog ❌");
        navigate("/");
      } else {
        toast.error("Update failed ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start sm:items-center px-4 py-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Blog</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            placeholder="Blog title"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />

          <textarea
            value={blog.content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
            placeholder="Write your content..."
            rows="8"
            className="w-full p-3 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-sm font-medium disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
