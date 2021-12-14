document.querySelector("#post-wrapper").innerHTML = `<img src="https://zelly.se/wp-content/uploads/2021/06/loading-buffering.gif">`


/********************* POST SECTION START *********************/

//api root
const rootUrl = "http://localhost:5000/api/";
//creates a variable to avoid repeating code when sending data, content-type = specifies sent data type
const requestHeaders = {"Content-type": "application/json",};
//creates a new variable for our response as an empty array
let todos = [];
//get the elements for the new post section                          
const newPostBtn = document.querySelector("#new-todo-btn");          
const newPostOverlay = document.querySelector("#new-todo-overlay");   
//lifting in the container for the message from the HTML file
const messageContainer = document.getElementById("message-container-todo");


//FUNCTION - RESPONSE MESSAGE
//everytime the user makes a request a message will show up
const showResponseMessage = (message) => {
  messageContainer.style.display = "flex"
  //if the request is seccussfully done a green text will show otherwise a red text will show up
  if (message.msgError === true){
    messageContainer.innerHTML = `<p style="color:red;"> <span>&#x274C;</span> ${message.msgBody}</p>`;
  } else{messageContainer.innerHTML = `<p style="color:green;"> <span>&#10003;</span> ${message.msgBody}</p>`;}
  //the message will disappear after 3 seconds
  setTimeout(() => {
  messageContainer.innerHTML = " ";
  messageContainer.style.display = "none"
  }, 3000);
}


//FUNCTION - GET ALL TODOS
const getTodos = async (todos) => {
  //creates a variable for the response
  const res = await fetch(`${rootUrl}gettodos`);
  //takes the response that we get and converts it to js object
  const data = await res.json();
  //collects the data in our array
  todos = data.todos;

  //filter based on if done is true/false and collect the results in two new arrays
  const todosDone = todos.filter(todo => todo.done === true);
  const todosNotDone = todos.filter(todo => todo.done === false);
 
  //render the data in html
  document.querySelector("#post-wrapper").innerHTML = todosNotDone.sort((todo,b)=> (todo.date > b.date ? 1 : -1)) //sort() sorts the todos based on the date
    //mapping out every todo
    .map(                                                             
      (todo) =>
        /*This mapping first renders the content in each todo-post and laso renders the form for update.
        Every element has its own id so that on every click only the specific todo is updated or deleted.
        the id is sent to the function as an argument*/
        //elements for the todo-post
        `<div class="post" id="doneTodo${todo._id}">
          <div class="post-header">
          <div>
            <h3 class='word-break' style="display:none;" id="h-el-${todo._id}">Update</h3>
            <h3 class='word-break' id="h3-el-${todo._id}">${todo.date}</h3>
            <h4 class='word-break' id="h4-el-${todo._id}">${todo.title}</h4>
            </div>
            <div class="post-btn-wrapper">
              <button id='post-btn-1-${todo._id}' class="post-btn" onclick="deleteTodo('${todo._id}')"><i class="fas fa-trash-alt"><span>Delete</span></i></button>
              <button id='post-btn-2-${todo._id}' class="post-btn" onclick="openUpdateTodo('${todo._id}')"><i class="fas fa-edit"><span>Edit</span></i></button>
              <button style="display:none;" id='post-btn-3-${todo._id}' class="post-btn" onclick="closeUpdateTodo('${todo._id}')"><i class="fas fa-times"><span>Close</span></i></button>
            </div>
          </div>
          <div class="content-container">
          <p id="p-el-${todo._id}" style="height:95px;" class="post-txt">${todo.content}</p>
          <button class="done-btn" id="todo-done-${todo._id}" onclick="todoDone('${todo._id}','${todo.title}','${todo.content}','${todo.date}','${todo.done}')">Done</button>
          </div>
         <div style='display:none' id="update-todo-container-${todo._id}" class="update-todo-container">
         <form onsubmit="updateTodo('${todo._id}'); return false;">
         <br><label>Title</label><br>
         <input id="update-todo-'${todo._id}'-title">
         <br><label>Comment</label><br>
         <textarea style="min-height:70px" id="update-todo-'${todo._id}'-content"></textarea>
         <br><label>Date</label><br>
         <input type="date" id="update-todo-'${todo._id}'-date"/>
         <button class='done-btn' type="submit">Update</button>
         </form>
        </div>
        </div>`
    )//the form above this is the form for update that is not displayed until the edit-button is clicked on
    //making the array look like a list without the ,
    .join(""); 

  //render the data in html
  document.querySelector("#post-wrapper2").innerHTML = todosDone.sort((todo,b)=> (todo.date > b.date ? 1 : -1)) //sort() sorts the todos based on the date
    //mapping out every todo
    .map(                                                             
      (todo) =>
        /*This mapping first renders the content in each todo-post and laso renders the form for update.
        Every element has its own id so that on every click only the specific todo is updated or deleted.
        the id is sent to the function as an argument*/
        //elements for the todo-post
        `<div class="post2" id="doneTodo${todo._id}">
        <div class="overlay"><i class="fas fa-check-circle"></i></div>
          <div class="post-header">
          <div>
            <h3 class='word-break' style="display:none;" id="h-el-${todo._id}">Update</h3>
            <h3 class='word-break' id="h3-el-${todo._id}">${todo.date}</h3>
            <h4 class='word-break' id="h4-el-${todo._id}">${todo.title}</h4>
            </div>
            <div class="post-btn-wrapper">
              <button id='post-btn-1-${todo._id}' class="post-btn" onclick="deleteTodo('${todo._id}')"><i class="fas fa-trash-alt"><span>Delete</span></i></button>
              <button id='post-btn-2-${todo._id}' class="post-btn post-btn2" onclick="openUpdateTodo('${todo._id}')"><i class="fas fa-edit"><span>Edit</span></i></button>
              <button style="display:none;" id='post-btn-3-${todo._id}' class="post-btn" onclick="closeUpdateTodo('${todo._id}')"><i class="fas fa-times"><span>Close</span></i></button>
            </div>
          </div>
          <div class="content-container">
          <p id="p-el-${todo._id}" style="height:95px;" class="post-txt">${todo.content}</p>
          <button class="done-btn" id="todo-done-${todo._id}" onclick="todoDone('${todo._id}','${todo.title}','${todo.content}','${todo.date}','${todo.done}')">Undo</button>
          </div>
         <div style='display:none' id="update-todo-container-${todo._id}" class="update-todo-container">
         <form onsubmit="updateTodo('${todo._id}'); return false;">
         <br><label>Title</label><br>
         <input id="update-todo-'${todo._id}'-title">
         <br><label>Comment</label><br>
         <textarea style="min-height:70px" id="update-todo-'${todo._id}'-content"></textarea>
         <br><label>Date</label><br>
         <input type="date" id="update-todo-'${todo._id}'-date"/>
         <button class='done-btn' type="submit">Update</button>
         </form>
        </div>
        </div>`
    )//the form above this is the form for update that is not displayed until the edit-button is clicked on
    //making the array look like a list without the ,
    .join("");

};


