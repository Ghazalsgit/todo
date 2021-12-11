
const mongoose = require('mongoose');

// creating a model/schema for how our data is being created/stored/read in mongoDB
// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const FeedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String, 
    required: true,
  },
});

//exporting to make the schema public and accessible ouside of this module
module.exports = mongoose.model("Feedback", FeedbackSchema);

