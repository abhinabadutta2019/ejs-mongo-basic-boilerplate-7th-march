const express = require("express");
const Blog = require("../model/blog");
const router = express.Router();

//Routers
// // get route
// router.get("/", (req, res) => {
//   res.render("index.ejs", { greeting: "Hello" });
// });

// get route
router.get("/", async (req, res) => {
  //get blogs
  const blogs = await Blog.find({});
  //render index.ejs
  res.render("index.ejs", { blogs });
});

//seed route
router.get("/seed", async (req, res) => {
  //delete all existing blogs
  await Blog.deleteMany({});

  //add sample blogs
  await Blog.create([
    { title: "dsf", body: "sdf" },
    { title: "Bggg", body: "Boff" },
    { title: "dsf", body: "sdf" },
  ]);
  //redirect to main page
  res.redirect("/");
});

module.exports = router;
