import express from "express";
import Blog from "../models/Blog.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ✅ GET all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username email");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ CREATE blog
router.post("/create", auth, async (req, res) => {
  try {
    const blog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id,
    });

    const populatedBlog = await blog.populate("author", "username email");
    res.status(201).json(populatedBlog);
  } catch (error) {
    console.log("error:", error.message);
    res.status(500).json({ message: "Error creating blog" });
  }
});

// Get logged-in user's blogs
router.get("/me", auth, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id })
      .populate("author", "username email")
      .sort({
        createdAt: -1,
      });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ DELETE blog
router.delete("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // 🔒 Only author can delete
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "username email",
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ UPDATE blog
router.put("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // 🔒 सिर्फ author ही edit कर सकता है
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Update fields
    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;

    await blog.save();
    const populatedBlog = await blog.populate("author", "username email");
    res.json(populatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
