const validateForm = document.querySelector('.movie-form');
const validateBtn = document.querySelector('.add-btn');
const image = document.getElementById('image');
const title = document.getElementById('title');
const release = document.getElementById('release');
const type = document.getElementById('type');
const rating = document.getElementById('rating');
const actors = document.getElementById('actors');
const plot = document.getElementById('plot');
const country = document.getElementById('country');
// let formGroup = document.querySelector('.form-group');
// let messageInput = document.querySelector('.message');

validateForm.addEventListener('submit', (e) => {
	e.preventDefault();

	checkInputs();
});

function setErrorFor(element, message) {
	const formGroup = element.parentElement;
	const errorDisplay = formGroup.querySelector('.error');

	errorDisplay.innerText = message;
	formGroup.classList.add('error');
	formGroup.classList.remove('success');
	console.log(formGroup);
}

function setSuccessFor(element) {
	const formGroup = element.parentElement;
	const errorDisplay = formGroup.querySelector('.error');

	errorDisplay.innerText = '';
	formGroup.classList.add('success');
	formGroup.classList.remove('error');
	console.log(formGroup);
}



function checkInputs() {
	//get values from inputs
	const imageValue = image.value.trim();
	const titleValue = title.value.trim();
	const releaseValue = release.value.trim();
	const typeValue = type.value.trim();
	const ratingValue = rating.value.trim();
	const actorsValue = actors.value.trim();
	const plotValue = plot.value.trim();
	const countryValue = country.value.trim();

	if (imageValue === '') {
		// show error
		setErrorFor(image, 'Image cannot be blank');
	} else {
		// add successs class
		setSuccessFor(image);
	}
	if (titleValue === '') {
		// show error
		setErrorFor(title, 'Title cannot be blank');
	} else {
		// add successs class
		setSuccessFor(title);
	}
	if (releaseValue === '') {
		// 	// show error
		setErrorFor(release, 'Release cannot be blank');
	} else {
		// add successs class
		setSuccessFor(release);
	}
	if (typeValue === '') {
		setErrorFor(type, 'Type cannot be blank');
	} else {
		setSuccessFor(type);
	}

	if (ratingValue === '') {
		setErrorFor(rating, 'Rating cannot be blank');
	} else {
		setSuccessFor(type);
	}
	if (actorsValue === '') {
		// show error
		setErrorFor(actors, 'Actors cannot be blank');
	} else {
		// add successs class
		setSuccessFor(actors);
	}
	if (plotValue === '') {
		// show error
		setErrorFor(plot, 'Plot cannot be blank');
	} else {
		// add successs class
		setSuccessFor(plot);
	}
	if (countryValue === '') {
		// show error
		setErrorFor(country, 'Plot cannot be blank');
	} else {
		// add successs class
		setSuccessFor(country);
	}
}

checkInputs();
