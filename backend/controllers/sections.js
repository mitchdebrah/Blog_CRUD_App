const router = require("express").Router();
const Section = require("../models/Section");

router.post("/", async (req, res) => {
  const newSection = new Section(req.body);
  try {
    const sectSaved = await newSection.save();
    res.status(200).json(sectSaved);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
    try {
      const sect = await Section.find();
      res.status(200).json(sect);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;