//Load Local Storage
    let currentUser = getLocalStorage("currentUser");

$(document).ready( () => {
    //Home
    loadHome(currentUser);

    //User Management
    showAllUsers();
    $("#add-user").submit(function(event){addUsers(event)});
    $("#delete-user").submit(function(event){deleteUsers(event)});

    //Event Management
    let getEventsURL = buildDBURL("events");
    showAllEvents(getEventsURL, "#all-events");
    setMinMaxDate("#add-event-date");//setting Min and Max input for Date 
    $("#add-event").submit(function(event){addEvents(event)});
    $("#delete-event").submit(function(event){deleteEvent(event)});

    //Find and Save
    setMinMaxDate("#date-input");//setting Min and Max input for Date 
    $("#date-search").submit(function(event){searchEventsDate(event)});
    $("#category-search").submit(function(event){searchEventsCategory(event)});
    $("#save-user-event").submit(function(event){saveEventToUser(event)});

    //User Account Management
    setupLoginAndLogoutPage(currentUser);
    $("#user-login").submit(function(event){loginUser(event)});
    $("#user-logout").submit(function(){logoutUser()});
    $("#delete-user-event").submit(function(event){deleteCurrentUserEvent(event)});

    //Ticket Master
    $("#date-search-tm").submit(function(event){searchTM(event)});
    $("#keyword-search-tm").submit(function(event){searchTM(event)});
    $("#save-user-event-tm").submit(function(event){saveEventToUserTM(event)});
});

function buildDBURL(string, paramVal){
//building URL to call to DB APIs
    let baseURL = "http://localhost:3000/";
    let endURL = "";
    if(string === "users" ){
        endURL = "users/";
    }else if(string === "events"){
        endURL = "events/";
    };
    if(typeof paramVal !== "undefined"){
        endURL += `${paramVal}/`;
    };
    return baseURL + endURL;
}

function callDB_API(callType, URL, callbackfunction, callbackParam){
//generic call to a URL with a callback function and a param to pass for the callback func
    $.ajax({
        type: callType,
        url: URL,
        async: false,
        dataType: "json", //get data back as json
        success: function(json) {
            if(typeof callbackfunction !== "undefined"){
                if(typeof callbackParam !== "undefined"){//to allow param as an optional
                    callbackfunction(callbackParam, json);
                }else{
                    callbackfunction(json);
                };
            };
        }
    });
}

function sendDB_API(callType, URL, dataToSend, callbackfunction, callbackParam){
//generic call to URL and send data with a callback function and a param to pass
    $.ajax({
        type: callType,
        url: URL,
        async: false,
        dataType: "json", //get data back as json
        data: dataToSend,
        success: function(json) {
            if(typeof callbackfunction !== "undefined"){
                if(typeof callbackParam !== "undefined"){//to allow param as an optional
                    callbackfunction(callbackParam, json);
                }else{
                    callbackfunction(json);
                };
            };
        }
    });
}

function setupHTMLShowAllUsers(array){
//put all elements in user array into HTML
    let html = "";
    if(array.length>0){//make sure there is something in array
        $.each(array, function(index, user) {
            html += `<li>${user.name}</li>`;
        });
    }else{//if there's nothing in array
        html = "There are no users currently." 
    };
    $("#all-users").html(html);
}

function showAllUsers(){
//show all users on html
    let getUserURL = buildDBURL("users");
    callDB_API("GET", getUserURL, setupHTMLShowAllUsers);
}