//FUNCTION - OPEN TODO MODAL
const openNewTodoModal = () => {
  //shows the new post overlay
  newPostOverlay.style.display = "flex";
};


//FUNCTION - CLOSING NEW POST MODAL
const closeNewTodoModal = () => {
  newPostOverlay.style.display = "none";
}


//FUNCTION - NEW TODO
const newTodo = async () => {
  const title = document.querySelector("#postSubject").value;     
  const content = document.querySelector("#postMessage").value;    
  const date = document.querySelector("#postDate").value;          
  const todo = {
    title,
    content,
    date,
  };
  //while creating a new todo there needs to an options object in addition to the url
  const res = await fetch(`${rootUrl}newtodo`, {
    //(post = create)
    method: "post",
    //the data needs to be converted from javascript to json
    body: JSON.stringify(todo),
    //sending some meta data that is a variable declared at the top
    headers: requestHeaders,
  });
  //a variable that holds the data from the DB and converting it to javascript
  const data = await res.json();
  //updating with all the new todos
  getTodos();
  showResponseMessage(data.message);             
  // emptying the input fields after the todo is created 
  document.querySelector("#postSubject").value = "";        
  document.querySelector("#postMessage").value = "";      
  document.querySelector("#postDate").value = "";    
  closeNewTodoModal();
};


//FUNCTION - OPEN UPDATE 
// when clicked on update/edit the content inside the post/todo is changed 
const openUpdateTodo = (id) => {
  const container = document.getElementById(`update-todo-container-${id}`)
  container.style.display = "flex"
  const h3 = document.getElementById(`h3-el-${id}`)
  h3.style.display = "none"
  const p = document.getElementById(`p-el-${id}`)
  p.style.display = "none"
  const todo_done = document.getElementById(`todo-done-${id}`)
  todo_done.style.display = "none"
  const h4 = document.getElementById(`h4-el-${id}`)
  h4.style.display = "none"
  const btn_2 = document.getElementById(`post-btn-2-${id}`)
  btn_2.style.display = "none"
  const btn_3 = document.getElementById(`post-btn-3-${id}`)
  btn_3.style.display = "flex" 
  const h = document.getElementById(`h-el-${id}`)
  h.style.display = "flex"
  /*setting the value(text inside) of the input fields the same as the value/innerHTML 
  of the todo-post */
  document.getElementById(`update-todo-'${id}'-title`).value = h4.innerHTML
  document.getElementById(`update-todo-'${id}'-content`).value = p.innerHTML
  document.getElementById(`update-todo-'${id}'-date`).value = h3.innerHTML 
}


