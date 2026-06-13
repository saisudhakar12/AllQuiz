// Quiz Application - No Server Required (Embedded Data)
// All quiz data is embedded directly in this file

const adminPage = document.getElementById('adminPage');
const themeSelect = document.getElementById('themeSelect');
const displayMode = document.getElementById('displayMode');
const questionRangeContainer = document.getElementById('questionRangeContainer');
const randomModeContainer = document.getElementById('randomModeContainer');
const rangeSelect = document.getElementById('rangeSelect');
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
  'chemistry': 'Chemistry',
  'science': 'Science',
  'astronomy': 'Astronomy',
  'mahabharata': 'Mahabharata',
  'social': 'Social'
};

// ===== EMBEDDED QUIZ DATA =====
// All quiz questions are embedded directly in this file for GitHub compatibility

const quizData = {
  chemistry: [
    {seq: '1', question: 'What is the chemical symbol for water?', a: 'H2O', b: 'CO2', c: 'O2', d: 'NaCl', correct: 'a'},
    {seq: '2', question: 'Which gas is responsible for the greenhouse effect?', a: 'Oxygen', b: 'Nitrogen', c: 'Carbon dioxide', d: 'Helium', correct: 'c'},
    {seq: '3', question: 'What is the pH of pure water at 25°C?', a: '7', b: '1', c: '14', d: '0', correct: 'a'},
    {seq: '4', question: 'Avogadro\'s number is approximately?', a: '6.02e23', b: '3.14', c: '9.81', d: '1.6e-19', correct: 'a'},
    {seq: '5', question: 'Which element has atomic number 6?', a: 'Carbon', b: 'Oxygen', c: 'Nitrogen', d: 'Helium', correct: 'a'},
    {seq: '6', question: 'What is the process of converting a liquid to vapor called?', a: 'Condensation', b: 'Evaporation', c: 'Sublimation', d: 'Freezing', correct: 'b'},
    {seq: '7', question: 'Which bond involves sharing of electron pairs?', a: 'Ionic', b: 'Hydrogen', c: 'Covalent', d: 'Metallic', correct: 'c'},
    {seq: '8', question: 'Which acid is present in stomach?', a: 'Hydrochloric acid', b: 'Sulfuric acid', c: 'Acetic acid', d: 'Nitric acid', correct: 'a'},
    {seq: '9', question: 'What is the common name for sodium bicarbonate?', a: 'Baking powder', b: 'Baking soda', c: 'Table salt', d: 'Plaster', correct: 'b'},
    {seq: '10', question: 'Which metal is liquid at room temperature?', a: 'Mercury', b: 'Iron', c: 'Aluminum', d: 'Gold', correct: 'a'},
    {seq: '11', question: 'Which polymer is used to make plastic bags?', a: 'Polyethylene', b: 'Polypropylene', c: 'Nylon', d: 'PVC', correct: 'a'},
    {seq: '12', question: 'What is the formula of table salt?', a: 'NaCl', b: 'KCl', c: 'CaCl2', d: 'MgCl2', correct: 'a'}
  ],
  science: [
    {seq: '1', question: 'What is the force that pulls objects toward Earth?', a: 'Magnetism', b: 'Gravity', c: 'Friction', d: 'Thrust', correct: 'b'},
    {seq: '2', question: 'Light travels faster in which medium?', a: 'Glass', b: 'Vacuum', c: 'Water', d: 'Air', correct: 'b'},
    {seq: '3', question: 'What is the unit of electric current?', a: 'Volt', b: 'Ohm', c: 'Ampere', d: 'Henry', correct: 'c'},
    {seq: '4', question: 'Which organelle is the powerhouse of the cell?', a: 'Nucleus', b: 'Ribosome', c: 'Mitochondria', d: 'Chloroplast', correct: 'c'},
    {seq: '5', question: 'Sound is a form of which type of wave?', a: 'Electromagnetic', b: 'Transverse', c: 'Longitudinal', d: 'Stationary', correct: 'c'},
    {seq: '6', question: 'Which planet is known for its rings?', a: 'Jupiter', b: 'Saturn', c: 'Mars', d: 'Venus', correct: 'b'},
    {seq: '7', question: 'What does DNA stand for?', a: 'Deoxyribonucleic acid', b: 'Deoxyribose nucleic acid', c: 'Ribonucleic acid', d: 'Deoxynucleic acid', correct: 'a'},
    {seq: '8', question: 'What is the speed of light approx (m/s)?', a: '3x10^8', b: '1x10^6', c: '9.8', d: '1.6x10^-19', correct: 'a'},
    {seq: '9', question: 'Which gas do plants release during photosynthesis?', a: 'Nitrogen', b: 'Oxygen', c: 'Carbon dioxide', d: 'Hydrogen', correct: 'b'},
    {seq: '10', question: 'What is renewable energy from sun called?', a: 'Hydropower', b: 'Solar power', c: 'Wind power', d: 'Geothermal', correct: 'b'},
    {seq: '11', question: 'What particle has a negative charge?', a: 'Proton', b: 'Neutron', c: 'Electron', d: 'Photon', correct: 'c'},
    {seq: '12', question: 'The study of living organisms is called?', a: 'Chemistry', b: 'Biology', c: 'Physics', d: 'Geology', correct: 'b'}
  ],
  astronomy: [
    {seq: '1', question: 'Which is the star at the center of our solar system?', a: 'Moon', b: 'Sun', c: 'Sirius', d: 'Polaris', correct: 'b'},
    {seq: '2', question: 'Which planet is known as the Red Planet?', a: 'Earth', b: 'Mars', c: 'Venus', d: 'Jupiter', correct: 'b'},
    {seq: '3', question: 'What galaxy is Earth located in?', a: 'Andromeda', b: 'Milky Way', c: 'Triangulum', d: 'Whirlpool', correct: 'b'},
    {seq: '4', question: 'What is a light-year?', a: 'Unit of time', b: 'Unit of distance', c: 'Unit of mass', d: 'Type of star', correct: 'b'},
    {seq: '5', question: 'Which planet has the most moons?', a: 'Earth', b: 'Mars', c: 'Saturn', d: 'Venus', correct: 'c'},
    {seq: '6', question: 'What do we call a rock from space that reaches Earth\'s surface?', a: 'Asteroid', b: 'Meteor', c: 'Comet', d: 'Satellite', correct: 'b'},
    {seq: '7', question: 'What is the nearest star to Earth after the Sun?', a: 'Proxima Centauri', b: 'Sirius', c: 'Alpha Centauri', d: 'Betelgeuse', correct: 'a'},
    {seq: '8', question: 'What causes a solar eclipse?', a: 'Moon between Earth and Sun', b: 'Earth between Sun and Moon', c: 'Sun between Earth and Moon', d: 'Sun behind Moon', correct: 'a'},
    {seq: '9', question: 'What is the shape of most planetary orbits?', a: 'Circular', b: 'Parabolic', c: 'Elliptical', d: 'Hyperbolic', correct: 'c'},
    {seq: '10', question: 'What do we call a newborn star?', a: 'Red giant', b: 'Protostar', c: 'White dwarf', d: 'Supernova', correct: 'b'},
    {seq: '11', question: 'Which telescope revolutionized astronomy since space observations?', a: 'Hubble Space Telescope', b: 'Kepler', c: 'Chandra', d: 'James Webb', correct: 'a'},
    {seq: '12', question: 'What is a supernova?', a: 'Dying planet', b: 'Exploding star', c: 'New galaxy', d: 'Black hole formation', correct: 'b'}
  ],
  mahabharata: [
    {seq: '1', question: 'Who is the eldest of the Pandavas?', a: 'Yudhisthira', b: 'Bhima', c: 'Arjuna', d: 'Nakula', correct: 'a'},
    {seq: '2', question: 'Who is the mother of the Pandavas?', a: 'Kunti', b: 'Draupadi', c: 'Satyavati', d: 'Gandhari', correct: 'a'},
    {seq: '3', question: 'Who fought with Karna in the Kurukshetra war and ultimately killed him?', a: 'Arjuna', b: 'Bhima', c: 'Yudhisthira', d: 'Abhimanyu', correct: 'a'},
    {seq: '4', question: 'Who was the teacher of both Kauravas and Pandavas in martial arts?', a: 'Drona', b: 'Bhishma', c: 'Kripa', d: 'Parashurama', correct: 'a'},
    {seq: '5', question: 'Which weapon did Arjuna obtain from Lord Shiva?', a: 'Pashupata', b: 'Brahmastra', c: 'Agneyastra', d: 'Varunastra', correct: 'a'},
    {seq: '6', question: 'Who is the author of the Mahabharata?', a: 'Vyasa', b: 'Brahma', c: 'Vishnu', d: 'Shiva', correct: 'a'},
    {seq: '7', question: 'Who killed Duryodhana?', a: 'Bhima', b: 'Arjuna', c: 'Yudhisthira', d: 'Shikhandi', correct: 'a'},
    {seq: '8', question: 'What is the name of the Pandavas\' mother who married Pandu?', a: 'Kunti', b: 'Satyavati', c: 'Gandhari', d: 'Draupadi', correct: 'a'},
    {seq: '9', question: 'Who was the charioteer of Arjuna who narrated the Bhagavad Gita?', a: 'Krishna', b: 'Sanjaya', c: 'Subhadra', d: 'Kripacharya', correct: 'b'},
    {seq: '10', question: 'Who was blind king of Hastinapur?', a: 'Dhritarashtra', b: 'Pandu', c: 'Bhishma', d: 'Drona', correct: 'a'},
    {seq: '11', question: 'Which warrior had the boon of not being killed by any man but was killed by a woman?', a: 'Bhishma', b: 'Barbarika', c: 'Shikhandi', d: 'Abhimanyu', correct: 'c'},
    {seq: '12', question: 'Who is known for his devotion to Lord Krishna and is a key ally of Pandavas?', a: 'Sahadeva', b: 'Kripa', c: 'Arjuna', d: 'Subhadra', correct: 'c'}
  ],
  social: [
    {seq: '1', question: 'What is the capital of India?', a: 'Mumbai', b: 'New Delhi', c: 'Kolkata', d: 'Chennai', correct: 'b'},
    {seq: '2', question: 'Which movement fought for India\'s independence using non-violence?', a: 'Quit India', b: 'Non-Cooperation', c: 'Civil Disobedience', d: 'Swadeshi', correct: 'c'},
    {seq: '3', question: 'Which is a fundamental right in many democracies?', a: 'Freedom of speech', b: 'Right to fly', c: 'Right to be invisible', d: 'Right to unlimited wealth', correct: 'a'},
    {seq: '4', question: 'What does GDP measure?', a: 'Population', b: 'Wealth produced in an economy', c: 'Number of schools', d: 'Number of holidays', correct: 'b'},
    {seq: '5', question: 'Which body makes laws in a country?', a: 'Judiciary', b: 'Executive', c: 'Legislature', d: 'Administration', correct: 'c'},
    {seq: '6', question: 'Which is an example of primary sector activity?', a: 'Banking', b: 'Mining', c: 'Software development', d: 'Healthcare', correct: 'b'},
    {seq: '7', question: 'What is a constitution?', a: 'A book of recipes', b: 'A set of fundamental rules and laws', c: 'A fiction novel', d: 'A travel guide', correct: 'b'},
    {seq: '8', question: 'Which event is celebrated as Republic Day in India?', a: 'Independence from Britain', b: 'Adoption of the Constitution', c: 'Treaty signing', d: 'First Election', correct: 'b'},
    {seq: '9', question: 'What is census used for?', a: 'Counting livestock', b: 'Measuring temperatures', c: 'Counting population', d: 'Measuring rainfall', correct: 'c'},
    {seq: '10', question: 'Which right protects people from unfair detention?', a: 'Right to property', b: 'Right to personal liberty', c: 'Right to unlimited speech', d: 'Right to travel', correct: 'b'},
    {seq: '11', question: 'What is social science study?', a: 'Physical laws', b: 'Human society and relationships', c: 'Plant growth', d: 'Space exploration', correct: 'b'},
    {seq: '12', question: 'Which institution resolves civil disputes?', a: 'Police', b: 'Courts', c: 'Parliament', d: 'Schools', correct: 'b'}
  ]
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
    generateRangeDropdown();
  } else {
    questionRangeContainer.classList.add('hidden');
    randomModeContainer.classList.remove('hidden');
  }
});

function generateRangeDropdown() {
  rangeSelect.innerHTML = '<option value="">-- Choose a range --</option>';
  for (let i = 1; i <= 10; i++) {
    const start = (i - 1) * 10 + 1;
    const end = i * 10;
    const option = document.createElement('option');
    option.value = JSON.stringify({ start, end });
    option.textContent = `Questions ${start} to ${end}`;
    rangeSelect.appendChild(option);
  }
}

rangeSelect.addEventListener('change', (e) => {
  if (e.target.value) {
    selectedRange = JSON.parse(e.target.value);
  } else {
    selectedRange = null;
  }
});

function parseCSVLine(line){
  // Not needed anymore since data is embedded
  return [];
}

function loadTopic(topicKey){
  // Load data directly from embedded quizData object
  return quizData[topicKey] || [];
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
    // Load directly from embedded data (no fetch needed!)
    const allQuestions = loadTopic(file);

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
    alert('Error starting quiz:\n\n' + err.message);
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