function setupHTMLShowAllEvents(location, array){
//put all elements in event array into HTML
    let html = "";
    if(array.length>0){//make sure there is something in array
        if(typeof array[0].events !== "undefined"){//for nested events (when calling for user events)
            $.each(array[0].events, function(index, event) {//looping through array
                let date = formatTime(event.time);
                html += `<li class="list-of-events">${event.name}<ul class="event-info"><li>Event Id: ${event.id}</li><li>Category: ${event.category}</li><li>Date: ${date.month}/${date.day}/${date.year}</li></ul></li><br>`;
            });
        }else{//calling general events
            $.each(array, function(index, event) {//looping through array
                let date = formatTime(event.time);
                html += `<li class="list-of-events">${event.name}<ul class="event-info"><li>Event Id: ${event.id}</li><li>Category: ${event.category}</li><li>Date: ${date.month}/${date.day}/${date.year}</li></ul></li><br>`;
            });
        };
    }else{//if there's nothing in array
        html = "There are no events currently."
    };
    $(location).html(html);
}

function showAllEvents(URL, location){
//show all events on html
    callDB_API("GET", URL, setupHTMLShowAllEvents, location);
}

function setLocalStorage(string, arrayObj){
//setting the local storage
    localStorage.setItem(string, JSON.stringify(arrayObj)); 
}

function getLocalStorage(string){
//getting local storage
    if(localStorage.getItem(string) !== null){//if local storage is not null
        return JSON.parse(localStorage.getItem(string));//returning obj array of local stoarage (JSON.parse is to turn local storage back into JSON because local storage stores it as a string)
    }else {//if local storage is empty
        return [];//return an empty array
    };
}
function formatTime(inputDate){
//returning an obj with time elements to format time
    let date = new Date(inputDate);
    let mm = date.getMonth() + 1;//getting month add 1 because Jan is 0
    if(mm<10){ //formatting month if <10
        mm = "0" + mm;
    };
    let dd = date.getDate();//getting date
    if(dd<10){//formatting date if <10
        dd = "0" + dd;
    };
    let yyyy = date.getFullYear(); //getting year
    return{
        "year" :yyyy,
        "month" : mm,
        "day": dd
    };
}

function setMinMaxDate(inputDateId){
//setting Min and Max days for a given HTML element ID
    let time = new Date();
    time = formatTime(time);
    $(`${inputDateId}`).attr("min", `${time.year}-${time.month}-${time.day}`);//setting min date to enter(today's date)
    $(`${inputDateId}`).attr("max", `${time.year+1}-${time.month}-${time.day}`);//setting max date to enter(a year after today's date)
}

function loadHome(currentUser){
//loading the home page
    if(currentUser.length === 0){//checking if a user is logged in
        $(".link").hide();
    }else{//if there is a user logged in
        $(".link").show();
        $("#user-welcome").html(`Welcome ${currentUser.name}!`);
    };
}

function updateUserEvent(updateEventObj, json){
//updating the user with new event array
    let updateUserEventURL = buildDBURL("users", json[0].id); 
    sendDB_API("PUT", updateUserEventURL, updateEventObj);
}

function updateCurrentUser(json){
//updating the current user information in the local storage
    userData = {
    "name": json[0].name,
    "events": json[0].events
    };
    setLocalStorage("currentUser",userData);
}

function addUsers(event){
//adding user to the db
//search db if there is an user duplication and if there isn't then post to userobj to the db
    event.preventDefault();//prevent reload on submit
    let userName = $("#add-user-name").val();//grabbing UN from input
    userName = userName.toUpperCase();
    let userPass = $("#add-user-pass").val();//grabbing UP from input
    if(userName.length !== 0 && userPass.length !== 0){ //find if there are no empty inputs
        let userObj = {//creating userobj for callback function to pass as body when posting to api
            "name": userName,
            "password": userPass
        };
        function findUserDuplication(dataJson){
        //checking results of searching the db if username is already taken
            if(dataJson.length !== 0){ //if user already exists or not
                $("#user-add-errorMsg").html("Username already exists. Please choose another.");
            }else{//if username is not taken
                $("#user-add-errorMsg").html("");//clear any error msg
                let createUserURL = buildDBURL("users");//building url to hit to create a user
                sendDB_API("POST", createUserURL, userObj);//posting to the endpoint passing the userobj to build json body
            };
        };
        let findUserURL = buildDBURL("users", userName); //building url to search the db
        callDB_API("GET", findUserURL, findUserDuplication);//searching the db and passing findUserDuplication as callback func
        showAllUsers();
    }else{
        $("#user-add-errorMsg").html("Please fill out all field(s)!");
    };
}

