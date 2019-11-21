// Project 4 Pseudo Code Proposal -- Lewis Brignell  & Steven Chen

// ---- MVP Purpose ----
// The user inputs an actor/actress name  
// after clicking the button, a playlist of recommendations is generated 
// and displayed in list format for the user to manipulate.


// the web app object
const app = {};

// searches for user input: actor name and returns their id number
app.getActorID = (actorName) => {};

// returns all movies the actor is credited in
app.getMovies = (actorID) => {};

// returns a filtered array of top rated movies
app.refineMovies = (movieList) => {};

// returns an array of movie info relevant to the app
app.makePlaylistArray = (refinedList) => {};

// takes an array of movies and displays them on the DOM
app.makePlaylist = (playlistArray) => {};

$(function () {
    // execution happens here
});


// ---- Stretch Goal List ---- 
// 1. Make playlist modifiable (change order / delete watched items / etc..)
// 2. Add actor collaboration search option.
// 3. Modify playlist presentation - aesthetic enhancements, more dynamic display.
// 4. Tinder-esque search interface; mobile-only (swipe selection).