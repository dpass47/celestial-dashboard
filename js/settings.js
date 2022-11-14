const cryptoBtn = document.querySelector('.crypto-btn');
const settingsContainer = document.querySelector('.settings-container');
const cryptoSettings = document.querySelector('.crypto-settings');
let cryptoEnable = document.querySelector('.crypto-enable');
let timeEnable = document.querySelector('.time-enable');
let weatherEnable = document.querySelector('.weather-enable');
let quoteEnable = document.querySelector('.quote-enable');

document.querySelector('.return-btn').addEventListener('click', () => {
	settingsContainer.style.display = 'block';
	cryptoSettings.style.display = 'none';
});

cryptoBtn.addEventListener('click', () => {
	settingsContainer.style.display = 'none';
	cryptoSettings.style.display = 'block';
});

var checkboxes = document.querySelectorAll(
	'input[type=checkbox][name=main-settings]'
);

let enabledSettings = [];

if (localStorage.getItem('enabledSettings')) {
	enabledSettings = JSON.parse(localStorage.getItem('enabledSettings'));
	enabledSettings.includes('time') ? '' : (timeEnable.checked = false);
	enabledSettings.includes('crypto') ? '' : (cryptoEnable.checked = false);
	enabledSettings.includes('weather') ? '' : (weatherEnable.checked = false);
	enabledSettings.includes('quote') ? '' : (quoteEnable.checked = false);
	console.log(enabledSettings);
} else {
	enabledSettings = ['time, crypto, quote, weather'];
}

checkboxes.forEach(function (checkbox) {
	checkbox.addEventListener('change', function () {
		document.querySelector('.settings-prompt').textContent =
			'Settings available upon refresh';
		enabledSettings = Array.from(checkboxes)
			.filter((i) => i.checked)
			.map((i) => i.value);

		localStorage.setItem('enabledSettings', JSON.stringify(enabledSettings));
	});
});

let cryptoOptions = [];

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