function deleteUsers(event){
//deleting users from db
//searching db for userid and calling db to delete user with id
    event.preventDefault();//prevent reload on submit
    let userName = $("#delete-user-name").val();//grabbing UN to delete from input
    if(userName.length !==0){//prevent empty input
        function deleteUserWithId(json){
        //deleting user after finding user id
            let userIDToDeleteURL = buildDBURL("users", json[0].id);//building url to delete user using user id
            callDB_API("DELETE", userIDToDeleteURL);
        };
        let findUserURL = buildDBURL("users", userName);//building url to search for user using username
        callDB_API("GET", findUserURL, deleteUserWithId);
        showAllUsers();//show updated list of users
    }else{
        $("#user-delete-errorMsg").html("Please fill out all field(s)!");
    };
}

function addEvents(event){
//adding event to the db
//searching if event name already exists in the db and saving the event to db if it doesn't
    event.preventDefault(); //prevent reload on submit
    $("#event-add-errorMsg").html("");
    let eventName = $("#add-event-name").val();//grab event name
    eventName = eventName.toUpperCase();
    let eventCategory = $("#add-event-category").val();//grab category
    eventCategory = eventCategory.toUpperCase();
    let eventTime = $("#add-event-date").val();//grab event date
    if(eventName !== 0 && eventCategory.length !== 0 && eventTime !== 0){ //find if there's no empty inputs
        let eventObj = {//eventobj to pass as body in callback func
            "name": eventName,
            "category": eventCategory,
            "time": eventTime
        };
        function findEventDuplication(dataJson){
        //find event name dplication
            if(dataJson.length !== 0){ //find if event already exists or not
                $("#event-add-errorMsg").html("Event name already exists. Please choose another.");
            }else{
                $("#event-add-errorMsg").html("");//clear any error msg
                let createEventURL = buildDBURL("events");
                sendDB_API("POST", createEventURL, eventObj);
            };
        };
        let findEventURL = buildDBURL("events", eventName);//building url to seach db for event
        callDB_API("GET", findEventURL, findEventDuplication);//searching db if there is event with the name
        let getEventsURL = buildDBURL("events");//search all events in db
        showAllEvents(getEventsURL, "#all-events");//displaying what is in the db for events
    }else{
        $("#event-add-errorMsg").html("Please fill out all field(s)!");
    };
}

function deleteEvent(event){
//deleting the event from the db and deleting the event from all users that has event saved
    event.preventDefault();//prevent reload on submit
    let eventId = $("#delete-event-id").val();//grab event id
    if(eventId.length !== 0){//find if input is not empty
        let eventIDToDeleteURL = buildDBURL("events", eventId);//building url to delete event using event id
        callDB_API("DELETE", eventIDToDeleteURL);//calling db to delete event
        let getEventsURL = buildDBURL("events");//creating url to search all events
        showAllEvents(getEventsURL, "#all-events");//display all events on html page
        let getEventAllUsersURL = buildDBURL("users")+`events/${eventId}`;//build url to search users with event id
        callDB_API("GET", getEventAllUsersURL, deleteEventfromAllUsers);//searching db with users containing the event and passing deleteEventfromAllUsers as a callback func
        function deleteEventfromAllUsers(json){
        //deleting deleted event from all users
            for(i=0; i<json.length; i++){//looping through all the array of users containing the event
                deleteEventFromUser(json[i].name, eventId);//delete or "updating" user's array
            };
        };
    }else{
        $("#event-delete-errorMsg").html("Please fill out all field(s)!");
    };
}

