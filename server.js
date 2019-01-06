const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require('axios');
const cheerio = require('cheerio');

// Require all models
const db = require('./models');

const PORT = 3000;

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger('dev'));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static('public'));

// Connect to the Mongo DB
mongoose.connect(
  'mongodb://localhost/mongoNewsScraper',
  { useNewUrlParser: true }
);

// Routes

// A GET route for scraping the echoJS website
app.get('/scrape', (req, res) => {
  // First, we grab the body of the html with axios
  axios.get('http://www.echojs.com/').then(response => {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $('article h2').each(function(i, element) {
      // Save an empty result object
      const result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children('a')
        .text();
      result.link = $(this)
        .children('a')
        .attr('href');

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(dbArticle => {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(err => {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send('Scrape Complete');
  });
});

// Route for getting all Articles from the db
app.get('/articles', (req, res) => {
  // TODO: Finish the route so it grabs all of the articles
  db.Article.find({})
    // If all articles are successfully found, send them back to the client
    .then(dbArticle => {
      res.send(dbArticle);
    })
    .catch(err => {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
// app.get('/articles/:id', (req, res) => {
//   // TODO
//   // ====
//   // Finish the route so it finds one article using the req.params.id,
//   // and run the populate method with "note",
//   // then responds with the article with the note included
//   db.Article.find({ notes: dbArticle._id }).then(dbArticle => {
//     res.json(dbArticle).catch(err => {
//       res.json(err);
//     });
//   });
// });

// Route for saving/updating an Article's associated Note
app.post('/articles/:id', (req, res) => {
  // TODO
  // ====
  // save the new note that gets posted to the Notes collection
  // then find an article from the req.params.id
  // and update it's "note" property with the _id of the new note
});

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
