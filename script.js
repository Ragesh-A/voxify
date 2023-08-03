const userInp = document.getElementById('userInp');
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');


const synth = window.speechSynthesis;

let utterThis = new window.SpeechSynthesisUtterance();
utterThis.lang = 'en-Us';
utterThis.volume = 1;


playBtn.addEventListener('click', () => {
  if (synth.paused) {
    synth.resume();
  } else {
    console.log(userInp.value);
    utterThis.text = userInp.value;
    synth.speak(utterThis);
  }
})

stopBtn.addEventListener('click', () => {
  synth.pause()
})