function searchEventsDate(event){
//searching for events with given date
    $("#date-search-errorMsg").html("");//clear error msg
    event.preventDefault();//prevent reload on submit
    let date = $("#date-input").val();//grab date
    if(date.length !== 0){//find if input is empty
        let findEventByTimeURL = buildDBURL("events") + `date/${date}`;
        callDB_API("GET", findEventByTimeURL, setupHTMLShowAllEvents, "#search-results");
    }else{//if input date is empty
        $("#date-search-errorMsg").html("Please fill out all field(s)!");
    };
}

function searchEventsCategory(event){
//searching for events with given category
    $("#category-search-errorMsg").html("");//clear error msg
    event.preventDefault();//prevent reload on submit
    let category = $("#category-input").val();//grab category
    category = category.toUpperCase();
    if(category.length !== 0){//find if input is empty
        let findEventByCategoryURL = buildDBURL("events") + `category/${category}`;
        callDB_API("GET", findEventByCategoryURL, setupHTMLShowAllEvents, "#search-results");
    }else{//if input is empty
        $("#category-search-errorMsg").html("Please fill out all field(s)!");
    };
}

function saveEventToUser(event){
//saving the event to the user
//searching for user id
//seeing if the event already exists in their event array, and if it doesn't, save the event
    $("#user-saved-events").html("");//reset user display
    $("#save-errorMsg").html("");//reset any error msg
    event.preventDefault();//prevent reload on submit
    let userName = $("#save-user-name").val();//grab username
    userName = userName.toUpperCase();
    let eventId = $("#save-event-id").val();//grab event Id
    function findUserToSaveEvent(eventJson){
    //finding the user id to save the event to
        let findUserEventsURL = buildDBURL("users", userName);
        callDB_API("GET",findUserEventsURL, saveUserEvent, eventJson);
    };
    function saveUserEvent(eventJson, userJson){
    //saving the event to the user's event array
        if(userJson[0].events.findIndex(obj => obj.id === eventId.toString())=== -1){//seeing if event already exists inside of user event array
            $("#save-errorMsg").html("");
            let userEventArray = userJson[0].events;//grabbing the user event array from json
            userEventArray.push(eventJson[0]);//pushing new event into the user event array
            let eventObj = {//creating obj to post to the endpoint
                "events": userEventArray
            };
            updateUserEvent(eventObj, userJson);//PUT to the db updating user's event array
            let userEventsURL = buildDBURL("users", userName)+"events";//building url to serch for user
            $("#user-saved-events").html(`${userName}: <ul id="user-saved-event-list"></ul>`);//display user data
            showAllEvents(userEventsURL, "#user-saved-event-list");//display all events from user
            if(userName === currentUser.name){//if updating user is the logged in user, update the local storage
                let findUsersURL = buildDBURL("users", userName);
                callDB_API("GET", findUsersURL, updateCurrentUser);
            };
        }else{
            $("#save-errorMsg").html("User already have the event saved!");
        };
    }
    let findEventURL = buildDBURL("events")+`id/${eventId}`;//build url to search for event
    callDB_API("GET",findEventURL, findUserToSaveEvent);//search for event and passing findUserToSaveEvent as a callback func
}

function setupLoginAndLogoutPage(currentUser){
//set up the login and logout page if there is a user logged in or not
    if(currentUser.length === 0){
        $(".manage-user-events").hide();
        $("#logout").hide(); 
    }else{
        $(".login").hide();
        $("#logout").show();
        $("#user-logged").html(`<h2>Hello ${currentUser.name}!</h2>`);
        $("#user-data").html(`<ul id="user-events"></ul>`);//print username
        let userEventsURL = buildDBURL("users", currentUser.name)+"events";//building url to find all events belonging to the user
        showAllEvents(userEventsURL, "#user-events");//display all events from the user
        if(currentUser.events.length>0){
            $(".manage-user-events").show();
        }else{
            $(".manage-user-events").hide();
        };
    };
}