//FUNCTION - SENDING UPDATE
//this function takes a parameter (id) that is collected from the onclick-event
const updateTodo = async (id) => {
  //getting the values of input fields and setting them to different variables
  const title = document.getElementById(`update-todo-'${id}'-title`).value;           
  const content = document.getElementById(`update-todo-'${id}'-content`).value; 
  const date = document.getElementById(`update-todo-'${id}'-date`).value;
  document.getElementById(`update-todo-'${id}'-title`).innerHTML = document.getElementById(`h4-el-${id}`).value;
  /* if the title,content or date is trufy, change it but if its not set its value to innerHTML 
  that is already set*/                                                                                   
  const todo = {
    title: title ? 
    title 
    : document.getElementById(`h4-el-${id}`).innerHTML, 
    content: content ? 
    content 
    : document.getElementById(`p-el-${id}`).innerHTML, 
    date: date ? 
    date 
    : document.getElementById(`h3-el-${id}`).innerHTML               
  };
  //fetching the URL for updateTodo and setting the method to put(update).
  //converting the data stored in DB to json and converting the data from the DB to javascript
  const res = await fetch(`${rootUrl}updatetodo/${id}`, {
    method: "put",
    body: JSON.stringify(todo),
    headers: requestHeaders,
  });
  const data = await res.json();
  //once again updating the feed with all the new todos
  getTodos();
  showResponseMessage(data.message);
};


//FUNCTION - CLOSE UPDATE
//When clicked the update-design chenges back to normal
const closeUpdateTodo = (id) => {
  document.getElementById(`update-todo-container-${id}`).style.display = "none"
  document.getElementById(`h3-el-${id}`).style.display = "flex"
  document.getElementById(`p-el-${id}`).style.display = "flex"
  document.getElementById(`todo-done-${id}`).style.display = "block"
  document.getElementById(`h4-el-${id}`).style.display = "flex"
  document.getElementById(`post-btn-2-${id}`).style.display = "flex"
  document.getElementById(`post-btn-3-${id}`).style.display = "none"
  document.getElementById(`h-el-${id}`).style.display = "none"
}


//FUNCTION - DELETE
//does the same thing as update-function above but instead of update it deletes the todo 
const deleteTodo = async (id) => {
  const res = await fetch(`${rootUrl}deletetodo/${id}`, {
    //since nothing is being sent to DB, only method is needed(delete)
    method: "delete",
  });
  const data = await res.json();
  getTodos();
  showResponseMessage(data.message);
};


//LISTENERS - FOR POST FUNCTIONS
//when the window has been loaded
window.addEventListener("load", () => {
  //call the function getTodos for printing out all posts
  getTodos();
  //listen for clicks on the new post btn button
  newPostBtn.addEventListener("click", openNewTodoModal);
});

//FUNCTION - MARKED TODO DONE
//the done-button does some changes to the design when clicked on and takes back the changes when clicked again
const todoDone = async (id, title, content, date, done) => {  
  let doneTodo;
  if (done === "false") {
    console.log("if done = " + done)
    doneTodo = {    
      title,
      content,
      date,
      done: true             
    };
  } if (done === "true") {
    console.log("true")
    doneTodo = {    
      title,
      content,
      date,
      done: false             
    };
  }

  const res = await fetch(`${rootUrl}updatedone/${id}`, {
    method: "put",
    body: JSON.stringify(doneTodo),
    headers: requestHeaders,
  });
  const data = await res.json();
  //once again updating the feed with all the new todos
  getTodos();
  showResponseMessage(data.message);
}

/********************* POST SECTION ENDS *********************/



/********************* SEND FEEDBACK SECTION START *********************/

//get the feedback elements
const fbOverlay = document.querySelector("#feedback-overlay");
const fbModal = document.querySelector("#feedback-modal");
const fbConfirmModal = document.querySelector("#feedback-confirmation-modal");
const fbConfirmBody = document.querySelector("#feedback-confirmation-modal-body")


