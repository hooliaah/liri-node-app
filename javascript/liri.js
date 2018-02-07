// global variables - general
require("dotenv").config();
var keys = require('./keys.js');
var request = require("request");
var nodeArgs = process.argv;
var requestType = process.argv[2];

// twitter specific global variables
var Twitter = require('twitter');
var client = new Twitter(keys.twitterKey);
var params = {screen_name: 'jukiegroth'};

// Spotify specific global variables
// var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);

// OMDB specific global variables
var movieName = "";

// * `my-tweets`
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        console.log(tweets);
        console.log(response);
        console.log("request sent to twitter");
    } else {
        console.log("there was an error" + JSON.stringify(error));
    }
});


// * `spotify-this-song`
// spotify.search({
//     type: 'track',
//     query: 'All the Small Things',
//     function(error, data) {
//         if (error) {
//             return console.log("error occured: " + error);
//         }
//         console.log(data);
//     }
// })


// * `movie-this`

// if 3rd process.argv is "movie-this" and a movie title is provided, define movieName with entered movie title
// if (requestType == "movie-this" && nodeArgs.length > 3) {
//     for (var i = 3; i < nodeArgs.length; i++) {
//         if (i > 3 && i < nodeArgs.length) {
//             movieName = movieName + "+" + nodeArgs[i];
//         } else {
//             movieName += nodeArgs[i];
//         }
//     }
//     // if 3rd process.argv is "movie-this" and a movie title is NOT provided, define movieName as "Mr.+Nobody"
// } else if (requestType == "movie-this" && nodeArgs.length <= 3) {
//     movieName = "Mr.+Nobody";
// };

// var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
// // console.log(movieUrl);

// // send request to omdb api, if no errors and response is returned, parse and show specific responses
// request(movieUrl, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//         console.log("Movie Title: " + JSON.parse(body).Title);
//         console.log("Year Released: " + JSON.parse(body).Year);
//         console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
//         console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
//         console.log("Country where the movie was produced: " + JSON.parse(body).Country);
//         console.log("Language: " + JSON.parse(body).Language);
//         console.log("Plot: " + JSON.parse(body).Plot);
//         console.log("Actors: " + JSON.parse(body).Actors);
//     } else {
//         console.log("There was an error");
//     }
// })
// * `do-what-it-says`