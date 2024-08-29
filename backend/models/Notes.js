const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  title: { type: String, required: true },
  description: { type: String },
  tag: { type: String, default:'Public' },
  date: { type: Date, default: Date.now() },
  lastUpdate: { type: Date },
});

const Notes = mongoose.model("Notes", NotesSchema);
(module.exports = Notes), NotesSchema;
