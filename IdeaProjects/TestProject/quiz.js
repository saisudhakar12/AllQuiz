// Quiz logic with Admin Settings
const adminPage = document.getElementById('adminPage');
const themeSelect = document.getElementById('themeSelect');
const displayMode = document.getElementById('displayMode');
const questionRangeContainer = document.getElementById('questionRangeContainer');
const randomModeContainer = document.getElementById('randomModeContainer');
const rangeButtons = document.getElementById('rangeButtons');
const topicSelect = document.getElementById('topic');
const startBtn = document.getElementById('startBtn');
const quizSection = document.getElementById('quiz');
const questionText = document.getElementById('questionText');
const optionsForm = document.getElementById('optionsForm');
const qnum = document.getElementById('qnum');
const qtotal = document.getElementById('qtotal');
const nextBtn = document.getElementById('nextBtn');
const reveal = document.getElementById('reveal');
const letter = document.getElementById('letter');
const scorecard = document.getElementById('scorecard');
const scoreText = document.getElementById('scoreText');
const restartBtn = document.getElementById('restartBtn');
const topicTitle = document.getElementById('topicTitle');
const timerDisplay = document.getElementById('timer');
const answerReview = document.getElementById('answerReview');
const reviewContainer = document.getElementById('reviewContainer');

let questions = [];
let picked = [];
let current = 0;
let answers = [];
let selectedTopic = '';
let selectedTheme = 'default';
let timerInterval = null;
let timeElapsed = 0;
let selectedRange = null;

// Topic display names
const topicNames = {
  'chemistry.txt': 'Chemistry',
  'science.txt': 'Science',
  'astronomy.txt': 'Astronomy',
  'mahabharata.txt': 'Mahabharata',
  'social.txt': 'Social'
};

function applyTheme(theme) {
  selectedTheme = theme;
  document.body.className = `theme-${theme}`;
  localStorage.setItem('selectedTheme', theme);
}

themeSelect.addEventListener('change', (e) => {
  applyTheme(e.target.value);
});

displayMode.addEventListener('change', (e) => {
  if (e.target.value === 'serial') {
    questionRangeContainer.classList.remove('hidden');
    randomModeContainer.classList.add('hidden');
    generateRangeButtons();
  } else {
    questionRangeContainer.classList.add('hidden');
    randomModeContainer.classList.remove('hidden');
  }
});

function generateRangeButtons() {
  rangeButtons.innerHTML = '';
  for (let i = 1; i <= 10; i++) {
    const start = (i - 1) * 10 + 1;
    const end = i * 10;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'range-btn';
    btn.textContent = `${start} to ${end}`;
    btn.dataset.start = start;
    btn.dataset.end = end;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      selectRange(start, end, btn);
    });
    rangeButtons.appendChild(btn);
  }
}

function selectRange(start, end, btn) {
  // Remove active class from all buttons
  document.querySelectorAll('.range-btn').forEach(b => b.classList.remove('active'));
  // Add active class to clicked button
  btn.classList.add('active');
  selectedRange = { start, end };
}

function parseCSVLine(line){
  try {
    const parts = [];
    let cur = '';
    let inQuotes = false;
    for(let i=0;i<line.length;i++){
      const ch = line[i];
      if(ch === '"') { inQuotes = !inQuotes; continue; }
      if(ch === ',' && !inQuotes){
        parts.push(cur.trim());
        cur = '';
      } else {
        cur += ch;
      }
    }
    if(cur.length) parts.push(cur.trim());
    return parts;
  } catch(err) {
    throw new Error(`CSV parsing error on line: "${line}". Error: ${err.message}`);
  }
}

