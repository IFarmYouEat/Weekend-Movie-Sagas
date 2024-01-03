const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  const query = `
  SELECT * FROM "genres"
  ORDER BY "name" ASC;
  `
  pool.query(query)
  .then(result => {
    res.send(result.rows);
  })
  .catch(error =>{
    console.log("Error: Get all Genres", error);
    res.sendStatus(500)
  })
});

router.get('/:id', (req, res) => {
  // Add query to get all genres
  const query = `
  SELECT name FROM movies_genres 
  JOIN genres ON genre_id = genres.id 
  WHERE movie_id = $1;
  `;
  pool.query(query, [req.params.id])
  .then(result => {
    res.send(result.rows);
  })
  .catch(error =>{
    console.log("Error in genre.router get by id", error);
    res.sendStatus(500)
  })
});

module.exports = router;