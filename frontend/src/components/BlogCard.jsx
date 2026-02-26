import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await API.delete(`/blogs/${blog._id}`);
      toast.success("Blog deleted successfully ✅", {
        autoClose: 5000,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);

      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("You are not authorized to delete this blog ❌");
        navigate("/");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${blog._id}`);
  };

  return (
    <div className="border p-4 rounded shadow bg-white">
      <h2 className="text-xl font-bold">{blog.title}</h2>
      <p className="text-gray-600">{blog.content.slice(0, 80)}</p>
      <p className="text-gray-600 mb-4">
        By {blog.author?.username || "Unknown"}
      </p>

      <div className="mt-4 flex gap-2">
        {/* VIEW */}
        <Link
          to={`/blog/${blog._id}`}
          className="bg-gray-600 text-white px-3 py-1 rounded"
        >
          View
        </Link>

        {/* EDIT */}
        <button
          onClick={handleEdit}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Edit
        </button>

        {/* DELETE */}
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
