const eR = new EventRecommender();
$(document).ready( () => {
    //Load Local Storage
        eR.AllEvents = getLocalStorage("Events"); 
    console.log(eR.AllEvents);
        eR.AllUsers = getLocalStorage("Users");
    console.log(eR.AllUsers);
        let currentUser = getLocalStorage("currentUser");
    console.log(currentUser);
    console.log(localStorage);
    //Home
    loadHome(currentUser);

    //User Management
    $("#all-users").html(showAllUsers(eR.AllUsers));
    $("#add-user").submit(function(event){addAndStoreUsers(event)});
    $("#delete-user").submit(function(event){deleteUsersAndUpdateStorage(event)});

    //Event Management
    $("#all-events").html(showAllEvents(eR.AllEvents));
    setMinMaxDate("#add-event-date");//setting Min and Max input for Date 
    $("#add-event").submit(function(event){addAndStoreEvents(event)});
    $("#delete-event").submit(function(event){deleteEventAndUpdateStorage(event)});

    //Find and Save
    setMinMaxDate("#date-input");//setting Min and Max input for Date 
    $("#date-search").submit(function(event){searchEventsDateAndShowResults(event)});
    $("#category-search").submit(function(event){searchEventsCategoryAndShowResults(event)});
    $("#save-user-event").submit(function(event){saveEventToUserAndUpdateStorage(event, currentUser)});

    //User Account Management
    setupLoginAndLogoutPage(currentUser);
    $("#user-login").submit(function(event){loginUser(event)});
    $("#user-logout").submit(function(){logoutUser(currentUser)});
    $("#delete-user-event").submit(function(event){deleteUserEventAndUpdateStorage(event, currentUser)});

    //Ticket Master
    $("#date-search-tm").submit(function(event){searchTM(event)});
});

function showAllUsers(array){
//put all elements in user array into HTML
    let html = "";
    if(array.length>0){//make sure there is something in array
        $.each(array, function(index, user) {
            html += `<li>${user.userName}</li>`;
        });
    }else{//if there's nothing in array
        html = "There are no users currently." 
    }
    return html;
}

function showAllEvents(array){
//put all elements in event array into HTML
    let html = "";
    if(array.length>0){//make sure there is something in array
        $.each(array, function(index, event) {
            let date = formatTime(event.eventTime);
            html += `<li>${event.eventName}<ul><li>Event Id: ${event.eventId}</li><li>Category: ${event.eventCategory}</li><li>Date: ${date.month}/${date.day+1}/${date.year}</li></ul></li>`;
        });
    }else{//if there's nothing in array
        html = "There are no events currently."
    }
    return html;
    
}

function setLocalStorage(string, arrayObj, addOrDelete){
//setting the local storage
    if(addOrDelete === "add"){//if adding to the local storage
        if(localStorage.getItem(string) !== null){ //if local storage is not null
            let currentLS = JSON.parse(localStorage.getItem(string));//grab current local storage (JSON.parse is to turn local storage back into JSON)
            currentLS = currentLS.concat(arrayObj[arrayObj.length -1]);//combine current local storage array with last element added to the array 
            localStorage.setItem(string, JSON.stringify(currentLS));//setting the local storage to the combined array (JSON.stringify is to turn obj array into a string because local storage stores it as a string)
        }else{//if local storage is empty
           localStorage.setItem(string, JSON.stringify(arrayObj));//add array to local storage
        }
    }else{
        localStorage.setItem(string, JSON.stringify(arrayObj)); 
    };
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
    }
    let dd = date.getDate();//getting date
    if(dd<10){//formatting date if <10
        dd = "0" + dd;
    }
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
    if(currentUser.length === 0){
        $("#user-welcome").html("Hello! Please Log In.");
        $(".link").hide();
    }else{
        $(".link").show();
        $("#user-welcome").html(`Welcome ${currentUser[0].userName}!`);
    };
}

function addAndStoreUsers(event){
    event.preventDefault();//prevent reload on submit
    let userName = $("#add-user-name").val();//grabbing UN from input
    let userPass = $("#add-user-pass").val();//grabbing UP from input
    if(userName.length !== 0 && userPass.length !== 0){ //find if there are no empty inputs
        if(eR.findUserDuplication(userName) === true){ //find if user already exists or not
            $("#user-add-errorMsg").html("Username already exists. Please choose another.");
        }else{
            $("#user-add-errorMsg").html("");//clear any error msg
            eR.addUser(userName, userPass); //adding user
            setLocalStorage("Users",eR.AllUsers, "add"); //storing the new user in local sotrage
            $("#all-users").html(showAllUsers(eR.AllUsers)); //reshow the new users
        }
    }else{
        $("#user-add-errorMsg").html("Please fill out all field(s)!");
    };
}