//FUNCTION - OPEN FEEDBACK MODAL
const openFeedbackModal = () => {
  //show the overlay
  fbOverlay.style.display = "flex";
};


//FUNCTION - CLOSE FEEDBACK MODAL
const closeFeedbackModal = () => {
  //hide the overlay
  fbOverlay.style.display = "none";
  //put the display property back to flex so it will be visible next time the modal opens
  fbModal.style.display = "flex";
}


//FUNCTION - FEEDBACK FUNCTION
const sendFeedback = async () => {
  try{
  //collecting inputs
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;
  //testing
  console.log(`Name: ${name},Email: ${email}, Message: ${message}, `)
  //create an object for the input values
  const feedback = {
    name,
    email,
    message,
  };
  //sending to db
  const res = await fetch(`${rootUrl}feedback`, {
    method: "post",
    body: JSON.stringify(feedback),
    headers: requestHeaders,
  });
  //collects response
  const data = await res.json();
  console.log(data);
  //using setTimeOut to display the spinner before the text shows up
  //setTimeout takes two arguments. One function and time in ms before the function should start
  setTimeout( () => {
    //render av thank you message in the html
    fbConfirmBody.innerHTML = '<h2>Thank you for your feedback</h2>';
  }, 2000);
  } catch (err) {
        //show modal
        fbConfirmBody.style.display = "flex";
        //render an error message in the html
        fbConfirmBody.innerHTML = '<h2>Sorry, something went wrong</h2><p>Please try again</p>';
  }
  //clear input fields
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#message").value = "";
};


//FUNCTION - SHOWING THE CONFIRMATION MODAL
const openMessageConfirmation = () => {
  //hide the feedback modal
  fbModal.style.display = "none";
  //show the confirmation modal
  fbConfirmModal.style.display = "flex";
}


//FUNCTION - CLOSING THE CONFIRMATION MODAL
const closeMessageConfirmation = () => {
  //hide feedback confirmation modal
  fbConfirmModal.style.display = "none";
  //put back the loader in the html so that the user doesn´t have to refresh the page
  fbConfirmBody.innerHTML = '<button class="modal-loader"><i class="fa fa-spinner fa-spin"></i></button>';
  //empty the form inputs
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  //TAR BORT SUBJECT
  document.querySelector("#message").value = "";
  //call the closing function
  closeFeedbackModal();
}

/********************* SEND FEEDBACK SECTION ENDS *********************/



/********************* EXTRA FUNCTIONS STARTS *********************/

//FUNCTION - GET THE DAY
const getTheDay = () => {
  let date = new Date().getDate();
  let month = new Date().getMonth();
  let year = new Date().getFullYear();

  let fullDate = ""; 
  //converting the numbers returned to strings with a switch statement
  switch (month) {
    case 0: month = "January"
    break;
    case 1: month = "February"
      break;
    case 2: month = "Mars"
      break;
    case 3: month = "April"
      break;
    case 4: month = "May"
      break;
    case 5: month = "June"
      break;
    case 6: month = "July"
      break;
    case 7: month = "August"
      break;
    case 8: month = "September"
      break;
    case 9: month = "October"
      break;
    case 10: month = "November"
      break;
    case 11: month = "December"
      break;
  }
  fullDate  = `${date} ${month} ${year}`
  document.querySelector("#date-area").innerHTML = fullDate;
}
getTheDay();


//FUNCTION - GET IP ADRESS
/* getting the IP address of the user and storing the lat, lot and location in different variables
the fetchWeather function is a callback function with a parameter/argument that runs when the IP is ready
it also "gets" the variables so that they can be used outside of the scope*/
const getIpAddress = async () => {
  const res = await fetch("https://api.bigdatacloud.net/data/ip-geolocation-with-confidence?ip=83.252.142.225&localityLanguage=sv&key=66aa82018b5f423a8ba41eebc23171d4");
  const data = await res.json();
  const lat = data.location.latitude;
  const lon = data.location.longitude;
  const location = data.location.city;
  fetchWeather(lat, lon, location)
};


//FUNCTION  - GET WEATHER
/* the arguments are lifted in fron the function above. Fetching the weather for the users location
with the help of the IP address*/
async function fetchWeather(lat, lon, location) {
  const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=943e2490589eaf517b3267f3b3bd80fc&units=metric`);
  const data = await res.json();
  const deg = Math.floor(data.main.temp); //returns the largest integer less than or equal to a given number
  document.getElementById("weather-container").innerHTML = `Location: ${location} <br> Temperature: ${deg} °C`;
}
getIpAddress();


/********************* EXTRA FUNCTIONS ENDS *********************/