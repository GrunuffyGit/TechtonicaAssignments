const eR = new EventRecommender();
$(document).ready( () => {
    //Load Local Storage
        eR.AllEvents = getLocalStorage("Events"); 
    console.log(eR.AllEvents);
        eR.AllUsers = getLocalStorage("Users");
    console.log(eR.AllUsers);

    //User Management
    $("#all-users").html(showAllUsers(eR.AllUsers));

    $("#add-user").submit(function(event){
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
                //location.reload();
            }
        }else{
            $("#user-add-errorMsg").html("Please fill out all field(s)!");
        } 
    });
    
    $("#delete-user").submit(function(event){
        event.preventDefault();//prevent reload on submit
        let userName = $("#delete-user-name").val();//grabbing UN to delete from input
        if(userName.length !==0){//prevent empty input
           eR.deleteUser(userName);//delete the user
        setLocalStorage("Users",eR.AllUsers, "delete");//storing updated array into local storage
        $("#all-users").html(showAllUsers(eR.AllUsers));//show updated list of users
        }else{
            $("#user-delete-errorMsg").html("Please fill out all field(s)!");
        }
        
    });

    //Event Management
    $("#all-events").html(showAllEvents(eR.AllEvents));
    
    setMinMaxDate("#add-event-date");//setting Min and Max input for Date 

    $("#add-event").submit(function(event){
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
        }
       
    });
    
    $("#delete-event").submit(function(event){
        event.preventDefault();//prevent reload on submit
        let eventId = $("#delete-event-id").val();//grab event id
        if(eventId.length !== 0){//find if input is not empty
            eR.deleteEvent(eR.AllEvents, eventId);//delete event
            setLocalStorage("Events", eR.AllEvents, "delete");//storing updated array into local storage
            $("#all-events").html(showAllEvents(eR.AllEvents));//show updated list of events
        }else{
            $("#event-delete-errorMsg").html("Please fill out all field(s)!");
        }
    });

    //Find and Save
    setMinMaxDate("#date-input");//setting Min and Max input for Date 

    $("#date-search").submit(function(event){
        $("#date-search-errorMsg").html("");//clear error msg
        event.preventDefault();//prevent reload on submit
        let date = $("#date-input").val();//grab date
        if(date.length !== 0){//find if input is empty
            $("#date-search-results").html(showAllEvents(eR.findEventsByDate(date)));//show results
        }else{//if input date is empty
            $("#date-search-errorMsg").html("Please fill out all field(s)!");
        }
    });
    
    $("#category-search").submit(function(event){
        $("#category-search-errorMsg").html("");//clear error msg
        event.preventDefault();//prevent reload on submit
        let category = $("#category-input").val();//grab category
        if(category.length !== 0){//find if input is empty
            $("#category-search-results").html(showAllEvents(eR.findEventsbyCategory(category)));
        }else{//if input is empty
            $("#category-search-errorMsg").html("Please fill out all field(s)!");
        }
    });
    
    $("#save-user-event").submit(function(event){
        $("#user-saved-events").html("");//reset user display
        $("#save-errorMsg").html("");//reset any error msg
        event.preventDefault();//prevent reload on submit
        let userName = $("#save-user-name").val();//grab username
        let eventId = $("#save-event-id").val();//grab event Id
        eR.saveUserEvent(userName, eventId);//saving event to user
        setLocalStorage("Users",eR.AllUsers, "User Update");//update local storage
        $("#user-saved-events").html(`${userName}: <ul>${showAllEvents(eR.findUserData(userName))}</ul>`);//display user data
    });
    console.log(localStorage);
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
            localStorage.setItem(string, JSON.stringify(currentLS));//setting the local storage to the combined array (JSON.stringigy is to turn obj array into a string because local storage stores it as a string)
        }else{//if local storage is empty
           localStorage.setItem(string, JSON.stringify(arrayObj));//add array to local storage
        }
    }else{
        localStorage.setItem(string, JSON.stringify(arrayObj)); 
    }
}

function getLocalStorage(string){
//getting local storage
    if(localStorage.getItem(string) !== null){//if local storage is not null
        return JSON.parse(localStorage.getItem(string));//returning obj array of local stoarage (JSON.parse is to turn local storage back into JSON because local storage stores it as a string)
    }else {//if local storage is empty
        return [];//return an empty array
    }
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