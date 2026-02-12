const BlogCard = ({ blog }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
      <p className="text-gray-600 mb-2">{blog.content.substring(0, 100)}...</p>
      <p className="text-sm text-gray-400">By {blog.author}</p>
    </div>
  );
};

export default BlogCard;
