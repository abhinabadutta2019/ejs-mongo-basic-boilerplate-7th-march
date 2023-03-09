const express = require("express");
const { findByIdAndUpdate } = require("../model/blog");
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
  // //get blogs
  // const blogs = await Blog.find({});
  //sort by likes
  const blogs = await Blog.find().sort({ likes: -1 });
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
    console.log(req.body);
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

// form single page

router.post("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // const blog = await Blog.findById(
    //   { _id: id }
    //   //   { $set: { title: "Naomi" } }
    // );
    const uptitle = req.query.title;
    const upbody = req.query.body;

    await Blog.findOneAndUpdate(
      { _id: id },
      { $set: { title: uptitle, body: upbody } }
    );
    //getting id- with split method from this
    //http://localhost:3007/blogs/update/640a1eab6a523c2597bdfb97?title=a&body=a
    console.log(req.url.split("/")[2].split("?")[0]);
    // console.log(uptitle, upbody);
    res.send(id);
  } catch (e) {
    console.log(e);
  }
});

//open single page
router.post("/single", async (req, res) => {
  try {
    res.send();
  } catch (e) {
    console.log(e);
  }
});

//dislike
router.put("/blogDislike", async (req, res) => {
  try {
    const id = req.query.id;
    //dislike
    await Blog.findOneAndUpdate(
      { _id: id },
      { $inc: { likes: -1 } },
      { new: true }
    );
    res.send();
  } catch (e) {
    console.log(e);
  }
});

//quary params (kutti)
router.patch("/blogLikeQueryParams", async (req, res) => {
  try {
    const id = req.query.id;
    const blog = await Blog.findOneAndUpdate(
      { _id: id },
      { $inc: { likes: 1 } }
    );
    res.send("HI");
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
