// Quiz logic
const startBtn = document.getElementById('startBtn');
const topicSelect = document.getElementById('topic');
const quizSection = document.getElementById('quiz');
const intro = document.getElementById('intro');
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

let questions = [];
let picked = [];
let current = 0;
let answers = [];

function parseCSVLine(line){
  // Split commas not inside quotes
  const parts = [];
  let cur = '';
  let inQuotes = false;
  for(let i=0;i<line.length;i++){
    const ch = line[i];
    if(ch === '"') { inQuotes = !inQuotes; continue; }
    if(ch === ',' && !inQuotes){ parts.push(cur.trim()); cur = ''; }
    else cur += ch;
  }
  if(cur.length) parts.push(cur.trim());
  return parts;
}

async function loadTopic(filename){
  const resp = await fetch('data/'+filename);
  if(!resp.ok) throw new Error('Failed to load data file');
  const text = await resp.text();
  const lines = text.split(/\r?\n/).map(l=>l.trim()).filter(l=>l && !l.startsWith('#'));
  const out = [];
  for(const line of lines){
    const cols = parseCSVLine(line);
    // Expect: seq, question, a, b, c, d, correct
    if(cols.length < 7) continue;
    out.push({seq:cols[0], question:cols[1], a:cols[2], b:cols[3], c:cols[4], d:cols[5], correct:cols[6].toLowerCase()});
  }
  return out;
}

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function startQuiz(){
  const file = topicSelect.value;
  loadTopic(file).then(list=>{
    questions = list;
    if(questions.length===0){ alert('No questions found for this topic'); return; }
    shuffle(questions);
    picked = questions.slice(0, Math.min(10, questions.length));
    answers = new Array(picked.length).fill(null);
    current = 0;
    qtotal.textContent = picked.length;
    intro.classList.add('hidden');
    quizSection.classList.remove('hidden');
    reveal.classList.add('hidden');
    showQuestion();
  }).catch(err=>{alert('Cannot load topic file: '+err)});
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
  // enable/disable next button depending on selection
  nextBtn.disabled = answers[current] === null;
  if(current === picked.length-1) nextBtn.textContent = 'Submit'; else nextBtn.textContent = 'Next';
}

optionsForm.addEventListener('change', ()=>{
  answers[current] = optionsForm.option.value;
  nextBtn.disabled = false;
});

nextBtn.addEventListener('click', ()=>{
  // if last, submit
  if(current === picked.length-1){
    submitQuiz();
    return;
  }
  // ensure selected
  if(!answers[current]){ alert('Please select an option'); return; }
  current++;
  showQuestion();
});

function submitQuiz(){
  // calculate score
  let correct = 0;
  for(let i=0;i<picked.length;i++){
    if(answers[i] && answers[i].toLowerCase() === (picked[i].correct||'').toLowerCase()) correct++;
  }
  // show letter to reveal
  quizSection.classList.add('hidden');
  reveal.classList.remove('hidden');
  // store score for reveal
  reveal.dataset.score = `${correct} / ${picked.length}`;
}

letter.addEventListener('click', ()=>{
  // animate reveal: show scorecard and confetti
  scoreText.textContent = reveal.dataset.score || '0 / 0';
  scorecard.classList.remove('hidden');
  // add class to show animations
  setTimeout(()=>scorecard.classList.add('show'), 40);
  // spawn confetti particles
  spawnConfetti();
});

restartBtn.addEventListener('click', ()=>{
  // reset UI
  scorecard.classList.remove('show');
  setTimeout(()=> scorecard.classList.add('hidden'), 500);
  reveal.classList.add('hidden');
  intro.classList.remove('hidden');
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
    // schedule removal
    setTimeout(()=> s.remove(), 2200 + Math.random()*800);
  }
  setTimeout(()=> conf.remove(), 3200);
}

startBtn.addEventListener('click', startQuiz);

// Helpful note: when running from file:// some browsers block fetch. Use a local server if needed.


