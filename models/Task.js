const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({    
  text: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Task = mongoose.model('task', TaskSchema);