function loginUser(event){
    $("#user-login-errorMsg").html("");
    event.preventDefault();//prevent reload on submit
    let UN = $("#user-name").val();
    let Pass = $("#user-pass").val();
    if(UN.length !== 0 && Pass.length !== 0){//no empty input
        function checkPassWord(userData){
        //checking for userpass being correct
            if(userData.length !== 0){//seeing if user exists in array
                if(userData[0].password === Pass){//checking if password match
                    userData = {//grabbing data from json to form a userobj
                        "name": userData[0].name,
                        "events": userData[0].events
                    }
                    setLocalStorage("currentUser",userData);//adding userobj to local storage as current user
                    location.reload();
                }else{//if password doesn't match
                    $("#user-login-errorMsg").html("Incorrect password");
                };
            }else{//if user doesn't exist
                $("#user-login-errorMsg").html("Please enter a valid username");
            };
        };
        let findUsersURL = buildDBURL("users", UN.toUpperCase());//building url to find user
        callDB_API("GET", findUsersURL, checkPassWord);//calling db to find user and passing checkPassword as a callback func
    }else{//if no input
        $("#user-login-errorMsg").html("Please fill out all field(s)!");
    };
}

function logoutUser(){
//logging out the user
   localStorage.removeItem("currentUser");
}

function deleteEventFromUser(user, eventId){
//deleting event from user by finding the user id
//passing id to find events
//filter out event to delete and replace user's current events with new array without target event
    function filterOutEvents(eventId, json){
    //filtering out target event from json
        let updatedArray = json[0].events.filter(event => {return event.id != eventId});//get new array w/out target event
        if(updatedArray.length === 0){//if the array is empty
            updatedArray = "[]";//pass a empty array string
        };
        let eventObj = {//creating event obj to pass for body
            "events": updatedArray
        };
        let findUserIDURL = buildDBURL("users", user);//find user id
        callDB_API("GET", findUserIDURL, updateUserEvent, eventObj);//find the userid and pass updateUserEvent as callback func and the eventobj as a param to the callback func
    };
    let findUserEventsURL = buildDBURL("users")+`${user}/events/`;//building url to find user's event
    callDB_API("GET",findUserEventsURL, filterOutEvents, eventId);// searching the db for user's event array
}

function deleteCurrentUserEvent(event){
//deleting event from current user and updating the db
    event.preventDefault();//prevent reload on submit
    let eventId = $("#delete-user-event-id").val();//grab event id to delete
    deleteEventFromUser(currentUser.name, eventId);//delete current's user event in db
    $("#user-data").html(`<ul id="user-events"></ul>`);//print username
    let userEventsURL = buildDBURL("users", currentUser.name)+"events";//find all events belonging to the the user in the db
    showAllEvents(userEventsURL, "#user-events");//display the events
    let findUsersURL = buildDBURL("users", currentUser.name);//building url to find user in db
    callDB_API("GET", findUsersURL, updateCurrentUser);//getting user info and updating the local storage
    if(currentUser.events.length>0){//if localstorage's event array is less than 0
        $(".manage-user-events").show();
    }else{
        $(".manage-user-events").hide();
    };
}

function createTM_API_URL(fieldInput, inputValue){
//creating the url for hitting ticket master
    const base_URL ="https://app.ticketmaster.com/discovery/v2/events.json?";
    let end_URL = `&${fieldInput}=${inputValue}&countryCode=US&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`;
    return base_URL+end_URL;
}

