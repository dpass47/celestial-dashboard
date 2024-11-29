/* Copyright (c) 2024 Dante Passalacqua */

const settingsContainer = document.querySelector('.settings-container');
const weatherSettings = document.querySelector('.weather-settings');
const weatherBtn = document.querySelector('.weather-btn');
const timeEnable = document.querySelector('.time-enable');
const weatherEnable = document.querySelector('.weather-enable');
const quoteEnable = document.querySelector('.quote-enable');
const userLocationText = document.querySelector('.user-location-text');
const userLocationSettings = document.querySelector('.user-location-settings');
const userLocationEnable = document.querySelector('.user-location-enable');
const saveWeatherBtn = document.querySelector('.save-weather-btn');
const returnBtn = document.querySelectorAll('.return-btn');
let enabledSettings = [];

if (JSON.parse(localStorage.getItem('locationEnabled'))) {
	userLocationEnable.checked = true;
	userLocationSettings.style.display = 'none';
} else {
	userLocationEnable.checked = false;
	userLocationSettings.style.display = 'block';
}

for (let i = 0; i < returnBtn.length; i++) {
	returnBtn[i].addEventListener('click', () => {
		settingsContainer.style.display = 'block';
		weatherSettings.style.display = 'none';
	});
}

weatherBtn.addEventListener('click', () => {
	settingsContainer.style.display = 'none';
	weatherSettings.style.display = 'block';
});

userLocationEnable.addEventListener('click', () => {
	document.querySelector('.settings-prompt-weather').textContent =
		'Settings available upon refresh';
	if (userLocationEnable.checked) {
		userLocationSettings.style.display = 'none';
		localStorage.setItem('locationEnabled', JSON.stringify(true));
	} else {
		userLocationSettings.style.display = 'block';
		localStorage.setItem('locationEnabled', JSON.stringify(false));
	}
});

saveWeatherBtn.addEventListener('click', () => {
	JSON.stringify(
		localStorage.setItem('userLocation', userLocationText.value)
	);
});

if (localStorage.getItem('userLocation')) {
	userLocationText.value = localStorage.getItem('userLocation');
}

var checkboxes = document.querySelectorAll(
	'input[type=checkbox][name=main-settings]'
);

if (localStorage.getItem('enabledSettings')) {
	enabledSettings = JSON.parse(localStorage.getItem('enabledSettings'));
	enabledSettings.includes('time') ? '' : (timeEnable.checked = false);
	enabledSettings.includes('weather') ? '' : (weatherEnable.checked = false);
	enabledSettings.includes('quote') ? '' : (quoteEnable.checked = false);
} else {
	enabledSettings = ['time, quote, weather'];
	localStorage.setItem('enabledSettings', JSON.stringify(enabledSettings));
}

checkboxes.forEach(function (checkbox) {
	checkbox.addEventListener('change', function () {
		document.querySelector('.settings-prompt').textContent =
			'Settings available upon refresh';
		enabledSettings = Array.from(checkboxes)
			.filter((i) => i.checked)
			.map((i) => i.value);

		localStorage.setItem(
			'enabledSettings',
			JSON.stringify(enabledSettings)
		);
	});
});
