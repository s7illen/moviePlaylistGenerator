// the web app object
const app = {};

app.apiKey = `aaf61b600bd7e26a96f6e5cf0dc95050`;

app.searchResults = [];

app.userPickIDs = [];

app.displaySearchResults = () => {

    // console.log(app.searchResults[0]);
    for (x = 0; x < app.searchResults.length; x++) {
        $('.searchResults').append(`<li value="${app.searchResults[x].id}">${app.searchResults[x].name}</li>`);
    };
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
    }).then(function(data) {

        // an array of objects containing people data
        peopleList = data.results;
        
    }).then(function() {

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
        console.log('five actors max:',fiveActorsMaxList);

    }).then(function() {
        app.searchResults = fiveActorsMaxList;
        console.log('search results', app.searchResults);

    }).then(function() {
        app.displaySearchResults();
    });
};

$(function () {
    app.getActors('tom');
    
    $('.searchResults').on('click', 'li', function() {
        
        // console.log('you clicked!', $(this).val());
        app.userPickIDs.push( $(this).val() );

        console.log(app.userPickIDs);
    });
    
});