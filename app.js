// タイピングれんしゅう - MVP
// ① ひらがな（ローマ字でうつ）→ ② アルファベット → ③ ローマ字

const STORAGE_KEY = 'typingPractice:v1';
const SETTINGS_KEY = 'typingPractice:settings:v1';

const MODES = {
  kana: {
    label: 'ひらがな',
    levels: [
      { id: 'vowels', name: '母音（a i u e o）' },
      { id: 'ka', name: 'か行（ka ki ku ke ko）' },
      { id: 'sa', name: 'さ行（sa shi/si su se so）' },
      { id: 'ta', name: 'た行（ta chi/ti tsu/tu te to）' },
      { id: 'na', name: 'な行（na ni nu ne no）' },
      { id: 'ha', name: 'は行（ha hi fu/hu he ho）' },
      { id: 'ma', name: 'ま行（ma mi mu me mo）' },
      { id: 'ya', name: 'や行（ya yu yo）' },
      { id: 'ra', name: 'ら行（ra ri ru re ro）' },
      { id: 'wa', name: 'わ行（wa wo/o n）' },
      { id: 'dakuten', name: '濁音（が/ざ/だ/ば）' },
      { id: 'handakuten', name: '半濁音（ぱ行）' },
      { id: 'yoon', name: '拗音（きゃ/しゃ/ちゃ…）' },
      { id: 'sokuon', name: '促音（っ + か/さ/た/ぱ…）' },
    ],
  },
  alpha: {
    label: 'アルファベット',
    levels: [
      { id: 'home', name: 'ホームポジション（A S D F J K L）' },
      { id: 'az', name: 'A〜Z（ぜんぶ）' },
    ],
  },
  romaji: {
    label: 'ローマ字',
    levels: [
      { id: 'words', name: 'たんご（やさしい）' },
      { id: 'sentences', name: 'ぶんしょう（かんたん）' },
    ],
  },
};

