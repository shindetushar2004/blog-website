import { useEffect, useState } from "react";
import { fetchBlogs } from "../services/api";
import BlogCard from "../components/BlogCard";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        setBlogs(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  const handleDelete = (deletedId) => {
    setBlogs((prev) => prev.filter((b) => b._id !== deletedId));
  };

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "#6b7280" }}>Loading blogs...</p>
      </div>
    );

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 16px" }}>
      <h1
        style={{
          fontSize: "1.8rem",
          fontWeight: "bold",
          marginBottom: "24px",
          color: "#1f2937",
        }}
      >
        All Blogs
      </h1>

      {blogs.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280", padding: "80px 0" }}>
          No blogs found
        </p>
      ) : (
        <>
          {/* ✅ Inline style grid — Tailwind CDN pe depend nahi */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
            className="blog-grid"
          >
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} onDelete={handleDelete} />
            ))}
          </div>

          {/* Responsive override */}
          <style>{`
            @media (max-width: 1024px) {
              .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 600px) {
              .blog-grid { grid-template-columns: repeat(1, 1fr) !important; }
            }
          `}</style>
        </>
      )}
    </div>
  );
};

export default Home;
