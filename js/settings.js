/* Copyright (c) 2024 Dante Passalacqua */

const cryptoBtn = document.querySelector('.crypto-btn');
const settingsContainer = document.querySelector('.settings-container');
const cryptoSettings = document.querySelector('.crypto-settings');
const weatherSettings = document.querySelector('.weather-settings');
const weatherBtn = document.querySelector('.weather-btn');
const cryptoEnable = document.querySelector('.crypto-enable');
const timeEnable = document.querySelector('.time-enable');
const weatherEnable = document.querySelector('.weather-enable');
const quoteEnable = document.querySelector('.quote-enable');
const bitcoinEnable = document.querySelector('.bitcoin-enable');
const ethereumEnable = document.querySelector('.ethereum-enable');
const dogecoinEnable = document.querySelector('.dogecoin-enable');
const userLocationText = document.querySelector('.user-location-text');
const userLocationSettings = document.querySelector('.user-location-settings');
const userLocationEnable = document.querySelector('.user-location-enable');
const saveWeatherBtn = document.querySelector('.save-weather-btn');
const returnBtn = document.querySelectorAll('.return-btn');
let enabledSettings = [];
let cryptoOptions = [];

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
		cryptoSettings.style.display = 'none';
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
	JSON.stringify(localStorage.setItem('userCity', userLocationText.value));
});

if (localStorage.getItem('userCity')) {
	userLocationText.value = localStorage.getItem('userCity');
}

cryptoBtn.addEventListener('click', () => {
	settingsContainer.style.display = 'none';
	cryptoSettings.style.display = 'block';
	if (localStorage.getItem('cryptoSettings')) {
		cryptoOptions = JSON.parse(localStorage.getItem('cryptoSettings'));
		cryptoOptions.includes('Bitcoin')
			? ''
			: (bitcoinEnable.checked = false);
		cryptoOptions.includes('Ethereum')
			? ''
			: (ethereumEnable.checked = false);
		cryptoOptions.includes('Dogecoin')
			? ''
			: (dogecoinEnable.checked = false);
	} else if (localStorage.getItem('cryptoSettings') === null) {
		cryptoOptions = ['Bitcoin'];
		cryptoOptions.includes('Bitcoin')
			? ''
			: (ethereumEnable.checked = false)(
					(dogecoinEnable.checked = false)
			  );
		localStorage.setItem('cryptoSettings', JSON.stringify(cryptoOptions));
	}
});

cryptoEnable.addEventListener('click', () => {
	if (localStorage.getItem('cryptoSettings')) {
	} else {
		localStorage.setItem('cryptoSettings', JSON.stringify('Bitcoin'));
	}
});

var checkboxes = document.querySelectorAll(
	'input[type=checkbox][name=main-settings]'
);

if (localStorage.getItem('enabledSettings')) {
	enabledSettings = JSON.parse(localStorage.getItem('enabledSettings'));
	enabledSettings.includes('time') ? '' : (timeEnable.checked = false);
	enabledSettings.includes('crypto') ? '' : (cryptoEnable.checked = false);
	enabledSettings.includes('weather') ? '' : (weatherEnable.checked = false);
	enabledSettings.includes('quote') ? '' : (quoteEnable.checked = false);
} else {
	enabledSettings = ['time, quote, weather'];
	enabledSettings.includes('crypto') ? '' : (cryptoEnable.checked = false);
	localStorage.setItem('enabledSettings', JSON.stringify(enabledSettings));
}

if (localStorage.getItem('cryptoSettings')) {
	cryptoOptions = JSON.parse(localStorage.getItem('cryptoSettings'));
	cryptoOptions.includes('Bitcoin') ? '' : (bitcoinEnable.checked = false);
	cryptoOptions.includes('Ethereum') ? '' : (ethereumEnable.checked = false);
	cryptoOptions.includes('Dogecoin') ? '' : (dogecoinEnable.checked = false);
} else if (localStorage.getItem('cryptoSettings') === null) {
	cryptoOptions = ['Bitcoin'];
	cryptoOptions.includes('Bitcoin')
		? ''
		: (ethereumEnable.checked = false)((dogecoinEnable.checked = false));
	localStorage.setItem('cryptoSettings', JSON.stringify(cryptoOptions));
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

var cryptoCheckboxes = document.querySelectorAll(
	'input[type=checkbox][name=crypto-checkbox]'
);

cryptoCheckboxes.forEach(function (checkbox) {
	checkbox.addEventListener('change', function () {
		document.querySelector('.settings-prompt-crypto').textContent =
			'Settings available upon refresh';
		cryptoOptions = Array.from(cryptoCheckboxes)
			.filter((i) => i.checked)
			.map((i) => i.value);

		localStorage.setItem('cryptoSettings', JSON.stringify(cryptoOptions));
	});
});
