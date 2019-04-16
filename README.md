# liri-node-app

* To run liri.js create .env file at root with the following:

SPOTIFY_ID=YOUR_SPOTIFY_ID
SPOTIFY_SECRET=YOUR-SPOTIFY_SECRET

You can get your own Spotify Credentials for free here: https://developer.spotify.com/documentation/web-api/quick-start/


Watch terminal video of application function here: https://drive.google.com/file/d/1VUowaaPpjsZYC3vUtUL2aFsOfKGyCVKz/view

Terminal commands: 

[node liri.js] + one of the following:

* spotify-this-song {song name}
* movie-this {movie name}
* concert-this {artist name}
* do-what-it-says
    - do-what-it-says pulls random search term/artist pair from file random.txt
    - there are currently 2 examples of each, but do-what-it-says will work with any number of valid pairs