function deleteUsersAndUpdateStorage(event){
    event.preventDefault();//prevent reload on submit
    let userName = $("#delete-user-name").val();//grabbing UN to delete from input
    if(userName.length !==0){//prevent empty input
       eR.deleteUser(userName);//delete the user
    setLocalStorage("Users",eR.AllUsers, "delete");//storing updated array into local storage
    $("#all-users").html(showAllUsers(eR.AllUsers));//show updated list of users
    }else{
        $("#user-delete-errorMsg").html("Please fill out all field(s)!");
    };
}

function addAndStoreEvents(event){
    $("#event-add-errorMsg").html("");
    event.preventDefault();
    let eventId = $("#add-event-id").val();//grab event id
    let eventCategory = $("#add-event-category").val();//grab category id
    let eventName = $("#add-event-name").val();//grab event name
    let eventTime = $("#add-event-date").val();//grab event date
    if(eventId.length !== 0 && eventCategory.length !== 0 && eventName !== 0 && eventTime !== 0){ //find if there's no empty inputs
        if(eR.findEventIdDuplication(eventId) === true){//find if there is an id duplication
             $("#event-add-errorMsg").html("Id already exists. Please choose another.");
        }else if(eR.findEventNameDuplication(eventName) === true){//find if there is a name duplication
            $("#event-add-errorMsg").html("Name already exists. Please choose another.");
        }else{
            eR.addEvent(eventId, eventCategory, eventName, eventTime);//add event
            setLocalStorage("Events",eR.AllEvents, "add");//storing data into local storage
            $("#all-events").html(showAllEvents(eR.AllEvents));//show updated list of events
        }
     }else{
        $("#event-add-errorMsg").html("Please fill out all field(s)!");
    };
}

function deleteEventAndUpdateStorage(event){
    event.preventDefault();//prevent reload on submit
    let eventId = $("#delete-event-id").val();//grab event id
    if(eventId.length !== 0){//find if input is not empty
        eR.deleteEvent(eR.AllEvents, eventId);//delete event
        setLocalStorage("Events", eR.AllEvents, "delete");//storing updated array into local storage
        $("#all-events").html(showAllEvents(eR.AllEvents));//show updated list of events
    }else{
        $("#event-delete-errorMsg").html("Please fill out all field(s)!");
    };
}

function searchEventsDateAndShowResults(event){
    $("#date-search-errorMsg").html("");//clear error msg
    event.preventDefault();//prevent reload on submit
    let date = $("#date-input").val();//grab date
    if(date.length !== 0){//find if input is empty
        $("#date-search-results").html(showAllEvents(eR.findEventsByDate(date)));//show results
    }else{//if input date is empty
        $("#date-search-errorMsg").html("Please fill out all field(s)!");
    };
}

function searchEventsCategoryAndShowResults(event){
    $("#category-search-errorMsg").html("");//clear error msg
    event.preventDefault();//prevent reload on submit
    let category = $("#category-input").val();//grab category
    if(category.length !== 0){//find if input is empty
        $("#category-search-results").html(showAllEvents(eR.findEventsbyCategory(category)));
    }else{//if input is empty
        $("#category-search-errorMsg").html("Please fill out all field(s)!");
    }
}

function saveEventToUserAndUpdateStorage(event, currentUser){
    $("#user-saved-events").html("");//reset user display
    $("#save-errorMsg").html("");//reset any error msg
    event.preventDefault();//prevent reload on submit
    let userName = $("#save-user-name").val();//grab username
    let eventId = $("#save-event-id").val();//grab event Id
    eR.saveUserEvent(userName, eventId);//saving event to user
    setLocalStorage("Users",eR.AllUsers, "User Update");//update local storage
    let userData = eR.findUserData(userName);
    if(userName.toUpperCase() === currentUser[0].userName.toUpperCase()){
        currentUser = userData;
        setLocalStorage("currentUser",userData,"update");
    }
    $("#user-saved-events").html(`${userName}: <ul>${showAllEvents(userData[0].userEvents)}</ul>`);//display user data
}

