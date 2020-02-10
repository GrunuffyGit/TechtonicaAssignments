const eR = new EventRecommender();
$(document).ready( () => {
    //User Management
    $("#all-users").html(showAllUsers(eR.AllUsers));
    $("#add-user").submit(function(event){
        event.preventDefault();
        let userId = $("#add-user-id").val();
        let userName = $("#add-user-name").val();
        eR.addUser(userId, userName);
        $("#all-users").html(showAllUsers(eR.AllUsers));
    });
    $("#delete-user").submit(function(event){
        event.preventDefault();
        let userId = $("#delete-user-id").val();
        eR.deleteUser(userId);
        $("#all-users").html(showAllUsers(eR.AllUsers));
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
        console.log(eR.AllEvents);
        $("#all-events").html(showAllEvents(eR.AllEvents));
    });
    $("#delete-event").submit(function(event){
        event.preventDefault();
        let eventId = $("#delete-event-id").val();
        eR.deleteEvent(eR.AllEvents,eventId);
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
});

function showAllUsers(array){
    let html = "";
    $.each(array, function(index, user) {
        html += `<li id="${index}">${user.user}</li>`;
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

// function setLocalStorage(string,arrayObj){
    
//     localStorage.setItem(string, JSON.stringify(arrayObj));
// }

// function getLocalStorage(string){
//     return JSON.parse(localStorage.getItem(string));
// }