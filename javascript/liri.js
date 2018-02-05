require("dotenv").config();
var keysFile = require('keys.js');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);