function setupLoginAndLogoutPage(currentUser){
    if(currentUser.length === 0){
        $("#manage-user-events").hide();
        $("#logout").hide(); 
    }else{
        $("#login").hide();
        $("#logout").show();
        $("#user-data").html(`<h4>Hello ${currentUser[0].userName}!</h4><ul>${showAllEvents(currentUser[0].userEvents)}</ul>`);//print userdata
            if(currentUser[0].userEvents.length>0){
                $("#manage-user-events").show();
            }else{
                $("#manage-user-events").hide();
            }
    };
}

function loginUser(event){
    $("#user-login-errorMsg").html("");
    event.preventDefault();//prevent reload on submit
    let UN = $("#user-name").val();
    let Pass = $("#user-pass").val();
    if(UN.length !== 0 && Pass.length !== 0){//no empty input
        let userData = eR.findUserData(UN);
        if(userData.length !== 0){//seeing if user exists in array
            if(userData[0].userPass === Pass){//checking if password match
                setLocalStorage("currentUser",userData,"add");//add current user to local storage
                location.reload();
            }else{//if password doesn't match
                $("#user-login-errorMsg").html("Incorrect password");
            }
        }else{//if user doesn't exist
            $("#user-login-errorMsg").html("Please enter a valid username");
        }
    }else{//if no input
        $("#user-login-errorMsg").html("Please fill out all field(s)!");
    };
}

function logoutUser(currentUser){
    currentUser = [];
    setLocalStorage("currentUser", currentUser, "delete");
}

function deleteUserEventAndUpdateStorage(event, currentUser){
    event.preventDefault();//prevent reload on submit
    let eventId = $("#delete-user-event-id").val();//grab event id to delete
    eR.deleteEvent(currentUser[0].userEvents, eventId);//delete current's user event
    setLocalStorage("currentUser",currentUser,"delete");//replace local storage current user data
    let userIndex = eR.AllUsers.findIndex(userN => userN.userName.toUpperCase() === currentUser[0].userName.toUpperCase());//get index of current user
    eR.AllUsers[userIndex].userEvents = currentUser[0].userEvents; //replace AllUser's data of logged in user with current user variable
    setLocalStorage("Users",eR.AllUsers, "User Update");//replace updated AllUser array to local storage
    $("#user-data").html(`<h4>Hello ${currentUser[0].userName}!</h4><ul>${showAllEvents(currentUser[0].userEvents)}</ul>`);//print userdata
    if(currentUser[0].userEvents.length>0){
        $("#manage-user-events").show();
    }else{
        $("#manage-user-events").hide();
    };
}

function createTM_API_URL(fieldInput, inputValue){
    const base_URL ="https://app.ticketmaster.com/discovery/v2/events.json?";
    let end_URL = `&${fieldInput}=${inputValue}&countryCode=US&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`;
    return base_URL+end_URL;
}

function callAPI(URL, fieldId){
        $.ajax({
        type:"GET",
        url: URL,
        async:true,
        dataType: "json", //get data back as json
        success: function(json) {
            let arrayOfTMEvents = []//creating empty array to put event objs
            json._embedded.events.forEach(element => { //looping through the json event array
                let tmEvent = new Event(element.id, element.classifications[0].genre.name, element.name, element.dates.start.localDate)//storing json data in Event obj
                arrayOfTMEvents.push(tmEvent);//pushing created event obj into array
            });
            setLocalStorage("TM_Arrays", arrayOfTMEvents, "tempStore");//storing created event obj array in our local storage to get it out of the ajax call since ajax can't return 
        },
        error: function(xhr, status, err) {
            $(`#${fieldId}-search-errorMsg-tm`).html( `Code: ${status} Oh no! There was an issue with Ticket Master :(`)
                 }
      });
}

function searchTM(event){
    event.preventDefault();//prevent reload on submit
    let targetSearch = event.target.id.split("-")[0];//grab field being entered
    let targetInputVal = $(`#${targetSearch}-input-tm`).val();//grabbing input value
    let URL_created = "";
    if(targetSearch === "date"){
        targetInputVal = new Date(targetInputVal).toISOString();//converting date to UTC time
        targetInputVal = targetInputVal.slice(0,targetInputVal.length-5)+targetInputVal.slice(targetInputVal.length-1)//reformating to TM format(no millisec)
        URL_created = createTM_API_URL("startDateTime", targetInputVal);
    }
    callAPI(URL_created,targetSearch);
    console.log(localStorage);
    
}

