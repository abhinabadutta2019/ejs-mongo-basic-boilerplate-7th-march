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

//create
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

//get single id
// /blogs + /:id
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("details", { blog: blog });
});

//delete
router.delete("/:id", async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  // res.render("index");
  //redirect to main page
  // const blogs = await Blog.find({});
  // res.render("index.ejs", { blogs: blogs });
  // res.redirect("/blogs");
  res.send();
});

//quary params (kutti)
router.patch("/blogLikeQueryParams", async (req, res) => {
  try {
    const id = req.query.id;
    const blog = await Blog.findOneAndUpdate(
      { _id: id },
      {
        $inc: { likes: 1 },
      }
    );
    res.send("HI");
  } catch (e) {
    console.log(e);
  }
});

//body params (kutti)
router.put("/blogLikeBody", async (req, res) => {
  try {
    console.log(req.body);
    const id = req.body.id;
    const blog = await Blog.findOneAndUpdate(
      { _id: id },
      {
        $inc: { likes: 1 },
      }
    );

    console.log(blog, id);
    res.send();
  } catch (e) {
    console.log(e);
  }
});

//path params( tatai)
router.patch("/:id", async (req, res) => {
  // // res.send(id);
  // const blog = await Blog.findById(req.params.id);
  // // res.render("details", { blog: blog });
  // res.send(blog.id);
  //
  // const id = req.params.id;
  // const like = req.params.likes;
  // const update = { likes: likes + 1 };
  // let doc = await Blog.findByIdAndUpdate(id, update, { returnOriginal: false });
  // res.send();
  //getting single blog by id
  // const blog = await Blog.findById(id);
  //
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: { likes: 1 },
      }
    );
    // res.send();
    res.render("details", { blog: blog });
  } catch (e) {
    console.log(e);
  }
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
