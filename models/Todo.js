
const mongoose = require('mongoose');

// creating a model/schema for how our data is being stored in mongoDB
// data is a title, some content and a date 
const TodoSchema = new mongoose.Schema({
title: {
type: String, 
required: true //this means that the input field has to filled in
},
content: {
type: String,
required: true
},
date: {
type: String,
required: true
},
done: {
type: Boolean, 
default: false
}
})
//exporting to make the schema public and accessible ouside of this module
module.exports = mongoose.model('Todo',TodoSchema);
