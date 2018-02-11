// Global variables - general
require("dotenv").config();
var keys = require('./keys.js');
var request = require("request");
var fs = require("fs");
var nodeArgs = process.argv;
var requestType = process.argv[2];

// Twitter global variables
var Twitter = require('twitter');
var client = new Twitter(keys.twitterKey);
var params = { screen_name: 'jukiegroth' };

// Spotify global variables
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// OMDB global variables
var movieName = "";

// * `my-tweets`
// if 3rd process.argv == "my-tweets", console date and content of my last 20 tweets
if (requestType == "my-tweets") {
    twitterSearch();
};

function twitterSearch(){
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at + ": " + tweets[i].text);
            }
        } else {
            console.log("there was an error" + JSON.stringify(error));
        }
    });
}

// * `spotify-this-song`
var songName = "";
if (requestType == "spotify-this-song" && nodeArgs.length > 3) {
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            songName = songName + "+" + nodeArgs[i];
        } else {
            songName += nodeArgs[i];
        }
    }
    spotifySearch();
} else if (requestType == "spotify-this-song" && nodeArgs.length <= 3) {
    songName = "The Sign Ace of Base";
    spotifySearch();
};

function spotifySearch() {
    spotify.search({
        type: 'track',
        query: songName,
        limit: 1
    },
        function (error, data) {
            if (error) {
                return console.log('Error occurred: ' + error);
            }
            // Artist(s)
            console.log("Artist name: " + data.tracks.items[0].artists[0].name);
            // The song's name
            console.log("Song name: " + data.tracks.items[0].name);
            // A preview link of the song from Spotify
            console.log("Song URL: " + data.tracks.items[0].external_urls.spotify);
            // The album that the song is from
            console.log("Album name: " + data.tracks.items[0].album.name);
        });
}

// * `movie-this`

// if 3rd process.argv is "movie-this" and a movie title is provided, define movieName with entered movie title
if (requestType == "movie-this" && nodeArgs.length > 3) {
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    } movieSearch();
    // if 3rd process.argv is "movie-this" and a movie title is NOT provided, define movieName as "Mr.+Nobody"
} else if (requestType == "movie-this" && nodeArgs.length <= 3) {
    movieName = "Mr.+Nobody";
    movieSearch();
};

function movieSearch() {
    var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
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
        } else {
            console.log("There was an error");
        }
    })
}

// * `do-what-it-says`
