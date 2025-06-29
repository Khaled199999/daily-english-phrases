let currentIndex = 0;

// استدعاء المفضلة من التخزين المحلي أو إنشاء مصفوفة جديدة
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function showPhrase(index) {
  currentIndex = index;
  document.getElementById('en-text').innerText = phrases[index].en;
  document.getElementById('ar-text').innerText = phrases[index].ar;
  updateFavoriteIcon();
}
function showPhrase(index) {
  currentIndex = index;
  document.getElementById('en-text').innerText = phrases[index].en;
  document.getElementById('ar-text').innerText = phrases[index].ar;
  updateFavoriteIcon();
  updateProgress();  // ← هذه الإضافة
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

function updateProgress() {
  const progressText = document.getElementById('progress-text');
  const progressBarFill = document.getElementById('progress-bar-fill');
  
  progressText.textContent = `${currentIndex + 1} / ${phrases.length}`;
  
  const progressPercent = ((currentIndex + 1) / phrases.length) * 100;
  progressBarFill.style.width = progressPercent + '%';
}
function toggleFavoritesSidebar() {
  const sidebar = document.getElementById('favorites-sidebar');
  if (sidebar.classList.contains('visible')) {
    sidebar.classList.remove('visible');
  } else {
    renderFavorites();
    sidebar.classList.add('visible');
  }
}

function renderFavorites() {
  const list = document.getElementById('favorites-list');
  list.innerHTML = '';
  if (favorites.length === 0) {
    list.innerHTML = '<li>لا توجد جمل مفضلة بعد.</li>';
    return;
  }
  favorites.forEach((phrase, index) => {
    const li = document.createElement('li');
    li.textContent = phrase.en + ' - ' + phrase.ar;
    li.style.cursor = 'pointer';
    li.onclick = () => {
      showPhrase(phrases.findIndex(p => p.en === phrase.en));
      toggleFavoritesSidebar();
    };
    list.appendChild(li);
  });
}