// Kana prompt -> accepted roman input (simple table; can expand later)
// ro: string[] (複数のローマ字表記を許容)
const KANA_TABLE = {
  vowels: [
    { jp: 'あ', ro: ['a'] }, { jp: 'い', ro: ['i'] }, { jp: 'う', ro: ['u'] }, { jp: 'え', ro: ['e'] }, { jp: 'お', ro: ['o'] },
  ],
  ka: [
    { jp: 'か', ro: ['ka'] }, { jp: 'き', ro: ['ki'] }, { jp: 'く', ro: ['ku'] }, { jp: 'け', ro: ['ke'] }, { jp: 'こ', ro: ['ko'] },
  ],
  sa: [
    { jp: 'さ', ro: ['sa'] }, { jp: 'し', ro: ['shi','si'] }, { jp: 'す', ro: ['su'] }, { jp: 'せ', ro: ['se'] }, { jp: 'そ', ro: ['so'] },
  ],
  ta: [
    { jp: 'た', ro: ['ta'] }, { jp: 'ち', ro: ['chi','ti'] }, { jp: 'つ', ro: ['tsu','tu'] }, { jp: 'て', ro: ['te'] }, { jp: 'と', ro: ['to'] },
  ],
  na: [
    { jp: 'な', ro: ['na'] }, { jp: 'に', ro: ['ni'] }, { jp: 'ぬ', ro: ['nu'] }, { jp: 'ね', ro: ['ne'] }, { jp: 'の', ro: ['no'] },
  ],
  ha: [
    { jp: 'は', ro: ['ha'] }, { jp: 'ひ', ro: ['hi'] }, { jp: 'ふ', ro: ['fu','hu'] }, { jp: 'へ', ro: ['he'] }, { jp: 'ほ', ro: ['ho'] },
  ],
  ma: [
    { jp: 'ま', ro: ['ma'] }, { jp: 'み', ro: ['mi'] }, { jp: 'む', ro: ['mu'] }, { jp: 'め', ro: ['me'] }, { jp: 'も', ro: ['mo'] },
  ],
  ya: [
    { jp: 'や', ro: ['ya'] }, { jp: 'ゆ', ro: ['yu'] }, { jp: 'よ', ro: ['yo'] },
  ],
  ra: [
    { jp: 'ら', ro: ['ra'] }, { jp: 'り', ro: ['ri'] }, { jp: 'る', ro: ['ru'] }, { jp: 'れ', ro: ['re'] }, { jp: 'ろ', ro: ['ro'] },
  ],
  wa: [
    { jp: 'わ', ro: ['wa'] }, { jp: 'を', ro: ['wo','o'] }, { jp: 'ん', ro: ['n'] },
  ],

  // 濁音（入力は広めに許容、表示は学校表記寄り）
  dakuten: [
    { jp: 'が', ro: ['ga'] }, { jp: 'ぎ', ro: ['gi'] }, { jp: 'ぐ', ro: ['gu'] }, { jp: 'げ', ro: ['ge'] }, { jp: 'ご', ro: ['go'] },
    { jp: 'ざ', ro: ['za'] }, { jp: 'じ', ro: ['ji','zi'] }, { jp: 'ず', ro: ['zu'] }, { jp: 'ぜ', ro: ['ze'] }, { jp: 'ぞ', ro: ['zo'] },
    { jp: 'だ', ro: ['da'] }, { jp: 'ぢ', ro: ['ji','di'] }, { jp: 'づ', ro: ['zu','du'] }, { jp: 'で', ro: ['de'] }, { jp: 'ど', ro: ['do'] },
    { jp: 'ば', ro: ['ba'] }, { jp: 'び', ro: ['bi'] }, { jp: 'ぶ', ro: ['bu'] }, { jp: 'べ', ro: ['be'] }, { jp: 'ぼ', ro: ['bo'] },
  ],

  // 半濁音
  handakuten: [
    { jp: 'ぱ', ro: ['pa'] }, { jp: 'ぴ', ro: ['pi'] }, { jp: 'ぷ', ro: ['pu'] }, { jp: 'ぺ', ro: ['pe'] }, { jp: 'ぽ', ro: ['po'] },
  ],

  // 拗音（小書きゃゅょ）
  yoon: [
    { jp: 'きゃ', ro: ['kya'] }, { jp: 'きゅ', ro: ['kyu'] }, { jp: 'きょ', ro: ['kyo'] },
    { jp: 'しゃ', ro: ['sha','sya'] }, { jp: 'しゅ', ro: ['shu','syu'] }, { jp: 'しょ', ro: ['sho','syo'] },
    { jp: 'ちゃ', ro: ['cha','tya'] }, { jp: 'ちゅ', ro: ['chu','tyu'] }, { jp: 'ちょ', ro: ['cho','tyo'] },
    { jp: 'にゃ', ro: ['nya'] }, { jp: 'にゅ', ro: ['nyu'] }, { jp: 'にょ', ro: ['nyo'] },
    { jp: 'ひゃ', ro: ['hya'] }, { jp: 'ひゅ', ro: ['hyu'] }, { jp: 'ひょ', ro: ['hyo'] },
    { jp: 'みゃ', ro: ['mya'] }, { jp: 'みゅ', ro: ['myu'] }, { jp: 'みょ', ro: ['myo'] },
    { jp: 'りゃ', ro: ['rya'] }, { jp: 'りゅ', ro: ['ryu'] }, { jp: 'りょ', ro: ['ryo'] },
    // 濁音拗音
    { jp: 'ぎゃ', ro: ['gya'] }, { jp: 'ぎゅ', ro: ['gyu'] }, { jp: 'ぎょ', ro: ['gyo'] },
    { jp: 'じゃ', ro: ['ja','zya','jya'] }, { jp: 'じゅ', ro: ['ju','zyu','jyu'] }, { jp: 'じょ', ro: ['jo','zyo','jyo'] },
    { jp: 'びゃ', ro: ['bya'] }, { jp: 'びゅ', ro: ['byu'] }, { jp: 'びょ', ro: ['byo'] },
    { jp: 'ぴゃ', ro: ['pya'] }, { jp: 'ぴゅ', ro: ['pyu'] }, { jp: 'ぴょ', ro: ['pyo'] },
  ],

  // 促音（小書きっ + 子音重ね）
  // 例：っか -> kka
  sokuon: [
    { jp: 'っか', ro: ['kka'] }, { jp: 'っき', ro: ['kki'] }, { jp: 'っく', ro: ['kku'] }, { jp: 'っけ', ro: ['kke'] }, { jp: 'っこ', ro: ['kko'] },
    { jp: 'っさ', ro: ['ssa'] }, { jp: 'っし', ro: ['sshi','ssi'] }, { jp: 'っす', ro: ['ssu'] }, { jp: 'っせ', ro: ['sse'] }, { jp: 'っそ', ro: ['sso'] },
    { jp: 'った', ro: ['tta'] }, { jp: 'っち', ro: ['cchi','tti'] }, { jp: 'っつ', ro: ['ttsu','ttu'] }, { jp: 'って', ro: ['tte'] }, { jp: 'っと', ro: ['tto'] },
    { jp: 'っぱ', ro: ['ppa'] }, { jp: 'っぴ', ro: ['ppi'] }, { jp: 'っぷ', ro: ['ppu'] }, { jp: 'っぺ', ro: ['ppe'] }, { jp: 'っぽ', ro: ['ppo'] },
  ],
};

