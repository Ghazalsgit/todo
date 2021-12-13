
//SERVER - the entrance gate for the application

//lifting in express
const express = require("express");
//calls the express function "express()" and puts new Express application inside the app variable (to start a new Express application)
const app = express();
//lifting in mongoose.
const mongoose = require("mongoose");
//lifting in in cors 
const cors = require("cors");
//lifting in the router that connects to the api
const router = require("./api/API");
//provides utilities for working with file and directory paths
const path = require("path");                           
//the env file
require("dotenv").config();

//different MIDDLEWEARS that are "activated" in order when a request is made ??? engelskan?
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(express.static(path.join(__dirname, "client")));

//setting up the connection to the database (mongo db) through mongoose
//.connect (3 arguments)
mongoose.connect(
  //1: connectionstring(can find on mongo db website,including the password),
  process.env.MONGODB_URI,
  //2: optionsobject: has 3 properties (booleans) that are needed for the db to function 
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true}, 
  //3: callback that will logg the message when connected to db
  () => console.log("Connected to db")
);

//When hosting your application on another service, your host may independently configure the process.env.PORT variable for you
//dynamic hosting environment 
const PORT = process.env.PORT;

//the server is open and listening to requests at the PORT. ????  
//.listen (2 arguments; port, callbackfunction (logging message when connecting successfully))
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));