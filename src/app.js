import searchResults from './searchBar.js';

// get all movies
window.addEventListener('load', async () => {
	try {
		const moviesURL = 'https://traineeship-koa-server.onrender.com/movies';
		const result = await fetch(moviesURL);
		if (!result.ok) {
			throw new Error('You have a server problem');
		}
		const movies = await result.json();
		const moviesContainer = document.querySelector('.movies-container');

		const moviesCards = movies
			.sort((movie1, movie2) => {
				return movie2.imdbRating - movie1.imdbRating;
			})
			.map(
				(movie) =>
					`    
   	 <div class="card text-white bg-dark mb-3 movies-card ">
    	<div class="card-body movies-body">
        <img class="card-img-top img-collection" src="${movie.Images[0]}" alt="Movie Poster">
     	 <h4 class="card-title">${movie.Title}</h4>
     	 <p class="card-text">Release date: ${movie.Released}</p>
     	 <p class="card-text">Type: ${movie.Type}</p>
     	 <p class="card-text">IMDB Rating: ${movie.imdbRating}</p>
	  	<buttton class="btn btn-light btn-details"><a class="details-link" href="details.html?movie-id=${movie.imdbID}">Details</a></buttton>
   	 </div>
   	 </div>`
			)
			.join('');
		moviesContainer.innerHTML = moviesCards;
	} catch (err) {
		console.log(err);
	}
});

//subscribe
const subscribeForm = document.querySelector('.subscribe-form');
const inputEmail = document.getElementById('email');

subscribeForm.addEventListener('submit', function (event) {
	event.preventDefault();
	inputEmail.value = '';
});
