// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../services/api";

// const EditBlog = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     title: "",
//     content: "",
//   });

//   useEffect(() => {
//     const fetchBlog = async () => {
//       const res = await API.get(`/blogs/${id}`);
//       setForm({
//         title: res.data.title,
//         content: res.data.content,
//       });
//     };
//     fetchBlog();
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await API.put(`/blogs/${id}`, form);
//     navigate(`/blog/${id}`);
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10">
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           className="border p-2 rounded"
//         />

//         <textarea
//           value={form.content}
//           onChange={(e) => setForm({ ...form, content: e.target.value })}
//           className="border p-2 rounded h-40"
//         />

//         <button className="bg-blue-500 text-white py-2 rounded">
//           Update Blog
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditBlog;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        setBlog({ title: res.data.title, content: res.data.content });
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/blogs/${id}`, blog);
      alert("Blog updated successfully ✅");
      navigate("/dashboard");
    } catch (err) {
      alert("Error updating blog ❌");
      console.log(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          rows="6"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
