import { useEffect, useState } from "react";
import { fetchMyBlogs, deleteBlog } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadMyBlogs = async () => {
      try {
        const data = await fetchMyBlogs();
        setMyBlogs(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id);
      toast.success("Blog deleted ✅");
      setMyBlogs(myBlogs.filter((b) => b._id !== id));
    } catch (err) {
      console.log(err);
      toast.error("Delete failed ❌");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading your blogs...</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
        My Dashboard
      </h1>

      {myBlogs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-4">No blogs found</p>
          <Link
            to="/create"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create your first blog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {myBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between"
            >
              <div>
                <h2 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-gray-500 text-sm line-clamp-3">
                  {blog.content}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {blog.author?._id === currentUser?.uid && (
                  <>
                    <Link
                      to={`/edit/${blog._id}`}
                      className="bg-blue-600 px-3 py-1.5 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="bg-red-600 px-3 py-1.5 text-white text-sm rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </>
                )}
                <Link
                  to={`/blog/${blog._id}`}
                  className="bg-gray-600 px-3 py-1.5 text-white text-sm rounded-lg hover:bg-gray-700 transition"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
