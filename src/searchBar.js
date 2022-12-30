const searchInput = document.getElementById('search-input');
const searchForm = document.querySelector('.search-form');
let moviesContainer = document.querySelector('.movies-container');

searchInput.addEventListener('input', searchResults);

async function searchResults(event) {
	try {
		let value = event.target.value;
		const searchURL = 'https://traineeship-koa-server.onrender.com/movies';
		const result = await fetch(searchURL);
		const moviesResults = await result.json();

		let filterMovies = moviesResults.filter((movie) =>
			movie.Title.includes(value)
		);
		// console.log(value);

		console.log(filterMovies);
		const cardsSearch = filterMovies
			.map(
				(movie) =>
					`
					<div class="card text-white bg-dark movies-search movies-card">
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

		searchForm.addEventListener('submit', function (e) {
			e.preventDefault();
			moviesContainer.innerHTML = cardsSearch;
		});

		console.log(cardsSearch);
	} catch (err) {
		console.log(err);
	}
}

export default searchResults;
