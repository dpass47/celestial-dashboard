const authorText = document.querySelector('.author-text');
let userSettings = [];
let cryptoSettings = [];
let userCity;

if (localStorage.getItem('userCity')) {
	userCity = localStorage.getItem('userCity');
}

if (localStorage.getItem('enabledSettings')) {
	userSettings = JSON.parse(localStorage.getItem('enabledSettings'));
} else {
	userSettings = ['time', 'weather', 'quote'];
}

if (userSettings.includes('time')) {
	document.body.addEventListener('load', getCurrentTime());

	function getCurrentTime() {
		const date = new Date();
		document.querySelector('.time').textContent = date.toLocaleTimeString(
			'en-us',
			{
				timeStyle: 'short',
			}
		);
	}
	setInterval(getCurrentTime, 1000);
}

if (localStorage.getItem('cryptoSettings')) {
	cryptoSettings = JSON.parse(localStorage.getItem('cryptoSettings'));
} else {
	cryptoSettings = [];
}

fetch(
	'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=night-sky'
)
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

if (userSettings.includes('crypto')) {
	if (cryptoSettings.includes('Bitcoin')) {
		fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
			.then((res) => {
				if (!res.ok) {
					throw Error('Something went wrong');
				}
				return res.json();
			})
			.then((data) => {
				cryptoCard(data);
			})
			.catch((err) => console.log(err));
	}

	if (cryptoSettings.includes('Ethereum')) {
		fetch('https://api.coingecko.com/api/v3/coins/ethereum')
			.then((res) => {
				if (!res.ok) {
					throw Error('Something went wrong');
				}
				return res.json();
			})
			.then((data) => {
				cryptoCard(data);
			})
			.catch((err) => console.log(err));
	}

	if (cryptoSettings.includes('Dogecoin')) {
		fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
			.then((res) => {
				if (!res.ok) {
					throw Error('Something went wrong');
				}
				return res.json();
			})
			.then((data) => {
				cryptoCard(data);
			})
			.catch((err) => console.log(err));
	}
}

if (userSettings.includes('weather')) {
	if (JSON.parse(localStorage.getItem('locationEnabled'))) {
		navigator.geolocation.getCurrentPosition((position) => {
			fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
			)
				.then((res) => {
					if (!res.ok) {
						throw Error('Weather data not available');
					}
					return res.json();
				})
				.then((data) => {
					document.querySelector(
						'.weather'
					).innerHTML = `<img src=http://openweathermap.org/img/wn/${
						data.weather[0].icon
					}@2x.png>
										<p class="weather-temp">${Math.round(data.main.temp)}°F</p>
										<p class="weather-city">${data.name}</p>`;
				})
				.catch((err) => console.log(err));
		});
	} else if (localStorage.getItem('userCity')) {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=imperial`
		)
			.then((res) => {
				if (!res.ok) {
					throw Error('Weather data not available');
				}
				return res.json();
			})
			.then((data) => {
				document.querySelector(
					'.weather'
				).innerHTML = `<img src=http://openweathermap.org/img/wn/${
					data.weather[0].icon
				}@2x.png>
										<p class="weather-temp">${Math.round(data.main.temp)}°F</p>
										<p class="weather-city">${data.name}</p>`;
			})
			.catch((err) => console.log(err));
	}
}

if (userSettings.includes('quote')) {
	fetch('https://api.quotable.io/random')
		.then((res) => {
			if (!res.ok) {
				throw Error("Can't get quote");
			}
			return res.json();
		})
		.then((data) => {
			document.querySelector(
				'.quote'
			).innerHTML = `"${data.content}" - <b>${data.author}</b>`;
		});
}

function cryptoCard(data) {
	document.querySelector('.crypto').innerHTML += `
	<div class="crypto-card">
	<img src="${data.image.small}">
		                <p><b>${data.localization.en}</b></p>
		                <p><strong>Now</strong>🎯: $${data.market_data.current_price.usd.toFixed(
							2
						)}</p>
		                <p><strong>24H</strong>👆: $${data.market_data.high_24h.usd.toFixed(
							2
						)}</p>
		                <p><strong>24H</strong>👇: $${data.market_data.low_24h.usd.toFixed(
							2
						)}</p>
										</div>`;
}
