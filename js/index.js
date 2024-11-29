/* Copyright (c) 2024 Dante Passalacqua */
let userSettings = [];
let userLocation;
const authorText = document.querySelector('.author-text');

if (localStorage.getItem('userLocation')) {
	userLocation = localStorage.getItem('userLocation');
}

if (localStorage.getItem('enabledSettings')) {
	userSettings = localStorage.getItem('enabledSettings');
} else {
	userSettings = ['time', 'weather', 'quote'];
}

function getCurrentTime() {
	const date = new Date();
	document.querySelector('.time').textContent = date.toLocaleTimeString(
		'en-us',
		{ timeStyle: 'short' }
	);
}

if (userSettings.includes('time')) {
	getCurrentTime();
	setInterval(getCurrentTime, 1000);
}

fetch()
	// 'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=night-sky'
	.then((res) => res.json())
	.then((data) => {
		document.body.style.backgroundImage = `url(${data.urls.full})`;
		authorText.innerHTML = `Photo by: <b>${data.user.name}</b>`;
	})
	.catch((err) => {
		console.log(err);
		document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1446034295857-c39f8844fad4?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTUxODQxNDE&ixlib=rb-1.2.1&q=80)`;
		authorText.textContent = `By: Vadim Sherbakov`;
	});

if (userSettings.includes('weather')) {
	if (!userLocation) {
		document.querySelector('.weather').innerHTML = `
			<p class="weather-placeholder">Please set your location in <a href="settings.html">settings</a> to view weather information</p>
		`;
	} else {
		let userCity;
		fetch(
			`https://geocoding-api.open-meteo.com/v1/search?name=${userLocation}&count=1&language=en&format=json`
		)
			.then((res) => res.json())
			.then((data) => {
				userCity = data.results[0].name;
				fetch(
					`https://api.open-meteo.com/v1/forecast?latitude=${data.results[0].latitude}&longitude=${data.results[0].longitude}&current_weather=true&temperature_unit=fahrenheit`
				)
					.then((res) => res.json())
					.then((data) => {
						document.querySelector('.weather').innerHTML = `
										<p class="weather-temp">${Math.round(data.current_weather.temperature)}°F</p>
										<p class="weather-city">${userCity}</p>`;
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	}
}

// if (userSettings.includes('quote')) {
// 	fetch('https://api.quotable.io/random')
// 		.then((res) => res.json())
// 		.then((data) => {
// 			document.querySelector(
// 				'.quote'
// 			).innerHTML = `"${data.content}" - <b>${data.author}</b>`;
// 		})
// 		.catch((err) => console.log(err));
// }
