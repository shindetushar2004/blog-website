// import { useEffect, useState } from "react";
// import API from "../services/api";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   const [myBlogs, setMyBlogs] = useState([]);

//   useEffect(() => {
//     const fetchMyBlogs = async () => {
//       try {
//         const res = await API.get("/blogs/me"); // Backend me route create karna padega
//         setMyBlogs(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchMyBlogs();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this blog?")) return;
//     try {
//       await API.delete(`/blogs/${id}`);
//       setMyBlogs(myBlogs.filter((b) => b._id !== id));
//     } catch (err) {
//       console.log(err);
//       alert("Error deleting blog");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

//       {myBlogs.length === 0 ? (
//         <p>No blogs found</p>
//       ) : (
//         <div className="grid md:grid-cols-3 gap-6">
//           {myBlogs.map((blog) => (
//             <div key={blog._id} className="border p-4 rounded shadow">
//               <h2 className="font-bold text-xl">{blog.title}</h2>
//               <p className="mt-2">{blog.content.slice(0, 100)}...</p>

//               <div className="mt-4 flex gap-2">
//                 <Link
//                   to={`/edit/${blog._id}`}
//                   className="bg-blue-600 px-3 py-1 text-white rounded hover:bg-blue-700"
//                 >
//                   Edit
//                 </Link>

//                 <button
//                   onClick={() => handleDelete(blog._id)}
//                   className="bg-red-600 px-3 py-1 text-white rounded hover:bg-red-700"
//                 >
//                   Delete
//                 </button>

//                 <Link
//                   to={`/blog/${blog._id}`}
//                   className="bg-gray-600 px-3 py-1 text-white rounded hover:bg-gray-700"
//                 >
//                   View
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [myBlogs, setMyBlogs] = useState([]);
  const navigate = useNavigate();

  // Logged-in user info
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.id);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        // Backend me route /blogs/me return karta hai sirf logged-in user ke blogs
        const res = await API.get("/blogs/me");
        setMyBlogs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMyBlogs();
  }, []);

  // Delete blog
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await API.delete(`/blogs/${id}`);
      // UI update
      setMyBlogs(myBlogs.filter((b) => b._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

      {myBlogs.length === 0 ? (
        <p>No blogs found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {myBlogs.map((blog) => (
            <div key={blog._id} className="border p-4 rounded shadow">
              <h2 className="font-bold text-xl">{blog.title}</h2>
              <p className="mt-2">{blog.content.slice(0, 100)}...</p>

              <div className="mt-4 flex gap-2">
                {/* Buttons sirf tab dikhenge jab author logged-in user ho */}
                {blog.author?._id === user.id && (
                  <>
                    <Link
                      to={`/edit/${blog._id}`}
                      className="bg-blue-600 px-3 py-1 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="bg-red-600 px-3 py-1 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </>
                )}

                <Link
                  to={`/blog/${blog._id}`}
                  className="bg-gray-600 px-3 py-1 text-white rounded hover:bg-gray-700"
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
