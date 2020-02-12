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
        console.log("userName "+userName);
        let userPass = $("#add-user-pass").val();//grabbing UP from input
        if(userName.length !== 0 && userPass.length !== 0){ //find if there are no empty inputs
            if(eR.findUserDuplication(userName) === true){ //find if user already exists or not
                $("#user-add-errorMsg").html("Username has been taken. Please choose another.");
            }else{
                $("#user-add-errorMsg").html("");//clear any error msg
                eR.addUser(userName, userPass); //adding user
                setLocalStorage("Users",eR.AllUsers, "add"); //storing the new user in local sotrage
                $("#all-users").html(showAllUsers(eR.AllUsers)); //reshow the new users
                //location.reload();
            }
        }else{
            $("#user-add-errorMsg").html("Please fill out all fields!");
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
            $("#user-delete-errorMsg").html("Please fill out all fields!");
        }
        
    });

    //Event Management
    $("#all-events").html(showAllEvents(eR.AllEvents));
    $("#add-event").submit(function(event){
        event.preventDefault();
        let eventId = $("#add-event-id").val();
        let eventCategory = $("#add-event-category").val();
        let eventName = $("#add-event-name").val();
        let eventTime = $("#add-event-date").val();
        eR.addEvent(eventId, eventCategory, eventName, eventTime);
        setLocalStorage("Events",eR.AllEvents, "add");
        $("#all-events").html(showAllEvents(eR.AllEvents));
    });
    $("#delete-event").submit(function(event){
        event.preventDefault();
        let eventId = $("#delete-event-id").val();
        eR.deleteEvent(eR.AllEvents,eventId);
        setLocalStorage("Events",eR.AllEvents, "delete");
        $("#all-events").html(showAllEvents(eR.AllEvents));
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