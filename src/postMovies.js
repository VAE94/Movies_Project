const postMoviesContainer = document.querySelector('.post-movies-table');
const addNewMovieBtn = document.querySelector('.add-btn');
const form = document.querySelector('.movie-form');

const moviesURL = 'https://traineeship-koa-server.onrender.com/movies';

//GET
window.addEventListener('load', getAllMovies);

async function getAllMovies() {
	try {
		const result = await fetch(moviesURL);
		const movies = await result.json();
		postMoviesTable(movies);
	} catch (err) {
		console.log(err);
	}
}

addNewMovieBtn.addEventListener('click', addNewMovie);
// console.log(addNewMovieBtn);
//POST
async function addNewMovie(event) {
	try {
		event.preventDefault();

		const newMovieImage = document.getElementById('image').value;
		const newMovieTitle = document.getElementById('title').value;
		const newMovieRelease = document.getElementById('release').value;
		const newMovieType = document.getElementById('type').value;
		const newMovieRating = document.getElementById('rating').value;
		const newMovieActors = document.getElementById('actors').value;
		const newMoviePlot = document.getElementById('plot').value;
		const newMovieCountry = document.getElementById('country').value;

		let response = await fetch(moviesURL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				Images: [newMovieImage],
				Title: newMovieTitle,
				Released: newMovieRelease,
				Type: newMovieType,
				imdbRating: newMovieRating,
				Actors: newMovieActors,
				Plot: newMoviePlot,
				Country: newMovieCountry,
			}),
		});
		if (!response.ok) {
			throw new Error('You have a server problem');
		}
		let movies = await response.json();

		form.classList.add('hide');
		postMoviesTable(movies);
	} catch (err) {
		console.log(err);
	}
}
function postMoviesTable(movies) {
	const tableRows = movies
		.sort((movie1, movie2) => {
			return movie2.imdbRating - movie1.imdbRating;
		})
		.map(
			(movie) =>
				`<tr class="table-movies">
			<td><img class="card-img img-fluid" style="width: 300px;" src="${movie.Images[0]}" alt="Movie Image"/></td>
			<td>${movie.Title}</td>
			<td>${movie.Released}</td>
			<td>${movie.Type}</td>
			<td>${movie.imdbRating}</td>
			<td>${movie.Actors}</td>
			<td>${movie.Plot}</td>
			<td>${movie.Country}</td>
				</tr>`
		)
		.join('');

	postMoviesContainer.innerHTML = tableRows;
}

// subscribe
const subscribeForm = document.querySelector('.subscribe-form');
const inputEmail = document.getElementById('email');

subscribeForm.addEventListener('submit', function (event) {
	event.preventDefault();
	inputEmail.value = '';
});
