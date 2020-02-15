class User{
    constructor(userName, userPass){
        this.userName = userName;
        this.userPass = userPass;
        this.userEvents = [];
    }
}

class Event{
    constructor(eventId, eventCategory, eventName, eventTime){
        this.eventId = eventId;
        this.eventCategory = eventCategory;
        this.eventName = eventName;
        this.eventTime = eventTime;
    }
}

class EventRecommender {
    constructor() {
    // All main properties should go here.
        this.AllEvents = [];
        this.AllUsers = [];
    }

    addEvent(eventId, eventCategory, eventName, eventTime) {
    // Adds a new Event to the System
        const convertDate = new Date(eventTime);
        //converting Date
        const eventObj = new Event(eventId, eventCategory.toUpperCase(), eventName, convertDate);
        //create new event obj using event class
        this.AllEvents.push(eventObj);
        //adding the new event obj into the event array
    }

    addUser(userName, userPass) {
    // Adds a new User to the System
        const userObj = new User(userName, userPass);
        //create new user obj using user class
        this.AllUsers.push(userObj);
        //adding new user obj to user array
    }

    saveUserEvent(userName, eventId){
    // Allow users to save events to a personal Events array.
        const eventToAdd = this.AllEvents.find(eventN => eventN.eventId === eventId);
        //finding the event obj in the event array and storing it into a variable
        const userIndex = this.AllUsers.findIndex(userN => userN.userName.toUpperCase() === userName.toUpperCase());
        //finding the user's obj index in the users obj array 
        this.AllUsers[userIndex].userEvents.push(eventToAdd);
        //pushing the event obj into the user's obj's event array by using the found index of the user's obj in AllUsers array
    }

    deleteUser(userName) {
    // Deletes a User from the system
    userName = userName.toUpperCase();
        let userIndex = this.AllUsers.findIndex(userN => userN.userName.toUpperCase() === userName);
            // let userIndex = "";
            // for(let i=0; i<this.AllUsers.length;i++){
            //     if(this.AllUsers[i].userName === userName){
            //         userIndex = i;
            //     }
            // }
        //finding the user's obj index in the user obj array
        if(userIndex > -1){
        //if userId exist
            this.AllUsers.splice(userIndex, 1);
            //removing 1 element starting from userIndex #
        }
    }
   
    deleteEvent(array, eventId) {
    // Deletes the Event from any event array
        let eventIndex = array.findIndex(eventN => eventN.eventId === eventId);
        //finding the event obj index in the event obj array
        if(eventIndex > -1){
        //if userId exist
        array.splice(eventIndex, 1);
            //removing 1 element starting from eventIndex #
        }
    }

    findEventsByDate(date){
    // Returns all events on a given date
        let availableEvents = [];
        //empty array to put avaiable events in
        const givenDate = new Date(date);
        //converting user chosen date
        for(let i=0;i<this.AllEvents.length;i++){
        //loop to go thru all events in AllEvents array
        let eventTime = new Date(this.AllEvents[i].eventTime);
            if(eventTime.getTime() === givenDate.getTime()){
            //see if time of event matches user given time
                availableEvents.push(this.AllEvents[i]);
                //pushing event objs that matches time into avaibleEvents array
            }
        }
        return availableEvents;
    }
    
    findEventsbyCategory(category){
    // Returns all events in a given category
        let availableEvents = [];
        category = category.toUpperCase();
        //empty array to put events that matches the user given category
        for(let i=0;i<this.AllEvents.length;i++){
        //loop to go thru all events in AllEvents array
            if(this.AllEvents[i].eventCategory === category){
            //see if category of event matches user given category
                availableEvents.push(this.AllEvents[i]);
                //pushing event objs that matches category into avaibleEvents array
            }
        }
        return availableEvents;
    }

    findUserData(username){
    //find user's data and return it
        let userData = [];
        username = username.toUpperCase();
        for(let i=0;i<this.AllUsers.length;i++){
        //looping through array of all users
            if(this.AllUsers[i].userName.toUpperCase() === username){
                userData.push(this.AllUsers[i]);
            }
        }
        return userData;
    }

    findUserDuplication(inputUN){
    //find username duplication
        inputUN = inputUN.toUpperCase();
        for(let i=0;i<this.AllUsers.length;i++){
        //looping through array of all users
            if(this.AllUsers[i].userName.toUpperCase() === inputUN){
            //find if there is a match with user input and existing data
                return true;
            }
        }
    }

    findEventIdDuplication(inputEventId){
    //find event id duplication
        for(let i=0;i<this.AllEvents.length;i++){
        //loop through array of all events
            if(this.AllEvents[i].eventId === inputEventId){
            //find if there is a match with user input and existing data
                return true;
            }
        }
    }

    findEventNameDuplication(inputEventName){
    //find event name dplication
        inputEventName = inputEventName.toUpperCase();
        for(let i=0;i<this.AllEvents.length;i++){
        //loop through array of all events
            if(this.AllEvents[i].eventName.toUpperCase() === inputEventName){
            //find if there is a match with user input and existing data
                return true;
            }
        }
    }
}

/*
Want List:
    1. Find events by Date and Category
    Done 2. Delete duplicate events
    Done 3. Username has to be unique (to avoid duplication and adding events/user deletion complications)
*/

// const eventR = new EventRecommender();
// eventR.addEvent("horror","vampire night1", "May 6, 2020");
// eventR.addEvent("horror","vampire night2", "May 8, 2020");
// eventR.addEvent("pop","popsigner1", "May 8, 2020");
// eventR.addEvent("pop","popsigner2", "May 9, 2020");
// // eventR.addUser("Christian");
// // eventR.addUser("James");
// // eventR.saveUserEvent("James", "popsigner");
// // console.log(eventR.AllEvents);
// // console.log(eventR.AllUsers);
// // console.log(eventR.AllUsers[1].userEvents);
// // eventR.deleteUser("Christian");
// // console.log(eventR.AllUsers);
// // eventR.deleteEvent("popsigner");
// // console.log(eventR.AllEvents);
// // console.log(eventR.findEventsByDate("May 8, 2020"));
// console.log(eventR.findEventsbyCategory("pop"));

if (typeof module != 'undefined'){
    module.exports = { EventRecommender, User,  Event} 
}