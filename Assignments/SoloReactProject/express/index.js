const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./dbCallFunc');
const animal = new db.animaldb;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./'));

app.get('/individual/:nickname', animal.getIndividual);
app.get('/individual/species/:speciesId', animal.getAllIndividuals);
app.post('/individual', animal.createIndividual);
app.delete('/individual/:id', animal.deleteIndividual);

app.get('/species', animal.getSpecies);
app.post('/species', animal.createSpecies);
app.delete('/species/:id', animal.deleteSpecies);

app.get('/sighting/all/', animal.getAllSightings);
app.get('/sighting/:id', animal.getSightings);
app.post('/sighting', animal.createSightings);
app.delete('/sighting/:id', animal.deleteSightings);

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("my app is running at http://%s:%s", host, port);
});