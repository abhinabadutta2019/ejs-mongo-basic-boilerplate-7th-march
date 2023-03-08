const express = require("express");
const Blog = require("../model/blog");
const router = express.Router();

//Routers
// // get route
// router.get("/", (req, res) => {
//   res.render("index.ejs", { greeting: "Hello" });
// });

// get route
// /blogs + /
router.get("/", async (req, res) => {
  //get blogs
  const blogs = await Blog.find({});
  //render index.ejs
  res.render("index.ejs", { blogs });
});

//
// /blogs + /create
router.get("/create", (req, res) => {
  res.render("create");
});

// post request
// /blogs + /create
router.post("/create", async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save(req.body);
    //redirect to main page
    res.redirect("/blogs");
  } catch (e) {
    console.log(e);
  }
});

//
// /blogs + /:id
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("details", { blog: blog });
});

//
router.delete("/:id", async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  // res.render("index");
  //redirect to main page
  // const blogs = await Blog.find({});
  // res.render("index.ejs", { blogs: blogs });
  // res.redirect("/blogs");
  res.send();
});

// //seed route
// router.get("/seed", async (req, res) => {
//   //delete all existing blogs
//   await Blog.deleteMany({});

//   //add sample blogs
//   await Blog.create([
//     { title: "dsf", body: "sdf" },
//     { title: "Bggg", body: "Boff" },
//     { title: "dsf", body: "sdf" },
//   ]);
//   //redirect to main page
//   res.redirect("/");
// });

module.exports = router;
