const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const bodyParser = require("body-parser");

// express app
const app = express();

//Establishing mongoose
const DATABASE_URL = "mongodb://127.0.0.1:27017/08th-March";
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// // Establish Connection
mongoose.connect(DATABASE_URL, CONFIG);

//
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"));

// register view engine
app.set("view engine", "ejs");

// Middleware
// app.use(morgan("tiny")); //logging
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use("/static", express.static("static"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//////
// routes
//rendering create page with form

//route file routes
app.use("/blogs", blogRoutes);

//server listener
const PORT = 3007;
app.listen(PORT, console.log("Server start for port: " + PORT));
