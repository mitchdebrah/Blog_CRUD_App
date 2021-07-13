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

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.somename === req.body.somename) {
      try {
        await post.delete();
        res.status(200).json({msg:"Post deleted..."});
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json({msg:"You can delete only your post!"});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//to get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//for all post
router.get("/", async (req, res) => {
  const somename = req.query.user;
  const sectname = req.query.sect;
  try {
    let someposts;
    if (somename) {
      someposts = await Post.find({ somename });
    } else if (sectname) {
      someposts = await Post.find({
        sections: {
          $in: [sectname],
        },
      });
    } else {
      someposts = await Post.find();
    }
    res.status(200).json(someposts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;