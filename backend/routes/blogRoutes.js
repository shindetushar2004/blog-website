// router.post("/", auth, async (req, res) => {
//   const blog = await Blog.create({
//     title: req.body.title,
//     content: req.body.content,
//     author: req.user,
//   });
//   res.json(blog);
// });
const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const auth = require("../middleware/auth");

// ✅ GET all blogs (THIS WAS MISSING)
router.get("/", async (req, res) => {
  console.log("api hiiting");
  try {
    const blogs = await Blog.find();
    console.log(blogs);
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ CREATE blog
router.post("/create", auth, async (req, res) => {
  try {
    // const createBlog = await Blog.create({
    //   title: "My New Post",
    //   content: "Happy to share my milestone!",
    //   // author: "6664885r99909999",
    // });
    const blog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user,
    });
    await createBlog.save();
    console.log("API run fine");
    // res.json(createBlog);
  } catch (error) {
    console.log("error: ", error.message);
    res.status(500).json({ message: "Error creating blog" });
  }
});
console.log("Auth:", auth);
module.exports = router;
