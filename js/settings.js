const cryptoBtn = document.querySelector('.crypto-btn');
const settingsContainer = document.querySelector('.settings-container');
const cryptoSettings = document.querySelector('.crypto-settings');
let cryptoEnable = document.querySelector('.crypto-enable');
let timeEnable = document.querySelector('.time-enable');
let weatherEnable = document.querySelector('.weather-enable');
let quoteEnable = document.querySelector('.quote-enable');
let bitcoinEnable = document.querySelector('.bitcoin-enable')
let ethereumEnable = document.querySelector('.ethereum-enable')
let dogecoinEnable = document.querySelector('.dogecoin-enable')
let enabledSettings = [];
let cryptoOptions = [];

document.querySelector('.return-btn').addEventListener('click', () => {
	settingsContainer.style.display = 'block';
	cryptoSettings.style.display = 'none';
});

cryptoBtn.addEventListener('click', () => {
	settingsContainer.style.display = 'none';
	cryptoSettings.style.display = 'block';
	if (localStorage.getItem('cryptoSettings')) {
		cryptoOptions = JSON.parse(localStorage.getItem('cryptoSettings'))
		cryptoOptions.includes('Bitcoin') ? '' : (bitcoinEnable.checked = false);
		cryptoOptions.includes('Ethereum') ? '' : (ethereumEnable.checked = false);
		cryptoOptions.includes('Dogecoin') ? '' : (dogecoinEnable.checked = false);
	} else if (localStorage.getItem('cryptoSettings') === null ){
			cryptoOptions = ['Bitcoin']
			cryptoOptions.includes('Bitcoin') ? '' : (ethereumEnable.checked = false) (dogecoinEnable.checked = false)
			localStorage.setItem('cryptoSettings', JSON.stringify(cryptoOptions))
		}	
});

cryptoEnable.addEventListener('click', () => {
	if (localStorage.getItem('cryptoSettings')) {

	} else {
		localStorage.setItem('cryptoSettings', JSON.stringify('Bitcoin'))
	}
})

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
	enabledSettings.includes('crypto') ? '' : (cryptoEnable.checked = false)
	localStorage.setItem('enabledSettings', JSON.stringify(enabledSettings))
}


if (localStorage.getItem('cryptoSettings')) {
		cryptoOptions = JSON.parse(localStorage.getItem('cryptoSettings'))
		cryptoOptions.includes('Bitcoin') ? '' : (bitcoinEnable.checked = false);
		cryptoOptions.includes('Ethereum') ? '' : (ethereumEnable.checked = false);
		cryptoOptions.includes('Dogecoin') ? '' : (dogecoinEnable.checked = false);
	} else if (localStorage.getItem('cryptoSettings') === null ){
			cryptoOptions = ['Bitcoin']
			cryptoOptions.includes('Bitcoin') ? '' : (ethereumEnable.checked = false) (dogecoinEnable.checked = false)
			localStorage.setItem('cryptoSettings', JSON.stringify(cryptoOptions))
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
