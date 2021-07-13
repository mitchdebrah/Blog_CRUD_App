
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authroute = require("./controllers/auth");
const userroute = require("./controllers/bloggers");
const postsroute = require("./controllers/posts");
const sectionsroute = require("./controllers/sections");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({  //stores images in local storage
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authroute);
app.use("/api/users", userroute);
app.use("/api/posts", postsroute);
app.use("/api/sections", sectionsroute);

app.get('/', (req, res) => {
  res.send('server up')
})
app.listen("3003", () => {
  console.log("Backend is running.");
});



