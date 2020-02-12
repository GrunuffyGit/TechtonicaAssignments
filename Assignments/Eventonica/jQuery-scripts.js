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
    
    let todayDate = new Date();
    let mm = todayDate.getMonth() + 1;//getting month add 1 because Jan is 0
    if(mm<10){ //formatting month if <10
        mm = "0" + mm;
    }
    let dd = todayDate.getDate();//getting date
    if(dd<10){//formatting date if <10
        dd = "0" + dd;
    }
    let yyyy = todayDate.getFullYear(); //getting year
    $("#add-event-date").attr("min", `${yyyy}-${mm}-${dd}`);//setting min date to enter(today's date)
    $("#add-event-date").attr("max", `${yyyy+1}-${mm}-${dd}`);//setting max date to enter(a year after today's date)
    
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
            eR.deleteEvent(eventId);//delete event
            setLocalStorage("Events",eR.AllEvents, "delete");//storing updated array into local storage
            $("#all-events").html(showAllEvents(eR.AllEvents));//show updated list of events
        }else{
            $("#event-delete-errorMsg").html("Please fill out all field(s)!");
        }
    });

    //Find and Save
    $("#date-search").submit(function(event){
        event.preventDefault();
        let date = $("#date-input").val();
        $("#date-search-results").html(showAllEvents(eR.findEventsByDate(date)));
    });
    
    $("#category-search").submit(function(event){
        event.preventDefault();
        let category = $("#category-input").val();
        $("#category-search-results").html(showAllEvents(eR.findEventsbyCategory(category)));
    });
    
    $("#category-search").submit(function(event){
        event.preventDefault();
        let userId = $("#save-user-id").val();
        let eventId = $("#save-event-id").val();
        $("#user-save-results").html(showAllEvents(eR.saveUserEvent(userId, eventId)));
    });
    console.log(localStorage);
});

function showAllUsers(array){
    let html = "";
    $.each(array, function(index, user) {
        html += `<li id="${index}">${user.userName}</li>`;
    });
    return html;
}

function showAllEvents(array){
    let html = "";
    $.each(array, function(index, event) {
        html += `<li>${event.eventName}(${event.eventId})</li>`;
    });
    return html;
}

function setLocalStorage(string,arrayObj, addOrDelete){
    if(addOrDelete === "add"){
        if(localStorage.getItem(string) !== null){
            let currentLS = JSON.parse(localStorage.getItem(string));
            currentLS = currentLS.concat(arrayObj[arrayObj.length -1]);
            localStorage.setItem(string, JSON.stringify(currentLS)); 
        }else{
           localStorage.setItem(string, JSON.stringify(arrayObj)); 
        }
    }else{
        localStorage.setItem(string, JSON.stringify(arrayObj)); 
    }
}

function getLocalStorage(string){
    if(localStorage.getItem(string) !== null){
        return JSON.parse(localStorage.getItem(string));
    }else {
        return [];
    }
}