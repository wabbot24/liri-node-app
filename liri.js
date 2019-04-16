var moment = require("moment");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");
// console.log(fs.readFile);
require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var input = "";
var printInput = "";

for (let i = 3; i < process.argv.length; i++) {
    if (i === 3) {
        input += process.argv[i];
        printInput += process.argv[i];
    } else {
        input += "+" + process.argv[i];
        printInput += " " + process.argv[i];
    }
}

function runProgram () {
    // console.log(command);
    switch (command) {
        case "concert-this":
            axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
                function (response) {
                    console.log("* " + printInput + "'s next performance:");
                    console.log("* " + response.data[0].venue.name + " // " + response.data[0].venue.city + ", "
                     + response.data[0].venue.region + " // " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
                     console.log();
                }
            );
            break;

        case "spotify-this-song":
            spotify.search({ type: 'track', query: input }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("* ARTIST: " + data.tracks.items[0].artists[0].name);
                console.log("* SONG: " + data.tracks.items[0].name);
                console.log("* SPOTIFY LINK: " + data.tracks.items[0].external_urls.spotify);
                console.log("* ALBUM: " + data.tracks.items[0].album.name);
                console.log();
            });
            break;

        case "movie-this":
            if (!input) {
                input = "mr+nobody";
            }
            axios.get("https://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(
                function (response) {
                    console.log("* TITLE: " + response.data.Title);
                    console.log("* RELEASED: " + response.data.Released);
                    console.log("* IMDB RATING: " + response.data.imdbRating);
                    console.log("* ROTTEN TOMATOES RATING: " + response.data.Ratings[1].Value);
                    console.log("* COUNTRY: " + response.data.Country);
                    console.log("* LANGUAGE: " + response.data.Language);
                    console.log("* PLOT: " + response.data.Plot);
                    console.log("* ACTORS: " + response.data.Actors);
                    console.log();
                }
            );
            break;

        case "do-what-it-says":
            fs.readFile("random.txt", "utf8", function (err, data) {
                if (err) {
                    return console.log("ERROR" + err);
                }
                var fileData = data.split(",");
                // console.log(fileData);
                var length = fileData.length;
                var random = Math.floor(Math.random()*(length/2));
                randomInput = random * 2;
                command = fileData[randomInput];
                input = fileData[randomInput + 1];
                printInput = fileData[randomInput + 1];
                runProgram();
            });
            break;

        default:
            console.log("invalid command");
    }
    console.log();
}
runProgram();