const ALPHA_TABLE = {
  home: ['A','S','D','F','J','K','L'],
  az: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
};

const ROMAJI_WORDS = [
  { en: 'sushi', ja: 'すし' },
  { en: 'ramen', ja: 'ラーメン' },
  { en: 'sakura', ja: 'さくら' },
  { en: 'nihon', ja: 'にほん' },
  { en: 'konnichiha', ja: 'こんにちは' },
  { en: 'arigatou', ja: 'ありがとう' },
  { en: 'tomodachi', ja: 'ともだち' },
  { en: 'gakkou', ja: 'がっこう' },
  { en: 'sensei', ja: 'せんせい' },
  { en: 'asobi', ja: 'あそび' },
  { en: 'taberu', ja: 'たべる' },
  { en: 'nomu', ja: 'のむ' },
  { en: 'hashiru', ja: 'はしる' },
  { en: 'yomu', ja: 'よむ' },
  { en: 'kaku', ja: 'かく' },
  { en: 'tanoshii', ja: 'たのしい' },
  { en: 'yasashii', ja: 'やさしい' },
  { en: 'hayai', ja: 'はやい' },
  { en: 'ookii', ja: 'おおきい' },
  { en: 'chiisai', ja: 'ちいさい' },
];

const ROMAJI_SENTENCES = [
  // 助詞「は」は学習目的で "ha" 表記に寄せる
  { en: 'watashi ha gakusei desu', ja: 'わたしは がくせい です' },
  { en: 'kyou ha tenki ga ii desu', ja: 'きょうは てんきが いい です' },
  { en: 'ashita ha gakkou e ikimasu', ja: 'あしたは がっこうへ いきます' },
  { en: 'hon o yomu no ga suki desu', ja: 'ほんを よむのが すきです' },
  { en: 'tomodachi to asobimasu', ja: 'ともだちと あそびます' },
];

