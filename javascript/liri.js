require("dotenv").config();
var keysFile = require('./keys.js');
// var spotify = new Spotify(keys.spotify);
// var twitterClient = new Twitter(keys.twitter);
var request = require("request");
var nodeArgs = process.argv;
var movieName = "";
var requestType = process.argv[2];

// * `my-tweets`



// * `spotify-this-song`

// * `movie-this`

// if 3rd process.argv is "movie-this" and a movie title is provided, define movieName with entered movie title
if (requestType == "movie-this" && nodeArgs.length > 3) {
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }
    // if 3rd process.argv is "movie-this" and a movie title is NOT provided, define movieName as "Mr.+Nobody"
} else if (requestType == "movie-this" && nodeArgs.length <= 3) {
    movieName = "Mr.+Nobody";
};

var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
// console.log(movieUrl);

// send request to omdb api, if no errors and response is returned, parse and show specific responses
request(movieUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log("Movie Title: " + JSON.parse(body).Title);
        console.log("Year Released: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country where the movie was produced: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
    }
})
// * `do-what-it-says`