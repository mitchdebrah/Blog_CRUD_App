const router = require("express").Router();
const Blogger = require("../models/Blogger");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const hashSalt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, hashSalt);
    }
    try {
      const userUpdate = await Blogger.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(userUpdate);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json({msg: "update your account only!"});
  }
});

//delet
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await Blogger.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await Blogger.findByIdAndDelete(req.params.id);
        res.status(200).json({msg:"Blogger deleted..."});
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json({msg:"Blogger not found!"});
    }
  } else {
    res.status(401).json({msg:" delete only your account!"});
  }
});

//get user or page user
router.get("/:id", async (req, res) => {
  try {
    const user = await Blogger.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;