async function loadTopic(filename){
  try {
    const resp = await fetch('data/'+filename);
    if(!resp.ok) {
      throw new Error(`HTTP Error: ${resp.status} - Failed to load ${filename}`);
    }
    const text = await resp.text();
    if(!text.trim()) {
      throw new Error(`File is empty: ${filename}`);
    }
    const lines = text.split(/\r?\n/).map(l=>l.trim()).filter(l=>l && !l.startsWith('#'));
    const out = [];
    for(const line of lines){
      try {
        const cols = parseCSVLine(line);
        if(cols.length < 7) {
          console.warn('Skipping line with insufficient columns:', line);
          continue;
        }
        out.push({seq:cols[0], question:cols[1], a:cols[2], b:cols[3], c:cols[4], d:cols[5], correct:cols[6].toLowerCase()});
      } catch(lineErr) {
        console.warn('Error parsing line:', line, lineErr);
        continue;
      }
    }
    if(out.length === 0) {
      throw new Error(`No valid questions found in ${filename}`);
    }
    return out;
  } catch(err) {
    throw new Error(`Failed to load topic file (${filename}): ${err.message}`);
  }
}

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function startTimer() {
  timeElapsed = 0;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeElapsed++;
    const mins = Math.floor(timeElapsed / 60);
    const secs = timeElapsed % 60;
    timerDisplay.textContent =
      (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

async function startQuiz(){
  if (displayMode.value === 'serial') {
    if (!selectedRange) {
      alert('Please select a question range');
      return;
    }
  }

  const file = topicSelect.value;
  selectedTopic = file;

  try {
    const allQuestions = await loadTopic(file);

    if(allQuestions.length === 0){
      alert('No questions found for this topic');
      return;
    }

    if (displayMode.value === 'serial') {
      // Filter questions by range
      picked = allQuestions.filter(q => {
        const seq = parseInt(q.seq);
        return seq >= selectedRange.start && seq <= selectedRange.end;
      });
      if(picked.length === 0) {
        alert('No questions found in the selected range. Please select a different range.');
        return;
      }
    } else {
      // Random mode
      shuffle(allQuestions);
      picked = allQuestions.slice(0, Math.min(10, allQuestions.length));
    }

    answers = new Array(picked.length).fill(null);
    current = 0;
    qtotal.textContent = picked.length;

    topicTitle.textContent = topicNames[file] || file;
    adminPage.classList.add('hidden');
    quizSection.classList.remove('hidden');
    reveal.classList.add('hidden');

    startTimer();
    showQuestion();
  } catch(err){
    console.error('Quiz Load Error:', err);
    alert('Cannot load topic file:\n\n' + err.message + '\n\nMake sure you are running this from a local server, not from file:// protocol.');
  }
}

function showQuestion(){
  const q = picked[current];
  qnum.textContent = current+1;
  questionText.textContent = q.question;
  optionsForm.innerHTML = '';
  ['a','b','c','d'].forEach(opt=>{
    const id = `opt_${opt}`;
    const label = document.createElement('label');
    label.className = 'optionLabel';
    label.innerHTML = `<input type="radio" name="option" value="${opt}" id="${id}" ${answers[current]===opt? 'checked':''} /> <span class="optText">${q[opt]}</span>`;
    optionsForm.appendChild(label);
  });
  nextBtn.disabled = answers[current] === null;
  if(current === picked.length-1) nextBtn.textContent = 'Submit'; else nextBtn.textContent = 'Next';
}

optionsForm.addEventListener('change', ()=>{
  answers[current] = optionsForm.option.value;
  nextBtn.disabled = false;
});

nextBtn.addEventListener('click', ()=>{
  if(current === picked.length-1){
    submitQuiz();
    return;
  }
  if(!answers[current]){ alert('Please select an option'); return; }
  current++;
  showQuestion();
});

function submitQuiz(){
  stopTimer();

  let correct = 0;
  for(let i=0;i<picked.length;i++){
    if(answers[i] && answers[i].toLowerCase() === (picked[i].correct||'').toLowerCase()) correct++;
  }

  quizSection.classList.add('hidden');
  reveal.classList.remove('hidden');
  reveal.dataset.correctScore = correct;
  reveal.dataset.totalScore = picked.length;
  reveal.dataset.questions = JSON.stringify(picked);
  reveal.dataset.answers = JSON.stringify(answers);
}

letter.addEventListener('click', ()=>{
  const correct = parseInt(reveal.dataset.correctScore) || 0;
  const total = parseInt(reveal.dataset.totalScore) || 0;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  scoreText.textContent = `${correct} / ${total} (${percentage}%)`;

  // Generate answer review
  const questions = JSON.parse(reveal.dataset.questions || '[]');
  const userAnswers = JSON.parse(reveal.dataset.answers || '[]');

  reviewContainer.innerHTML = '';
  questions.forEach((q, i) => {
    const isCorrect = userAnswers[i] && userAnswers[i].toLowerCase() === q.correct.toLowerCase();
    const reviewItem = document.createElement('div');
    reviewItem.className = `review-item ${isCorrect ? 'correct' : 'wrong'}`;

    let answerHtml = `<div class="review-item-q">Q${i+1}: ${q.question}</div>`;
    answerHtml += `<div class="review-item-a user ${isCorrect ? 'correct' : ''}">Your answer: ${q[userAnswers[i]] || 'Not answered'}</div>`;
    if (!isCorrect) {
      answerHtml += `<div class="review-item-a correct">Correct answer: ${q[q.correct]}</div>`;
    }

    reviewItem.innerHTML = answerHtml;
    reviewContainer.appendChild(reviewItem);
  });

  answerReview.classList.remove('hidden');
  scorecard.classList.remove('hidden');
  setTimeout(()=>scorecard.classList.add('show'), 40);
  spawnConfetti();
});

restartBtn.addEventListener('click', ()=>{
  scorecard.classList.remove('show');
  setTimeout(()=> scorecard.classList.add('hidden'), 500);
  reveal.classList.add('hidden');
  adminPage.classList.remove('hidden');
  selectedRange = null;
  // Reset range buttons
  document.querySelectorAll('.range-btn').forEach(b => b.classList.remove('active'));
});

function spawnConfetti(){
  const conf = document.createElement('div');
  conf.className = 'confetti';
  document.body.appendChild(conf);
  const emojis = ['🎉','✨','💥','🎊','🪩','🥳'];
  for(let i=0;i<24;i++){
    const s = document.createElement('span');
    s.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    s.style.left = (50 + (Math.random()*60 - 30)) + '%';
    s.style.top = (Math.random()*10) + 'vh';
    s.style.fontSize = (12 + Math.random()*30) + 'px';
    s.style.animationDelay = (Math.random()*0.6) + 's';
    s.style.transform = `translateX(${(Math.random()*160-80)}px)`;
    conf.appendChild(s);
    setTimeout(()=> s.remove(), 2200 + Math.random()*800);
  }
  setTimeout(()=> conf.remove(), 3200);
}

// Load saved theme on page load
const savedTheme = localStorage.getItem('selectedTheme') || 'default';
applyTheme(savedTheme);
themeSelect.value = savedTheme;

// Start buttons
startBtn.addEventListener('click', startQuiz);

// Initialize display mode
displayMode.dispatchEvent(new Event('change'));


