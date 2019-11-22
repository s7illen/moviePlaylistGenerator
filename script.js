// the web app object
const app = {};

app.apiKey = `aaf61b600bd7e26a96f6e5cf0dc95050`;

app.searchResults = [];

app.userPickIDs = [];

app.bigMovieList = [];

app.smallMovieList = [];

app.displaySearchResults = () => {

    // console.log(app.searchResults[0]);
    for (x = 0; x < app.searchResults.length; x++) {
        $('.searchResults').append(`
        <li value="${app.searchResults[x].id}">
            <img src='https://image.tmdb.org/t/p/w180_and_h180_face${app.searchResults[x].profile_path}'>
            <p>${app.searchResults[x].name}</p>
            <div class='ratingBar'>${app.searchResults[x].popularity}</div>
        </li>`);
    };
};

app.getTrailer = (movieid) => {
    $.ajax({
        url: `https://api.themoviedb.org/3/movie/${512}/videos?api_key=${app.apiKey}&language=en-US`,
        method: 'GET',
        dataType: 'json',
    }).then(function(data){
        console.log(data.results)
    });
}

app.displayPlaylist = () => {
    // console.log(app.smallMovieList[0]);

    $('.playlist').empty();

    for (i = 0; i < app.smallMovieList.length; i++){
        $('.playlist').append(`<li id='${i}'>
            <img src='https://image.tmdb.org/t/p/w185_and_h278_bestv2${app.smallMovieList[i].poster_path}'>
            <h3>${app.smallMovieList[i].original_title}</h3>
            <p>${app.smallMovieList[i].release_date}</p>
            <div class='ratingBar'>${app.smallMovieList[i].popularity}</div>
            <div class='ratingBar'>${app.smallMovieList[i].vote_average}</div>
            <p>${app.smallMovieList[i].overview}</p>
            <button class='pushTop'>↑⇧Move to Top</button>
            <button class='skip'>Skip</button>
            <button class='moveUp'>Move Up</button>
            <button class='moveDown'>Move Down</button>
            <a href='https://www.youtube.com/watch?v='>Watch Trailer</a>
        </li>`);

    };

    // console.log($('.playlist li:nth-child(1)'))
    // $('.playlist li:nth-child(2)').css('background'+'red');


};

// searches for user input: actor name and returns their id number
app.getActors = (actorName) => {
    // data.results[0].id -- gets you the actor ID

    // an array of objects that'll contain people data
    let peopleList = [];
    // list of ONLY actors
    let actorList = [];

    let fiveActorsMaxList = [];

    $.ajax({
        url: `https://api.themoviedb.org/3/search/person?api_key=${app.apiKey}&language=en-US&query=${actorName}&page=1&include_adult=false`,
        method: 'GET',
        dataType: 'json',
    }).then(function (data) {

        // an array of objects containing people data
        peopleList = data.results;

    }).then(function () {

        for (person in peopleList) {
            // console.log('persons:', peopleList[person].name, peopleList[person].known_for_department); 

            if (peopleList[person].known_for_department == 'Acting') {
                actorList.push(peopleList[person]);
            };
        };

        if (actorList.length === 0) {
            alert('Sorry! No actors found.');
        } else if (actorList.length > 5) {
            fiveActorsMaxList = actorList.slice(0, 5);
        } else {
            fiveActorsMaxList = actorList;
        }
        console.log('five actors max:', fiveActorsMaxList);

    }).then(function () {
        app.searchResults = fiveActorsMaxList;
        console.log('search results', app.searchResults);

    }).then(function () {
        app.displaySearchResults();
    });
};

$(function () {
    $('.searchButton').on('click', function(){
        const name = $('.searchBox').val();
        app.getActors(name);
    })
   

    $('.searchResults').on('click', 'li', function () {

        app.userPickIDs = [];
        app.userPickIDs.push($(this).val());
    });

    $('.playlistButton').on('click', function () {
        $.ajax({
            url: `https://api.themoviedb.org/3/person/${app.userPickIDs[0]}/movie_credits?api_key=${app.apiKey}&language=en-US`,
            method: 'GET',
            dataType: 'json',
        }).then(function (data) {
            app.bigMovieList = data.cast;
        }).then(function(){
            app.smallMovieList = app.bigMovieList.slice(0, 10);
            console.log(app.smallMovieList)

        }).then(function () {
            app.displayPlaylist();
        });
    });

    $('.playlist').on('click', '.skip', function() {
        
        let arrayLocation = $(this).parent().attr('id');
        
        app.smallMovieList.splice(arrayLocation, 1);
        console.log(app.smallMovieList);
        app.displayPlaylist();
    });

    $('.playlist').on('click', '.pushTop', function() {

        let arrayLocation = $(this).parent().attr('id');

        let topValue = app.smallMovieList[arrayLocation];
        app.smallMovieList.splice(arrayLocation, 1);
        app.smallMovieList.unshift(topValue);
        console.log(app.smallMovieList);
        app.displayPlaylist();
    });


// write a function that does this:
// move up button
// move down button


    $('.playlist').on('click', '.moveUp', function(){

        let arrayLocation = parseInt($(this).parent().attr('id'));

        console.log(arrayLocation);
        let tem = app.smallMovieList[arrayLocation];
        app.smallMovieList[arrayLocation] = app.smallMovieList[arrayLocation - 1];
        app.smallMovieList[arrayLocation - 1] = tem;
        console.log(app.smallMovieList);
        app.displayPlaylist();

    })

    $('.playlist').on('click', '.moveDown', function () {

        let arrayLocation = parseInt($(this).parent().attr('id'));

        let tem = app.smallMovieList[arrayLocation];
        app.smallMovieList[arrayLocation] = app.smallMovieList[arrayLocation + 1];
        app.smallMovieList[arrayLocation + 1] = tem;
        app.displayPlaylist();

    })


    // swap their respective values
    // make sure to limit options #1, #10
});

//make a function that returns a playlist


//grab the actor id value, save it, send it to api

// app.userPickIDs[0]
