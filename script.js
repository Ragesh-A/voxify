const userInp = document.getElementById('userInp');
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const voicesSelect = document.getElementById('voices');

if ('speechSynthesis' in window) {
	init();
} else {
	alert('Speech Synthesis API not supported in this browser.');
}

function init() {
	const synth = window.speechSynthesis;

	synth.onvoiceschanged = function () {
		const voices = synth.getVoices();

		voices.forEach((voice) => {
			const option = document.createElement('option');
			option.value = voice.lang;
			option.textContent = voice.name;
			voicesSelect.append(option);
		});
	};

	const utterThis = new window.SpeechSynthesisUtterance();
	utterThis.lang = 'en-Us';
	utterThis.volume = 1;

	voicesSelect.addEventListener('change', () => {
		const selectedVoice = voicesSelect.value;
		const voice = synth.getVoices().find((v) => v.lang === selectedVoice);
		if (voice) {
			utterThis.voice = voice;
		}
	});

	playBtn.addEventListener('click', () => {
		const textToSpeak = userInp.value.trim()
		if (!textToSpeak) return;
		if (synth.paused) {
			synth.resume();
		} else {
			utterThis.text = textToSpeak;
			synth.speak(utterThis);
		}
	});

	stopBtn.addEventListener('click', () => {
		synth.pause();
	});
}