function callTMAPI(URL, fieldId){
    $.ajax({
        type:"GET",
        url: URL,
        async:false,
        dataType: "json", //get data back as json
        success: function(json) {
            let arrayOfTMEvents = []//creating empty array to put event objs
            if(typeof json._embedded.events !== "undefined"){
                json._embedded.events.forEach(element => { //looping through the json event array
                    let tmEvent = {//grabbing the response body data and storing the data needed into an obj
                        "id":element.id, 
                        "name": element.name,
                        "category":element.classifications[0].genre.name,
                        "time": new Date(element.dates.start.localDate)
                    }
                    arrayOfTMEvents.push(tmEvent);//pushing created event obj into array
                });
                setLocalStorage("TM_Array", arrayOfTMEvents);//storing created event obj array in our local storage to get it out of the ajax call since ajax can't return 
            };
        },
        error: function(xhr, status, err) {
            if(typeof fieldId !== "undefined"){
                $(`#${fieldId}-search-errorMsg-tm`).html( `Code: ${status} Oh no! There was an issue with Ticket Master :(`)
            };
        }
    });
}

function searchTM(event){
//searching the ticketmaster using the ticketmaster endpoint
    event.preventDefault();//prevent reload on submit
    setLocalStorage("TM_Array", []);//create an array for tm search results in local storage
    let targetSearch = event.target.id.split("-")[0];//grab field being entered
    let targetInputVal = $(`#${targetSearch}-input-tm`).val();//grabbing input value
    let URL_created = "";
    if(targetSearch === "date"){//if searching using date
        targetInputVal = new Date(targetInputVal).toISOString();//converting date to UTC time
        targetInputVal = targetInputVal.slice(0,targetInputVal.length-5)+targetInputVal.slice(targetInputVal.length-1)//reformating to TM format(no millisec)
        URL_created = createTM_API_URL("startDateTime", targetInputVal);
    }else{//if searching using a different parameter
        URL_created = createTM_API_URL(targetSearch, targetInputVal);
    };
    callTMAPI(URL_created, targetSearch);//calling the endpoint with the usrl created
    let TM_Events = getLocalStorage("TM_Array");//grabbing the infomation stored after the call in local storage
    $(`#search-results-tm`).html(`<ul id="TM_Events_Results"></ul>`);//create html where event will de displayed
    setupHTMLShowAllEvents("#TM_Events_Results",TM_Events);//displaying the events
}

function saveEventToUserTM(event){
//saving the ticketmaster event to the user
    $("#user-saved-events-tm").html("");//reset user display
    $("#save-errorMsg-tm").html("");//reset any error msg
    event.preventDefault();//prevent reload on submit
    let userName = $("#save-user-name-tm").val();//grab username
    userName = userName.toUpperCase();
    let eventId = $("#save-event-id-tm").val();//grab event Id
    let searchEventIdURL = createTM_API_URL("id", eventId);// create url to search for eventid
    callTMAPI(searchEventIdURL);//call tm api and store event into local storage
    let TM_Searched_Event = getLocalStorage("TM_Array");// get event out of local storage
    function saveUserEvent(eventJson, userJson){
    //saving tm event to user in db
        if(userJson[0].events.findIndex(obj => obj.id === eventId.toString())=== -1){//seeing if event already exists inside of user event array
            $("#save-errorMsg").html("");
            let userEventArray = userJson[0].events;//grabbing user's event array from json
            userEventArray.push(eventJson[0]);//pushing the event into user's eent array
            let eventObj = {//creating obj to post to the endpoint
                "events": userEventArray
            };
            updateUserEvent(eventObj, userJson);//PUT to the db updating user's event array
            let userEventsURL = buildDBURL("users", userName)+"events";//building url to serch for user
            $("#user-saved-events").html(`${userName}: <ul id="user-saved-event-list"></ul>`);//display user data
            showAllEvents(userEventsURL, "#user-saved-event-list");//display all events from user
            if(userName === currentUser.name){//if updating user is the logged in user, update the local storage
                let findUsersURL = buildDBURL("users", userName);
                callDB_API("GET", findUsersURL, updateCurrentUser);
            };
        }else{
            $("#save-errorMsg").html("User already have the event saved!");
        };
    };
    let findUserEventsURL = buildDBURL("users", userName);
    callDB_API("GET",findUserEventsURL, saveUserEvent, TM_Searched_Event);
}