const router = require("express").Router();
const Blogger = require("../models/Blogger");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const postSaved = await newPost.save();
    res.status(200).json(postSaved);
  } catch (err) {
    res.status(500).json(err);
  }
});

//post update
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.somename === req.body.somename) {
      try {
        const postUpdate = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(postUpdate);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json({msg:"You can update only your post!"});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});