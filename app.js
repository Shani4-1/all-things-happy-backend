const express = require('express');
const cors = require('cors');
const eventsController = require("./controllers/events/eventscontrollers.js");
const songsController = require("./controllers/songs/songsControllers.js")
const recipesController = require("./controllers/recipes/recipesControllers.js")
const quotesController = require("./controllers/quotes/quotesControllers.js");
const playlistController = require("./controllers/songs/playlistcontrollers.js");
const songGenresController = require("./controllers/songs/song_genresControllers.js");
const recipeDetailsController = require("./controllers/recipes/recipe_detailsControllers.js");
const categoriesController = require("./controllers/quotes/categoriesControllers.js");
const quoteListController = require("./controllers/quotes/quotelistcontrollers");
const measureController = require("./controllers/recipes/measureControllers.js");
const ingredientController = require("./controllers/recipes/ingredientControllers.js");
const eventMenuController = require("./controllers/recipes/event_menuControllers.js");

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to My Happy Place');
});

app.use('/song_genres', songGenresController);
app.use('/songs', songsController);
app.use('/playlist', playlistController);
app.use('/categories', categoriesController);
app.use('/quotes', quotesController);
app.use('/quote_list', quoteListController);
app.use('/recipe_details', recipeDetailsController);
app.use('/measure', measureController);
app.use('/ingredient', ingredientController);
app.use('/recipes', recipesController);
app.use('/event_menu', eventMenuController);
app.use('/events', eventsController);

app.get("*", (req, res) => {
    res.status(404).send("Page not found");
});

module.exports = app;




