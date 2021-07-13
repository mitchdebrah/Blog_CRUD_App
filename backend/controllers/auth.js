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