function loadStats(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return { sessions:0, recent:[] , daily:{}};
    const s = JSON.parse(raw);
    return {
      sessions: Number(s.sessions)||0,
      recent: Array.isArray(s.recent)? s.recent.slice(0,20):[],
      daily: s.daily && typeof s.daily==='object'? s.daily : {},
    };
  }catch{ return { sessions:0, recent:[], daily:{}}; }
}
function saveStats(stats){ localStorage.setItem(STORAGE_KEY, JSON.stringify(stats)); }
function yyyymmdd(){
  const d=new Date();
  const p=n=>String(n).padStart(2,'0');
  return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`;
}
function mean(arr){ if(!arr.length) return null; return arr.reduce((a,b)=>a+b,0)/arr.length; }

function normalizeInput(s){
  // 全角英数・全角スペースを半角へ（IME誤爆対策）
  if(!s) return '';
  return s
    .replace(/[\uFF01-\uFF5E]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0))
    .replace(/\u3000/g, ' ');
}

function romajiVariants(base){
  // 長音は「広め」許容：ou↔oo / ei↔ee を追加
  // （全部を許容すると教材として崩れるので、まずは代表的な揺れに留める）
  const b = String(base);
  const set = new Set([b]);
  const add = (s) => { if (s && s !== b) set.add(s); };

  // one-step replacements
  add(b.replaceAll('ou', 'oo'));
  add(b.replaceAll('oo', 'ou'));
  add(b.replaceAll('ei', 'ee'));
  add(b.replaceAll('ee', 'ei'));

  return [...set];
}

// DOM
const modeEl = document.getElementById('mode');
const levelEl = document.getElementById('level');
const lengthEl = document.getElementById('length');
const soundToggleEl = document.getElementById('soundToggle');
const presetBtns = document.querySelectorAll('.presetBtn');
const startBtn = document.getElementById('startBtn');
const resetStatsBtn = document.getElementById('resetStatsBtn');

const accEl = document.getElementById('acc');
const wpmEl = document.getElementById('wpm');
const sessionsEl = document.getElementById('sessions');
const streakBadge = document.getElementById('streakBadge');

const gameCard = document.getElementById('gameCard');
const resultCard = document.getElementById('resultCard');
const promptEl = document.getElementById('prompt');
const meaningEl = document.getElementById('meaning');
const hintEl = document.getElementById('hint');
const remainingEl = document.getElementById('remaining');
const correctEl = document.getElementById('correct');
const missEl = document.getElementById('miss');
const typeInput = document.getElementById('typeInput');
const giveUpBtn = document.getElementById('giveUpBtn');

const rAccEl = document.getElementById('rAcc');
const rWpmEl = document.getElementById('rWpm');
const rTimeEl = document.getElementById('rTime');
const againBtn = document.getElementById('againBtn');
const backBtn = document.getElementById('backBtn');

const keyboard = document.getElementById('keyboard');

let stats = loadStats();

function loadSettings(){
  try{
    const raw = localStorage.getItem(SETTINGS_KEY);
    if(!raw) return { sound: true };
    const s = JSON.parse(raw);
    return { sound: !!s.sound };
  } catch { return { sound: true }; }
}
function saveSettings(settings){
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

let settings = loadSettings();

// tiny sfx (WebAudio)
let audioCtx = null;
function ctx(){
  if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
function beep(freq, durMs, type='sine', gain=0.06){
  if(!settings.sound) return;
  const c = ctx();
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.value = gain;
  o.connect(g);
  g.connect(c.destination);
  const now = c.currentTime;
  o.start(now);
  o.stop(now + durMs/1000);
}
function sfxOk(){ beep(880, 80, 'triangle', 0.07); }
function sfxMiss(){ beep(220, 120, 'sawtooth', 0.05); }

function setLevels(){
  const mode = modeEl.value;
  const levels = MODES[mode].levels;
  levelEl.innerHTML = '';
  for(const lv of levels){
    const opt=document.createElement('option');
    opt.value=lv.id;
    opt.textContent=lv.name;
    levelEl.appendChild(opt);
  }
}

const PRESETS = {
  // Phase1: 小1〜小6（句読点なし方針）
  g1: { mode: 'kana', level: 'vowels', length: 20 },
  g2: { mode: 'kana', level: 'ka', length: 20 },
  g3: { mode: 'kana', level: 'sa', length: 20 },
  g4: { mode: 'kana', level: 'ta', length: 20 },
  g5: { mode: 'kana', level: 'yoon', length: 20 },
  g6: { mode: 'romaji', level: 'sentences', length: 10 },
};

function applyPreset(id){
  const p = PRESETS[id];
  if(!p) return;
  modeEl.value = p.mode;
  setLevels();
  levelEl.value = p.level;
  lengthEl.value = String(p.length);
}

function renderStats(){
  const recent = stats.recent.slice(0,10);
  const acc = mean(recent.map(r=>r.acc));
  const wpm = mean(recent.map(r=>r.wpm));
  accEl.textContent = acc==null? '-' : Math.round(acc).toString();
  wpmEl.textContent = wpm==null? '-' : Math.round(wpm).toString();
  sessionsEl.textContent = String(stats.sessions||0);

  const today = yyyymmdd();
  const todayCount = Number(stats.daily?.[today]||0);
  streakBadge.textContent = `きょう: ${todayCount}`;
}

function showKeyboardForMode(mode){
  // MVP: show only for alpha home/AZ
  if(mode !== 'alpha') { keyboard.hidden = true; return; }
  keyboard.hidden = false;
  const rows = [
    'QWERTYUIOP'.split(''),
    'ASDFGHJKL'.split(''),
    ['Z','X','C','V','B','N','M'],
  ];
  for(let i=0;i<3;i++){
    const rowEl = keyboard.querySelector(`.keyRow[data-row="${i+1}"]`);
    rowEl.innerHTML='';
    for(const k of rows[i]){
      const div=document.createElement('div');
      div.className='key';
      div.textContent=k;
      div.dataset.key=k;
      rowEl.appendChild(div);
    }
  }
}

function highlightKey(letter){
  for(const el of keyboard.querySelectorAll('.key')) el.classList.remove('active');
  if(!letter) return;
  const up = String(letter).toUpperCase();
  // CSS.escape may not exist in very old browsers; fallback is fine for A-Z.
  const sel = `.key[data-key="${(window.CSS && CSS.escape) ? CSS.escape(up) : up}"]`;
  const keyEl = keyboard.querySelector(sel);
  if(keyEl) keyEl.classList.add('active');
}

// game state
let game = null;

function buildQueue(mode, level, n){
  const queue=[];
  const pick=(arr)=>arr[Math.floor(Math.random()*arr.length)];

  if(mode==='kana'){
    const arr = KANA_TABLE[level] || KANA_TABLE.vowels;
    for(let i=0;i<n;i++) queue.push(pick(arr));
    return queue; // {jp, ro}
  }
  if(mode==='alpha'){
    const arr = ALPHA_TABLE[level] || ALPHA_TABLE.az;
    for(let i=0;i<n;i++) queue.push(pick(arr));
    return queue; // 'A'
  }
  if(mode==='romaji'){
    const arr = level==='sentences' ? ROMAJI_SENTENCES : ROMAJI_WORDS;
    for(let i=0;i<n;i++){
      const item = pick(arr);
      queue.push({
        ...item,
        variants: romajiVariants(item.en),
      });
    }
    return queue; // {en, ja, variants}
  }
  return queue;
}

function startGame(){
  const mode = modeEl.value;
  const level = levelEl.value;
  const n = Number(lengthEl.value)||20;
  const queue = buildQueue(mode, level, n);

  game = {
    mode, level,
    total: queue.length,
    queue,
    idx: 0,
    correct: 0,
    miss: 0,
    startedAt: performance.now(),
    typedChars: 0,
    romajiTyped: '',
  };

  resultCard.hidden = true;
  gameCard.hidden = false;
  showKeyboardForMode(mode);

  nextPrompt();
  typeInput.value='';
  typeInput.disabled = false;
  typeInput.readOnly = (mode === 'romaji');
  if(game) game.romajiTyped = '';
  typeInput.focus();
}

function currentItem(){
  if(!game) return null;
  return game.queue[game.idx] ?? null;
}

function expectedText(item){
  if(game.mode==='kana') return item.ro; // string[]
  if(game.mode==='alpha') return String(item).toLowerCase();
  if(game.mode==='romaji') return String(item?.en ?? item);
  return '';
}

function promptText(item){
  if(game.mode==='kana') return item.jp;
  if(game.mode==='alpha') return String(item);
  if(game.mode==='romaji') return String(item?.en ?? item);
  return '-';
}

function meaningText(item){
  if(game.mode==='romaji') return String(item?.ja ?? '');
  return '';
}

function hintText(item){
  if(game.mode==='kana') return `ヒント: ${(item.ro||[]).join(' / ')}`;
  if(game.mode==='alpha') return 'ヒント: その もじ を うとう（Enterはいらない）';
  if(game.mode==='romaji') return 'ヒント: Enterなし（ただしく うつと すすむ）';
  return '';
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function setHintProgress(expected, typed){
  // expected: string, typed: string (already normalized)
  const e = String(expected || '');
  const t = String(typed || '');
  const n = Math.min(e.length, t.length);
  // highlight only when typed matches prefix
  const prefixOk = e.slice(0, n) === t.slice(0, n);
  if(!t || !prefixOk){
    hintEl.textContent = e;
    return;
  }
  const done = e.slice(0, n);
  const rest = e.slice(n);
  hintEl.innerHTML = `<span class="done">${escapeHtml(done)}</span>${escapeHtml(rest)}`;
}

function renderRomajiPromptProgress(expected, typed){
  const e = String(expected || '');
  const t = String(typed || '');
  let n = 0;
  while(n < e.length && n < t.length && e[n] === t[n]) n++;
  if(!t){
    promptEl.textContent = e;
    return;
  }
  const done = e.slice(0, n);
  const rest = e.slice(n);
  promptEl.innerHTML = `<span class="done">${escapeHtml(done)}</span>${escapeHtml(rest)}`;
}

function nextPrompt(){
  if(!game) return;
  if(game.idx >= game.total){
    endGame();
    return;
  }
  const item = currentItem();

  const p = promptText(item);
  if(game.mode === 'romaji'){
    game.romajiTyped = '';
    renderRomajiPromptProgress(p, '');
  } else {
    promptEl.textContent = p;
  }

  meaningEl.textContent = meaningText(item);
  hintEl.classList.remove('wrong');
  hintEl.textContent = hintText(item);
  remainingEl.textContent = String(game.total - game.idx);
  correctEl.textContent = String(game.correct);
  missEl.textContent = String(game.miss);

  if(game.mode==='alpha') highlightKey(String(item));
  else highlightKey(null);
}

function missAdvance(showCorrectText){
  if(!game) return;
  game.miss++;
  sfxMiss();
  missEl.textContent = String(game.miss);

  // show correct briefly, then advance
  hintEl.textContent = `せいかい: ${showCorrectText}`;
  hintEl.classList.add('wrong');

  typeInput.disabled = true;
  const waitMs = 900;
  setTimeout(() => {
    if(!game) return;
    typeInput.disabled = false;
    typeInput.value = '';
    if(game.mode === 'romaji') game.romajiTyped = '';
    game.idx++;
    nextPrompt();
    typeInput.focus();
  }, waitMs);
}

function romajiMissLock(){
  if(!game) return;
  game.miss++;
  sfxMiss();
  missEl.textContent = String(game.miss);
  hintEl.textContent = 'まちがい！';
  hintEl.classList.add('wrong');

  typeInput.disabled = true;
  const waitMs = 650;
  setTimeout(() => {
    if(!game) return;
    typeInput.disabled = false;
    hintEl.classList.remove('wrong');
    // restore default hint
    const item = currentItem();
    hintEl.textContent = item ? hintText(item) : '';
    typeInput.focus();
  }, waitMs);
}

function accept(forceOk = null){
  if(!game) return;
  const item = currentItem();
  const expected = expectedText(item);
  const got = normalizeInput(typeInput.value).trim();
  if(typeInput.value !== normalizeInput(typeInput.value)) typeInput.value = normalizeInput(typeInput.value);

  // count typed chars for WPM (rough)
  game.typedChars += got.length;

  let ok;
  if (forceOk === true) ok = true;
  else if (forceOk === false) ok = false;
  else {
    if(game.mode==='kana'){
      const list = Array.isArray(expected) ? expected : [String(expected||'')];
      ok = list.includes(got);
    } else if(game.mode==='alpha'){
      ok = got.toLowerCase() === expected;
    } else {
      ok = got === expected;
    }
  }

  if(ok) { game.correct++; sfxOk(); }
  else { game.miss++; sfxMiss(); }

  typeInput.value='';
  game.idx++;
  nextPrompt();
}

function endGame(){
  if(!game) return;
  const elapsedMs = performance.now() - game.startedAt;
  const elapsedSec = Math.max(1, Math.round(elapsedMs/1000));
  const total = game.correct + game.miss;
  const acc = total ? (game.correct / total) * 100 : 0;
  // WPM: (chars/5)/minutes
  const minutes = elapsedSec / 60;
  const wpm = minutes > 0 ? (game.typedChars/5) / minutes : 0;

  rAccEl.textContent = String(Math.round(acc));
  rWpmEl.textContent = String(Math.round(wpm));
  rTimeEl.textContent = String(elapsedSec);

  // save stats
  stats.sessions = (stats.sessions||0) + 1;
  stats.recent.unshift({ acc, wpm, mode: game.mode, level: game.level, at: Date.now() });
  stats.recent = stats.recent.slice(0, 20);
  const today = yyyymmdd();
  stats.daily = stats.daily || {};
  stats.daily[today] = Number(stats.daily[today]||0) + 1;
  saveStats(stats);
  renderStats();

  gameCard.hidden = true;
  resultCard.hidden = false;
  highlightKey(null);
}

function stopGame(){
  if(!game) return;
  if(confirm('れんしゅうをやめます。いいですか？')){
    game = null;
    gameCard.hidden = true;
    resultCard.hidden = true;
    highlightKey(null);
  }
}

// wiring
modeEl.addEventListener('change', () => {
  setLevels();
});

presetBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    applyPreset(btn.dataset.preset);
  });
});

startBtn.addEventListener('click', startGame);

typeInput.addEventListener('keydown', (ev) => {
  // romaji は Enter なし。キー入力ごとに「正しい文字だけ」進む。
  if(!game) return;
  if(game.mode !== 'romaji') return;

  // readOnlyなので、ここで手動入力制御
  const item = currentItem();
  if(!item) return;
  const primary = String(item.en);
  const variants = Array.isArray(item.variants) && item.variants.length ? item.variants.map(String) : [primary];

  const key = ev.key;

  // allow navigation keys
  if(key === 'Tab' || key === 'Escape') return;

  if(key === 'Backspace'){
    ev.preventDefault();
    game.romajiTyped = game.romajiTyped.slice(0, -1);
    typeInput.value = game.romajiTyped;
    // show progress against primary display
    renderRomajiPromptProgress(primary, game.romajiTyped);
    return;
  }

  // only accept single printable chars
  if(key.length !== 1) {
    ev.preventDefault();
    return;
  }

  // normalize (fullwidth etc.)
  const ch = normalizeInput(key).toLowerCase();

  // candidates by prefix
  const prefix = game.romajiTyped;
  let candidates = variants.filter(v => v.startsWith(prefix));
  if(!candidates.length) candidates = variants;

  // auto-skip spaces (option B): skip only if all candidates have space next
  while (candidates.length && candidates.every(v => v[prefix.length] === ' ')) {
    game.romajiTyped += ' ';
    candidates = candidates.filter(v => v.startsWith(game.romajiTyped));
  }

  const pos = game.romajiTyped.length;
  const nextChars = new Set(candidates.map(v => v[pos]).filter(Boolean));

  ev.preventDefault();

  if(nextChars.size === 0) return;
  if(nextChars.has(ch)){
    game.romajiTyped += ch;

    // after accepting a char, auto-skip spaces again (if all candidates agree)
    candidates = candidates.filter(v => v.startsWith(game.romajiTyped));
    while (candidates.length && candidates.every(v => v[game.romajiTyped.length] === ' ')) {
      game.romajiTyped += ' ';
      candidates = candidates.filter(v => v.startsWith(game.romajiTyped));
    }

    typeInput.value = game.romajiTyped;
    renderRomajiPromptProgress(primary, game.romajiTyped);

    // completion if any candidate fully matched
    if(candidates.some(v => v === game.romajiTyped)){
      typeInput.value = game.romajiTyped;
      accept(true);
    }
    return;
  }

  // wrong key: lock input briefly (do NOT advance)
  romajiMissLock();
});

typeInput.addEventListener('input', () => {
  if(!game) return;
  const item = currentItem();
  if(!item) return;

  const raw = typeInput.value;
  const norm = normalizeInput(raw);
  if(raw !== norm) typeInput.value = norm;
  const got = norm.trim();

  if(game.mode === 'kana'){
    const list = item.ro;
    if(!got){
      hintEl.textContent = hintText(item);
      return;
    }

    // narrow candidates by prefix
    const candidates = list.filter(x => x.startsWith(got));
    if(candidates.length){
      // choose one candidate for progress display (学校で習う表記を優先)
      // item.ro の順序（例：shi→si）を優先し、その中で prefix に合う最初のもの
      const chosen = (list.find(x => candidates.includes(x)) || candidates[0]);
      const nextChars = [...new Set(candidates.map(x => x[got.length]).filter(Boolean))].join(' ');

      // show: ヒント: [progress] つぎ: x
      hintEl.classList.remove('wrong');
      hintEl.innerHTML = `ヒント: <span class="sep"></span>`;
      // append progress
      const progressSpan = document.createElement('span');
      progressSpan.className = 'progress';
      hintEl.appendChild(progressSpan);
      // temporarily swap hintEl to render into progressSpan
      const saved = hintEl;
      // render into span
      const e = chosen;
      const t = got;
      const n = Math.min(e.length, t.length);
      const prefixOk = e.slice(0, n) === t.slice(0, n);
      if(!t || !prefixOk){
        progressSpan.textContent = e;
      } else {
        const done = e.slice(0, n);
        const rest = e.slice(n);
        progressSpan.innerHTML = `<span class="done">${escapeHtml(done)}</span>${escapeHtml(rest)}`;
      }
      // add next
      const next = document.createElement('span');
      next.className = 'sep';
      next.textContent = `　つぎ: ${nextChars || ' '}`;
      hintEl.appendChild(next);

      // exact match -> auto accept
      if(candidates.some(x => x === got)){
        accept(true);
      }
      return;
    }

    // mismatch -> show correct briefly then next
    missAdvance((list||[]).join(' / '));
    return;
  }

  if(game.mode === 'alpha'){
    if(!got) return;
    // take first char only
    const ch = got[0].toLowerCase();
    typeInput.value = ch; // normalize
    const expected = String(item).toLowerCase();
    if(ch === expected) accept(true);
    else missAdvance(expected.toUpperCase());
    return;
  }

  if(game.mode === 'romaji'){
    const expected = String(item.en);
    renderRomajiPromptProgress(expected, got);
    meaningEl.textContent = String(item.ja || '');
    // manual accept on Enter
    return;
  }
});

giveUpBtn.addEventListener('click', stopGame);
againBtn.addEventListener('click', startGame);
backBtn.addEventListener('click', () => {
  resultCard.hidden = true;
});

resetStatsBtn.addEventListener('click', () => {
  if(!confirm('きろくをぜんぶけします。いいですか？')) return;
  localStorage.removeItem(STORAGE_KEY);
  stats = loadStats();
  renderStats();
});

soundToggleEl.checked = !!settings.sound;
soundToggleEl.addEventListener('change', () => {
  settings.sound = !!soundToggleEl.checked;
  saveSettings(settings);
  // iOS/Safari: ensure AudioContext resume after user gesture
  if(settings.sound){
    try{ ctx().resume(); }catch{}
    sfxOk();
  }
});

// init
setLevels();
renderStats();
