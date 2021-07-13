const router = require("express").Router();
const Blogger = require("../models/Blogger");
const bcrypt = require("bcrypt");

//register
router.post("/register", async (req, res) => {
  try {
    const genSlt = await bcrypt.genSalt(10);
    const hashSalt = await bcrypt.hash(req.body.password, genSlt);
    const newUser = new Blogger({
      username: req.body.username,
      email: req.body.email,
      password: hashSalt,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await Blogger.findOne({ username: req.body.username });
    !user && res.status(400).json({msg:"please enter right credentials"});

    const val = await bcrypt.compare(req.body.password, user.password);
    !val && res.status(400).json({msg:"please enter right credentials"});

    const { password, ...someothers } = user._doc;
    res.status(200).json(someothers);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;