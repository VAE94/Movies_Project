const deleteMoviesContainer = document.querySelector('.delete-movies-table');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.btn-close');
const deleteMovieBtn = document.querySelector('.delete-movie');
const saveMovieBtn = document.querySelector('.save-movie');

const moviesURL = 'https://traineeship-koa-server.onrender.com/movies';

//GET
window.addEventListener('load', getAllMovies);

async function getAllMovies() {
	try {
		const result = await fetch(moviesURL);
		const movies = await result.json();

		deleteMoviesFromTable(movies);
	} catch (err) {
		console.log(err);
	}
}

deleteMoviesContainer.addEventListener('click', handleDelete);

//DELETE
let movieId;
async function handleDelete(event) {
	const movieIdBtn = event.target.getAttribute('data-movie-id');
		movieId=movieIdBtn;
		if (event.target.classList.contains('delete')) {
			modal.style.display = 'block';
			saveMovie();
		} 
			
}


async function deleteItems(movieId){
	try{	
	let response = await fetch(`${moviesURL}/${movieId}`, {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error('You have a server problem');
	}

	console.log(response);
	let data = await response.json();
	deleteMoviesFromTable(data);
	console.log(data);

} catch (err) {
console.log(err);
}
}


function deleteMoviesFromTable(movies) {
	const tableRows = movies
		.sort((movie1, movie2) => {
			return movie2.imdbRating - movie1.imdbRating;
		})
		.map(
			(movie) =>
				`<tr class="table-movies">
		<td><img class="card-img img-fluid" style="width:300px;" src="${movie.Images[0]}" alt="Product Image"/></td>
		<td >${movie.Title}</td>
		<td>${movie.Released}</td>
		<td>${movie.Type}</td>
		<td>${movie.imdbRating}</td>
		<td>${movie.Actors}</td>
		<td>${movie.Plot}</td>
		<td>${movie.Country}</td>
		<td><button class="btn btn-danger delete" data-movie-id=${movie.imdbID}>X</button></td>
  </tr>`
		)
		.join('');

	deleteMoviesContainer.innerHTML = tableRows;
}

// subscribe
const subscribeForm = document.querySelector('.subscribe-form');
const inputEmail = document.getElementById('email');

subscribeForm.addEventListener('submit', function (event) {
	event.preventDefault();
	inputEmail.value = '';
});

// modal
closeModalBtn.addEventListener('click', closeModal);

function closeModal(e) {
	e.preventDefault();
	modal.style.display = 'none';
}

saveMovieBtn.addEventListener('click', saveMovie);

function saveMovie(e) {
	e.preventDefault();
	modal.style.display = 'none';
}

deleteMovieBtn.addEventListener('click', deleteMovie);

function deleteMovie(){
	modal.style.display = 'none';
	deleteItems(movieId);
}