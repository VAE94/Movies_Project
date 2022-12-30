// movies description
window.addEventListener('load', async () => {
	try {
		let searchMovieString = window.location.search;

		const searchMovie = new URLSearchParams(searchMovieString);
		const movieId = searchMovie.get('movie-id');

		const moviesURL = `https://traineeship-koa-server.onrender.com/movies/${movieId}`;
		const result = await fetch(moviesURL);
		if (!result.ok) {
			throw new Error('You have a server problem');
		}
		const movie = await result.json();

		const movieCard = `    
       	<div class="card text-white bg-dark movies-details movies-card">
        	<div class="card-body details-body">
        		<img class="card-img-top img-collection" src="${movie.Images[0]}" alt="Movie Poster">
       	 		<h4 class="card-title">${movie.Title}</h4>
        		<p class="card-text">Release date: ${movie.Released}</p>
        		<p class="card-text">IMDB Rating: ${movie.imdbRating}</p>
        		<p class="card-text">Runtime: ${movie.Runtime}</p>
        		<p class="card-text">Genre: ${movie.Genre}</p>
       		 	<p class="card-text">Director: ${movie.Director}</p>
        		<p class="card-text">Writer: ${movie.Writer}</p>
        		<p class="card-text">Actors: ${movie.Actors}</p>
        		<p class="card-text">Plot: ${movie.Plot}</p>
        		<p class="card-text">Language: ${movie.Language}</p>
        		<p class="card-text">Country: ${movie.Country}</p>
        		<p class="card-text">Awards: ${movie.Awards}</p>
           		 </div>
            </div>`;

		document.querySelector('.movies-details').innerHTML = movieCard;
	} catch (err) {
		console.log(err);
	}
});

// subscribe
const subscribeForm = document.querySelector('.subscribe-form');
const inputEmail = document.getElementById('email');

subscribeForm.addEventListener('submit', function (event) {
   event.preventDefault();
   inputEmail.value = '';
});

