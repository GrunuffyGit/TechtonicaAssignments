function getLocalStorage(string){
//getting local storage
    if(localStorage.getItem(string) !== null){//if local storage is not null
        return JSON.parse(localStorage.getItem(string));//returning obj array of local stoarage (JSON.parse is to turn local storage back into JSON because local storage stores it as a string)
    }else {//if local storage is empty
        return [];//return an empty array
    };
}

function setLocalStorage(string, arrayObj){
//setting the local storage
    localStorage.setItem(string, JSON.stringify(arrayObj)); 
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

function updateUserEvent(updateEventObj, json, timesCalled, maxCalls){
//updating the user with new event array
    let updateUserEventURL = "/users/"+ json[0].id;
    // sendDB_API("PUT", updateUserEventURL, updateEventObj);
    fetch(updateUserEventURL,{
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updateEventObj)
    })
        .then((res) => res.json())
        .then((result) => {
            console.log(timesCalled +"<-iteration, max->"+maxCalls);
            let currentUser = getLocalStorage("currentUser");
            if(result[0].name === currentUser.name){
                if(window.location.pathname === "/AccountManagement" || timesCalled === maxCalls){
                    window.location.reload();
                }
            }else if(timesCalled === maxCalls){
                window.location.reload();
            }
        });
}

function deleteEventFromUser(user, eventId, timesCalled, maxCalls){
//deleting event from user by finding the user id
//passing id to find events
//filter out event to delete and replace user's current events with new array without target event
    if(typeof timesCalled === undefined){
        timesCalled = 1;
    }
    if(typeof maxCalls === undefined){
        maxCalls = 1;
    }
    function filterOutEvents(eventId, json){
    //filtering out target event from json
        if(json[0].events.findIndex(event => event.id == eventId) !== -1){
            let updatedArray = json[0].events.filter(event => {return event.id != eventId});//get new array w/out target event
            if(updatedArray.length === 0){//if the array is empty
                updatedArray = "[]";//pass a empty array string
            };
            let eventObj = {//creating event obj to pass for body
            "events": updatedArray
            };
            let findUserIDURL = "/users/"+ user;//find user id
            fetch(findUserIDURL)
                .then((res) => res.json())
                .then((result) => updateUserEvent(eventObj, result, timesCalled, maxCalls))
        }        
    };
    let findUserEventsURL = `/users/${user}/events/`;//building url to find user's event
    fetch(findUserEventsURL)
            .then((res) => res.json())
            .then((result) => filterOutEvents(eventId, result))
}


export {
    getLocalStorage, 
    setLocalStorage,
    formatTime,
    updateUserEvent,
    deleteEventFromUser};