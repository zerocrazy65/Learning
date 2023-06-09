//link with database
const slugify = require("slugify");
const Blogs = require("../models/blogs");
const { v4: uuidv4 } = require("uuid");

// Save data
exports.create = async (req, res) => {
   const { title, content, author } = req.body;
   let slug = slugify(title);
   if (!slug) slug = uuidv4();

   //? validate data
   switch (true) {
      case !title:
         return res.status(400).json({ error: "please enter a title" });
         break;
      case !content:
         return res.status(400).json({ error: "please enter a content" });
         break;
   }
   //? save data
   Blogs.create({ title, content, author, slug })
      .then((blog) => {
         res.json(blog);
      })
      .catch((err) => {
         res.status(400).json({ error: err });
      });
};

// get all data
exports.getAllBlogs = (req, res) => {
   Blogs.find({})
      .exec()
      .then((blogs) => {
         res.json(blogs);
      })
      .catch((err) => {
         res.status(400).json({ error: err });
      });
};

// get interested data by slug
exports.singleBlog = (req, res) => {
   const { slug } = req.params;
   Blogs.findOne({ slug })
      .exec()
      .then((blog) => {
         res.json(blog);
      })
      .catch((err) => {
         res.status(400).json({ error: err });
      });
};

//remove blog selected by slug
exports.remove = (req, res) => {
   const { slug } = req.params;
   Blogs.findOneAndRemove({ slug })
      .exec()
      .then((blog) => {
         res.json({ message: "Delete blog successfully" });
      })
      .catch((err) => res.status(400).json({ error: err }));
};

//update blog selected by slug
exports.update = (req, res) => {
   const { slug } = req.params;
   const { title, content, author } = req.body;
   Blogs.findOneAndUpdate({ slug }, { title, content, author }, { new: true })
      .exec()
      .then((blog) => {
         res.json({ message: "Update blog successfully" });
      })
      .catch((err) => res.status(400).json({ error: err }));
};
