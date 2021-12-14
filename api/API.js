//Our API

//gets express
const express = require("express");
//creating our souter that helps us connect our server to the API
const router = express.Router();
//lifting in the model/schema from the models module
const Todo = require("../models/Todo");
//lifting in the feedback model/schema as well
const Feedback = require("../models/Feedback");               
//const { feedbackEmail } = require("../services/EmailService");    
const { feedbackAddedEmail } = require("../servicesG/EmailServices") 

//NEW TODO
//.post(2 arguments; the endpoint, callbackfunction (holds request and response))
router.post("/newtodo", (req, res) => {
  //logging the request body for testing
  console.log(req.body);
  //creating a variable newTodo that holds our data according to the Todo-model
  //using the req.body to creat a new document
  //todo takes an object (the data) that it will use for creating new todos
  const newTodo = new Todo({
      title: req.body.title,
      content: req.body.content, 
      date: req.body.date,
      done: req.body.done,
  });
  //.save(1 argument: callback for error)
  newTodo.save((err) => {
    if(err){
      //error. sending back a status-code and json object containing msgbody and msgerror
      res
        .status(500)
        .json({
          message: {
          msgBody: "Ann error occured while saving todo",
          msgError: true,
          },
        });
      //if everything goes fine
    } else {
      res
        .status(201)
        .json({
          message: {
          msgBody: "Todo successfully created",
          msgError: false,
        },
      });
    }
  });
});

//GET TODO
//.get(2 arguments; the endpoint, callbackfunction (holding request and response))
router.get("/gettodos", (req, res) => {
  //.find for getting the todo 
  /*.find takes 2 arguments (optionobject that should the empty if we want to get all the data/todos, 
  callback (error, parameter that contains the data being sent back to us fron the DB))*/
  Todo.find({}, (err, documents) => {
    if(err){
      res
        .status(500)
        .json({
          message: {
            msgBody: "An error occured getting todos", 
            msgError: true
          },
        });
      //if nothing goes wrong
    } else {
      //todos holding all the data that comes back from DB
      res.status(200).json({todos: documents});
    }
  });
});

//UPDATE TODO
//.put 2 arguments (the endpoint and the specifik id of the todo, callback function (req,res))
router.put("/updatetodo/:id", (req, res) => {
  //.find (takes 3 arguments) 
    // argument 1: id of the todo that is being edited/updated. using params to get it!
    // argument 2: an object representing the fields that can be updated
    // argument 3: callback function with error as a parameter
  Todo.findByIdAndUpdate(req.params.id, {
    title: req.body.title, 
    content: req.body.content,
    date: req.body.date,
    done: req.body.done,
  }, 
    (err) => {
    if (err) {
      res
        .status(500)
        .json({
          message: {
            msgBody: "An error occured updating todo", 
            msgError: true,
          },
        });
    } else {
      res
        .status(200)
        .json({
          message: {
            msgBody: "Todo successfully update", 
            msgError: false,
          },
        });
    }
  });
});

//DELETE TODO
// works exactly like the update but deletes the todo instead
router.delete("/deletetodo/:id", (req, res) => {
  Todo.findByIdAndDelete(req.params.id, (err) => {
    if(err){
      res
        .status(500)
        .json({
          message: {
            msgBody: "An error occured deleting todo", 
            msgError: true,
          },
        });
    } else {
      res
        .status(200)
        .json({
          message: {
            msgBody: "Todo successfully deleted", 
            msgError: false,
          },
        })
    }
  });
});

router.put("/updatedone/:id", (req, res) => {
  //.find (takes 3 arguments) 
    // argument 1: id of the todo that is being edited/updated. using params to get it!
    // argument 2: an object representing the fields that can be updated
    // argument 3: callback function with error as a parameter
  Todo.findByIdAndUpdate(req.params.id, {
    title: req.body.title, 
    content: req.body.content,
    date: req.body.date,
    done: req.body.done, 
  }, 
    (err) => {
    if (err) {
      res
        .status(500)
        .json({
          message: {
            msgBody: "An error occured updating todo", 
            msgError: true,
          },
        });
    } else {
      res
        .status(200)
        .json({
          message: {
            msgBody: "Todo successfully updated", 
            msgError: false,
          },
        });
    }
  });
});


//****************************FEEDBACK*****************************/         

//SEND FEEDBACK
//.post(2 arguments; the endpoint, callbackfunction (holds request and response))
router.post("/feedback", (req, res) => {
  //logging the request body for testing
  console.log(req.body);
  //creating a new object that holds our document according to the feedback-model
  //using the req.body. to create new documents
  //Feedback takes an object (the data) that it will use for creating new feedback
  const NewFb = new Feedback({
      name: req.body.name,
      email: req.body.email, 
      message: req.body.message,
  });
  //.save(1 argument: callback for error)
  NewFb.save((err) => {
    if(err){
      //error. sending back a status-code and json object containing msgbody and msgerror
      res
        .status(500)
        .json({
          message: {
          msgBody: "Ann error occured while sending feedback",
          msgError: true,
          },
        });
      //if everything goes fine
    } else {
      //and then we send an email to the user
      feedbackAddedEmail(req.body);
      res.status(201).json({
        msgBody: "Feedback has been sent",
        msgError: false,
      })
    }
  });
});


//router is being public and exported outside of this module
//router containes all of the endpoints
module.exports = router;