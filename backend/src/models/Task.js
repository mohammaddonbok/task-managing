const  mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
  });
  
  module.exports = mongoose.model("Task", taskSchema);
  
  
 