const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'dbuser',
  host: 'localhost',
  database: 'animaldb',
  password: 'dbPass',
  port: 5432 
});

class animaldb {
    getIndividual =  function(req, res){
        const nickname = req.params.nickname;
        pool.query('SELECT individuals.id, nickname, common_name, scientific_name, status_code FROM individuals JOIN species ON individuals.species = species.id WHERE nickname = $1;',
            [nickname], function(error, results){
                if (error) {
                    throw error;
                }
                res.status(200).json(results.rows);
                });
    }

    getAllIndividuals = function(req, res){
        const speciesId = req.params.speciesId;
        pool.query('SELECT id, nickname FROM individuals WHERE species = $1;',
            [speciesId], function(error, results){
                if (error) {
                    throw error;
                }
                res.status(200).json(results.rows);
                });
    }

    createIndividual = function(req, res){
        const {nickname, species, created} = req.body;
        pool.query('INSERT INTO individuals (nickname, species, created) VALUES ($1, $2, $3)  RETURNING *;',
            [nickname, species, created], function(error, results){
                if (error) {
                    throw error;
                }
                res.status(200).json(results.rows);
                });
    }

    deleteIndividual = function(req, res){
        const id = req.params.id;
        pool.query('DELETE FROM individuals WHERE id = $1 RETURNING *;',
            [id], function(error, results){
                if (error) {
                    throw error;
                }
                res.status(200).json(results.rows);
                });
    }

    getSpecies = function(req, res){
        pool.query('SELECT * FROM species;', function(error, results){
          if (error) {
            throw error;
          }
          res.status(200).json(results.rows);
        });
    }

    createSpecies = function(req, res){
        const {common_name, scientific_name, population, status_code, created} = req.body;
        pool.query('INSERT INTO species (common_name, scientific_name, population, status_code, created) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
            [common_name, scientific_name, population, status_code, created], function(error, results){
                if (error) {
                    throw error;
                }
                res.status(200).json(results.rows);
                });
    } 

    deleteSpecies = function(req, res){
        const id = req.params.id;
        pool.query('DELETE FROM species WHERE id = $1 RETURNING *;',
            [id], function(error, results){
                if (error) {
                    throw error;
                }
                res.status(200).json(results.rows);
                });
    } 

    getAllSightings = function(req, res){
        pool.query('SELECT * FROM sightings;', function(error, results){
                if (error) {
                    throw error;
                }
                res.status(200).json(results.rows);
                });
    }

    getSightings = function(req, res){
        const animalId = req.params.id;
        pool.query('SELECT * FROM sightings WHERE individual = $1;',
            [animalId], function(error, results){
                if (error) {
                    throw error;
                }
                res.status(200).json(results.rows);
                });
    }

    createSightings = function(req, res){
        const {individual, location, health, poc, date_spotted} = req.body;
        pool.query('INSERT INTO sightings (individual, location, health, poc, date_spotted) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
            [individual, location, health, poc, date_spotted], function(error, results){
                if (error) {
                    throw error;
                }
                res.status(200).json(results.rows);
                });
    }

    deleteSightings = function(req, res){
        const id = req.params.id;
        pool.query('DELETE FROM sightings WHERE id = $1 RETURNING *;',
            [id], function(error, results){
                if (error) {
                    throw error;
                }
                res.status(200).json(results.rows);
                });
    } 
}

module.exports = {animaldb};