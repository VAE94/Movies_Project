const updateMoviesContainer = document.querySelector('.update-movies-table');
const updateMoviesBtn = document.querySelector('.update-btn');
const form = document.querySelector('.movie-form');

const moviesURL = 'https://traineeship-koa-server.onrender.com/movies';

//GET ALL
window.addEventListener('load', getAllMovies);

async function getAllMovies() {
	try {
		const result = await fetch(moviesURL);
		const movies = await result.json();

		// hide form
		form.classList.add('hide');
		console.log(form);

		updateMoviesTable(movies);
	} catch (err) {
		console.log(err);
	}


}

updateMoviesContainer.addEventListener('click', handleUpdateMovie);

//EDIT
function handleUpdateMovie(event) {
	const movieId = event.target.getAttribute('data-movie-id');
	if (event.target.classList.contains('edit')) {
		editMovieById(movieId);
	} else {
		console.log('Could not edit');
	}
}

updateMoviesBtn.addEventListener('click', updateMovie);

//PUT
async function updateMovie(event) {
	try {
		event.preventDefault();

		const movieImage = document.getElementById('image').value;
		const movieTitle = document.getElementById('title').value;
		const movieRelease = document.getElementById('release').value;
		const movieType = document.getElementById('type').value;
		const movieRating = document.getElementById('rating').value;
		const movieActors = document.getElementById('actors').value;
		const moviePlot = document.getElementById('plot').value;
		const movieCountry = document.getElementById('country').value;
		//value from hidden input
		const movieId = document.getElementById('movieId').value;

		let response = await fetch(`${moviesURL}/${movieId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				Images: [movieImage],
				Title: movieTitle,
				Released: movieRelease,
				Type: movieType,
				imdbRating: movieRating,
				Actors: movieActors,
				Plot: moviePlot,
				Country: movieCountry,
				imdbID: movieId,
			}),
		});
	
		if (!response.ok) {
			throw new Error('You have a server problem');
		}
		let data = await response.json();
		updateMoviesTable(data);
	} catch (err) {
		console.log(err);
	}
}

//EDIT
async function editMovieById(movieId) {
	try {
		const movieImageEdit = document.getElementById('image');
		const movieTitleEdit = document.getElementById('title');
		const movieReleaseEdit = document.getElementById('release');
		const movieTypeEdit = document.getElementById('type');
		const movieRatingEdit = document.getElementById('rating');
		const movieActorsEdit = document.getElementById('actors');
		const moviePlotEdit = document.getElementById('plot');
		const movieCountryEdit = document.getElementById('country');
		const movieIdEdit = document.getElementById('movieId');

		let response = await fetch(`${moviesURL}/${movieId}`);

		if (!response.ok) {
			throw new Error('You have a server problem');
		}
		let movie = await response.json();

		//display form
		form.classList.remove('hide');

		movieImageEdit.value = movie.Images[0];
		movieTitleEdit.value = movie.Title;
		movieReleaseEdit.value = movie.Released;
		movieTypeEdit.value = movie.Type;
		movieRatingEdit.value = movie.imdbRating;
		movieActorsEdit.value = movie.Actors;
		moviePlotEdit.value = movie.Plot;
		movieCountryEdit.value = movie.Country;
		movieIdEdit.value = movie.imdbID;
	} catch (err) {
		console.log(err);
	}
}

function updateMoviesTable(movies) {
	const tableRows = movies
		.sort((movie1, movie2) => {
			return movie2.imdbRating - movie1.imdbRating;
		})
		.map(
			(movie) =>
				`<tr class="table-movies">
		<td><img class="card-img img-fluid" style="width:300px;" src="${movie.Images[0]}" alt="Movie Image"/></td>
		<td >${movie.Title}</td>
		<td>${movie.Released}</td>
		<td>${movie.Type}</td>
		<td>${movie.imdbRating}</td>
		<td>${movie.Actors}</td>
		<td>${movie.Plot}</td>
		<td>${movie.Country}</td>
		<td><button class="btn btn-info edit bg-primary" data-movie-id=${movie.imdbID}>✎</button></td>
  </tr>`
		)
		.join('');

		// hide form
		form.classList.add('hide');

	updateMoviesContainer.innerHTML = tableRows;
}

// subscribe
const subscribeForm = document.querySelector('.subscribe-form');
const inputEmail = document.getElementById('email');

subscribeForm.addEventListener('submit', function (event) {
	event.preventDefault();
	inputEmail.value = '';
});
