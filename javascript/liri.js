require("dotenv").config();
var keysFile = require('./keys.js');
// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);
var request = require("request");

// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`
var nodeArgs = process.argv;
var movieName = "";

if (nodeArgs.length > 2) {
for (var i = 2; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
    } else {
        movieName += nodeArgs[i];
    }
}
} else {
    movieName = "Mr.+Nobody";
};

var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
console.log(movieUrl);

request(movieUrl, function(error, response, body) {
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