//Grab data from keys.js
var keys = require('./keys.js');
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');
var client = new twitter(keys.twitterKeys);
var fs = require('fs');

var command = process.argv[2];
var x = process.argv[3];

//switch case
switch(command){
  case "my-tweets":
    showTweets();
    break;

  case "spotify-this-song":
    if(x){
      spotifySong(x);
    } else{
      spotifySong("The Sign");
    }
    break;

  case "movie-this":
    if(x){
      omdbData(x)
    } else{
      omdbData("Mr. Nobody")
    }
    break;

  case "do-what-it-says":
    doThing();
    break;

  default:
    console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
    break;
}

function showTweets(){
  //Display last 20 Tweets
  var screenName = {screen_name: 'StefanieDing'};
  client.get('statuses/urser_timeline', screenName, function(err, data){
    console.log(data);
    // data.forEach(function(item) {console.log(item.text, "(created on", item.created_at, ")")})
  })

}

function spotifySong(song){
  spotify.search({ type:'track', query: song}, function(error, data){
    console.log(data);

    // for(var i = 0; i<data.tracks.items.length; i++){
    //   var songData = data.tracks.items[i];

    //   console.log(songData.artists[0],name);
    //   console.log(songData.artist.name);
    //   console.log(songData.preview_url);
    //   console.log(songData.album.name);
    //}
  });
}

function omdbData(movie){
  var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';

  request(omdbURL, function (error, response, body){
    if(!error && response.statusCode == 200){
      var body = JSON.parse(body);

      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
      console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
      console.log("Rotten Tomatoes URL: " + body.tomatoURL);
    }
  });

}

function doThing(){
  fs.readFile('random.txt', "utf8", function(error, data){
    var txt = data.split(',');

    spotifySong(txt[1]);
  });
}
