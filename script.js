let currentIndex = 0;

function showPhrase(index) {
  document.getElementById('en-text').innerText = phrases[index].en;
  document.getElementById('ar-text').innerText = phrases[index].ar;
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}

function speakCurrent() {
  speak(phrases[currentIndex].en);
}

function nextPhrase() {
  if (currentIndex < phrases.length - 1) {
    currentIndex++;
    showPhrase(currentIndex);
  }
}

function prevPhrase() {
  if (currentIndex > 0) {
    currentIndex--;
    showPhrase(currentIndex);
  }
}

function repeatPhrase() {
  speakCurrent();
}

// إظهار أول جملة عند التحميل
showPhrase(currentIndex);
