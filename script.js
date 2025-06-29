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

let currentIndex = 0;

// استدعاء المفضلة من التخزين المحلي أو إنشاء مصفوفة جديدة
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function showPhrase(index) {
  currentIndex = index;
  document.getElementById('en-text').innerText = phrases[index].en;
  document.getElementById('ar-text').innerText = phrases[index].ar;
  updateFavoriteIcon();
}

function updateFavoriteIcon() {
  const favBtn = document.getElementById('fav-btn');
  const current = phrases[currentIndex];
  // هل الجملة الحالية في المفضلة؟
  const isFav = favorites.some(p => p.en === current.en);
  if (isFav) {
    favBtn.classList.add('favorited');
  } else {
    favBtn.classList.remove('favorited');
  }
}

function toggleFavorite() {
  const current = phrases[currentIndex];
  const indexInFav = favorites.findIndex(p => p.en === current.en);
  if (indexInFav > -1) {
    // حذف من المفضلة
    favorites.splice(indexInFav, 1);
  } else {
    // إضافة للمفضلة
    favorites.push(current);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoriteIcon();
  alert('تم تحديث المفضلة!');
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
    showPhrase(currentIndex + 1);
  }
}

function prevPhrase() {
  if (currentIndex > 0) {
    showPhrase(currentIndex - 1);
  }
}

function repeatPhrase() {
  speakCurrent();
}

// عرض أول جملة عند التحميل
showPhrase(currentIndex);
