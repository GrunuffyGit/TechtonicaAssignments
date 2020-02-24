const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./dbCall.js');
const eR = new db.EventRecommender();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/users', eR.getUsers);
app.get('/users/:name', eR.getUserByName);
app.get('/users/:name/events', eR.getUsersEvents);
app.get('/users/events/:id', eR.getAllUserEvents);
app.post('/users', eR.createUser);
app.put('/users/:id', eR.updateUser);
app.delete('/users/:id', eR.deleteUser);

app.get('/events', eR.getEvent);
app.get('/events/id/:id', eR.getEventById);
app.get('/events/:name', eR.getEventByName);
app.get('/events/date/:date', eR.getEventByDate);
app.get('/events/category/:category', eR.getEventByCategory);
app.post('/events', eR.createEvent);
app.delete('/events/:id', eR.deleteEvent);

app.get("/", function(req , res){
    res.sendFile(__dirname + "/index.html");
});
app.get("/UserManagement.html", function(req , res){
    res.sendFile(__dirname + "/UserManagement.html");
});
app.get("/EventManagement.html", function(req , res){
    res.sendFile(__dirname + "/EventManagement.html");
});
app.get("/FindSaveEvents.html", function(req , res){
    res.sendFile(__dirname + "/FindSaveEvents.html");
});
app.get("/TicketMaster.html", function(req , res){
    res.sendFile(__dirname + "/TicketMaster.html");
});
app.get("/UserAccount.html", function(req , res){
    res.sendFile(__dirname + "/UserAccount.html");
});

app.get("/eventClass.js", function(req , res){
    res.sendFile(__dirname + "/eventClass.js");
});

app.get("/jQuery-scripts.js", function(req , res){
    res.sendFile(__dirname + "/jQuery-scripts.js");
});

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("my app is running at http://%s:%s", host, port);
});

