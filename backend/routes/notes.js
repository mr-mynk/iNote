const express = require("express");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "You should add title to your notes."),
    body("description", "Write something to describe."),
    body("tag", "Give your notes a tag."),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const { title, description, tag } = req.body;
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new (require("../models/Notes"))({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json({ Note: savedNote });
    } catch (error) {
      console.log("Error:-    ", error.message);
      res.status(500).send("Internel Server Error Occured.!");
    }
    // console.log('note added to database');
    }
  );

router.get("/userNotes", fetchUser, async (req, res) => {
  try {
    const note = await (require("../models/Notes")).find({ user: req.user.id });
    res.json(note);
  } catch (error) {
    console.log("Error:-    ", error.message);
    res.status(500).send("Internel Server Error Occured.!");
  }
}
);
// console.log('notes fetched from database');

router.put("/updateNote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const updatedNote = {};
    if (title) {
      updatedNote.title = title;
    }
    if (description) {
      updatedNote.description = description;
    }
    if (tag) {
      updatedNote.tag = tag;
    }
    updatedNote.lastUpdate = Date.now();
    let note = await (require("../models/Notes")).findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found.!");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed.!");
    }
    note = await (require("../models/Notes")).findByIdAndUpdate(
      req.params.id,
      { $set: updatedNote },
      { Updated: true }
    );
    res.json({ UpdatedNote: updatedNote });
  } catch (error) {
    console.log("Error:-    ", error.message);
    res.status(500).send("Internel Server Error Occured.!");
  }
  // console.log('note updated to backend');
});

router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    let note = await (require("../models/Notes")).findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found.!");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed.!");
    }
    note = await (require("../models/Notes")).findByIdAndDelete(req.params.id);
    res.json({ "Deleted Note: ": "Successfully.!" });
  } catch (error) {
    console.log("Error:-    ", error.message);
    res.status(500).send("Internel Server Error Occured.!");
  }
  // console.log('note deleted from database');
});

module.exports = router;
