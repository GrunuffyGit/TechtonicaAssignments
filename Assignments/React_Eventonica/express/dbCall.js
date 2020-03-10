const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'dbuser',
  host: 'localhost',
  database: 'api',
  password: 'dbPass',
  port: 5432 
});

class EventRecommender {
  getUsers = function(req, res){
    pool.query('SELECT * FROM users ORDER BY id ASC;', function(error, results){
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  }

  getUserByName = function(req, res) {
    const name = req.params.name;
    pool.query('SELECT * FROM users WHERE name = $1;', [name.toUpperCase()], function(error, results){
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  }

  getUsersEvents = function(req, res) {
    const name = req.params.name;
    pool.query('SELECT events FROM users WHERE name = $1;', [name.toUpperCase()], function(error, results){
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  }

  getAllUserEvents = function(req, res) {
    const eventid = req.params.id;
    pool.query(`SELECT * FROM users WHERE events @> '[{"id": ${eventid}}]';`, function(error, results){
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  }

  createUser = function(req, res){
    const {name, password} = req.body;
    pool.query('INSERT INTO users (name, password, events) VALUES ($1, $2, $3) RETURNING *;', [name, password, '[]'], (error, results ) => {
      if (error) {
        throw error;
      }
      res.status(201).json(results.rows);
    });
  }

  updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const {events} = req.body;
    if(events !== '[]'){
      pool.query(
        'UPDATE users SET events = $2 WHERE id = $1 RETURNING *;', [id, JSON.stringify(events)], (error, results) => {
          if (error) {
            throw error;
          }
          res.status(200).json(results.rows);
        }
      );
    }else{
      pool.query(
        'UPDATE users SET events = $2 WHERE id = $1 RETURNING *;', [id, '[]'], (error, results) => {
          if (error) {
            throw error;
          }
          res.status(200).json(results.rows);
        }
      );
    }
  }

  deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM users WHERE id = $1 RETURNING *;', [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    })
  }

  getEvent = function(req, res){
  pool.query('SELECT * FROM events ORDER BY id ASC;', function(error, results){
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
    });
  }

  getEventById = function(req, res) {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM events WHERE id = $1;', [id], function(error, results){
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
      });
    }

  getEventByName = function(req, res) {
  const name = req.params.name;
  pool.query('SELECT * FROM events WHERE name = $1;', [name], function(error, results){
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
    });
  }

  getEventByCategory = function(req, res) {
  const category = req.params.category;
  pool.query('SELECT * FROM events WHERE category = $1;', [category], function(error, results){
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
    });
  }

  getEventByDate = function(req, res) {
  const date = req.params.date;
  pool.query('SELECT * FROM events WHERE time = $1;', [date], function(error, results){
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
    });
  }

  createEvent = function(req, res){
  const {name, category, time} = req.body;
  pool.query('INSERT INTO events (name, category, time) VALUES ($1, $2, $3) RETURNING *;', [name, category, time], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(201).json(results.rows);
    });
  }

  deleteEvent = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('DELETE FROM events WHERE id = $1 RETURNING *;', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
    })
  } 
}

module.exports = {EventRecommender};