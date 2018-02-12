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
var songName = "";

// OMDB variable
var movieName = "";

switch (requestType) {
    case "my-tweets":
        twitterSearch();
        break;

    case "spotify-this-song":
        spotifySearch();
        break;

    case "movie-this":
        movieSearch();
        break;

    case "do-what-it-says":
        randomSearch();
        break;

    default:
        console.log("Please enter a valid request. Search types include: my-tweets, spotify-this-song, movie-this, or do-what-it-says.")
        break;
};

// function to read random.txt and execute appropriate function based on the text content
function randomSearch() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log("There was an error: " + error);
        }
        var commandSeparator = data.indexOf(",");
        var commandArray = [];
        var searchTerm = [];
        for (var i = 0; i < commandSeparator; i++) {
            commandArray.push(data[i]);
        };
        for (var j = commandSeparator + 1; j < data.length; j++) {
            searchTerm.push(data[j]);
        };
        var joinCommand = commandArray.join("");
        var joinSearchTerm = searchTerm.join("");
        if (joinCommand == "my-tweets") {
            twitterSearch();
        } else if (joinCommand == "spotify-this-song") {
            songName = joinSearchTerm;
            spotifySearch();
        } else if (joinCommand == "movie-this") {
            movieName = joinSearchTerm;
            movieSearch();
        }
    })
};


// function to search for 20 latest tweets from JukieGroth on Twitter
function twitterSearch() {
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at + ": " + tweets[i].text);
            }
        } else {
            console.log("there was an error" + JSON.stringify(error));
        }
    });
};

// function to search Spotify for track name
function spotifySearch() {
    if (nodeArgs.length > 3) {
        for (var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                songName = songName + "+" + nodeArgs[i];
            } else {
                songName += nodeArgs[i];
            }
        }
    } else if (requestType == "do-what-it-says") {
        songName = songName;
    } else if (nodeArgs.length <= 3) {
        songName = "The Sign Ace of Base";
    };
    spotify.search({
        type: 'track',
        query: songName,
        limit: 1
    },
        function (error, data) {
            if (error) {
                return console.log('Error occurred: ' + error);
            }
            console.log("Artist name: " + data.tracks.items[0].artists[0].name);
            console.log("Song name: " + data.tracks.items[0].name);
            console.log("Song URL: " + data.tracks.items[0].external_urls.spotify);
            console.log("Album name: " + data.tracks.items[0].album.name);
        });
};

// function to search OMDB for movie title
function movieSearch() {
    if (nodeArgs.length > 3) {
        for (var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                movieName = movieName + "+" + nodeArgs[i];
            } else {
                movieName += nodeArgs[i];
            }
        }
        // if 3rd process.argv is "movie-this" and a movie title is NOT provided, define movieName as "Mr.+Nobody"
    } else if (requestType == "do-what-it-says") {
        movieName = movieName;
    } else if (nodeArgs.length <= 3) {
        movieName = "Mr.+Nobody";
    };

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
};