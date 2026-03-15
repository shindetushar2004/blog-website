import { Link, useNavigate } from "react-router-dom";
import { deleteBlog } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const BlogCard = ({ blog, onDelete }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const isAuthor = currentUser?.uid === blog.author?._id;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(blog._id);
      toast.success("Blog deleted successfully ✅");
      // ✅ reload nahi — parent ko batao ki ye blog remove karo
      if (onDelete) onDelete(blog._id);
    } catch (err) {
      console.log(err);
      toast.error("You are not authorized ❌");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {blog.title}
        </h2>
        <p className="text-gray-500 text-sm line-clamp-3">{blog.content}</p>
        <p className="text-gray-400 text-xs mt-3">
          By {blog.author?.username || "Unknown"}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          to={`/blog/${blog._id}`}
          className="bg-gray-700 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-gray-800 transition"
        >
          View
        </Link>
        {isAuthor && (
          <>
            <button
              onClick={() => navigate(`/edit/${blog._id}`)}
              className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
