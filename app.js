// タイピングの森 — Playful × Minimal リデザイン
// ① ひらがな（ローマ字でうつ）→ ② アルファベット → ③ ローマ字

const STORAGE_KEY = 'typingPractice:v1';
const SETTINGS_KEY = 'typingPractice:settings:v1';
const THEME_KEY = 'typingPractice:theme';

const MODES = {
  kana: {
    label: 'ひらがな',
    levels: [
      { id: 'vowels', name: '母音' },
      { id: 'ka', name: 'か行' },
      { id: 'sa', name: 'さ行' },
      { id: 'ta', name: 'た行' },
      { id: 'na', name: 'な行' },
      { id: 'ha', name: 'は行' },
      { id: 'ma', name: 'ま行' },
      { id: 'ya', name: 'や行' },
      { id: 'ra', name: 'ら行' },
      { id: 'wa', name: 'わ行' },
      { id: 'dakuten', name: '濁音' },
      { id: 'handakuten', name: '半濁音' },
      { id: 'yoon', name: '拗音' },
      { id: 'sokuon', name: '促音' },
      { id: 'chouon', name: '長音' },
    ],
  },
  alpha: {
    label: 'アルファベット',
    levels: [
      { id: 'home', name: 'ホームポジション' },
      { id: 'az', name: 'A〜Z' },
    ],
  },
  romaji: {
    label: 'ローマ字',
    levels: [
      { id: 'words', name: 'たんご' },
      { id: 'sentences', name: 'ぶんしょう' },
    ],
  },
};

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
  dakuten: [
    { jp: 'が', ro: ['ga'] }, { jp: 'ぎ', ro: ['gi'] }, { jp: 'ぐ', ro: ['gu'] }, { jp: 'げ', ro: ['ge'] }, { jp: 'ご', ro: ['go'] },
    { jp: 'ざ', ro: ['za'] }, { jp: 'じ', ro: ['ji','zi'] }, { jp: 'ず', ro: ['zu'] }, { jp: 'ぜ', ro: ['ze'] }, { jp: 'ぞ', ro: ['zo'] },
    { jp: 'だ', ro: ['da'] }, { jp: 'ぢ', ro: ['ji','di'] }, { jp: 'づ', ro: ['zu','du'] }, { jp: 'で', ro: ['de'] }, { jp: 'ど', ro: ['do'] },
    { jp: 'ば', ro: ['ba'] }, { jp: 'び', ro: ['bi'] }, { jp: 'ぶ', ro: ['bu'] }, { jp: 'べ', ro: ['be'] }, { jp: 'ぼ', ro: ['bo'] },
  ],
  handakuten: [
    { jp: 'ぱ', ro: ['pa'] }, { jp: 'ぴ', ro: ['pi'] }, { jp: 'ぷ', ro: ['pu'] }, { jp: 'ぺ', ro: ['pe'] }, { jp: 'ぽ', ro: ['po'] },
  ],
  yoon: [
    { jp: 'きゃ', ro: ['kya'] }, { jp: 'きゅ', ro: ['kyu'] }, { jp: 'きょ', ro: ['kyo'] },
    { jp: 'しゃ', ro: ['sha','sya'] }, { jp: 'しゅ', ro: ['shu','syu'] }, { jp: 'しょ', ro: ['sho','syo'] },
    { jp: 'ちゃ', ro: ['cha','tya'] }, { jp: 'ちゅ', ro: ['chu','tyu'] }, { jp: 'ちょ', ro: ['cho','tyo'] },
    { jp: 'にゃ', ro: ['nya'] }, { jp: 'にゅ', ro: ['nyu'] }, { jp: 'にょ', ro: ['nyo'] },
    { jp: 'ひゃ', ro: ['hya'] }, { jp: 'ひゅ', ro: ['hyu'] }, { jp: 'ひょ', ro: ['hyo'] },
    { jp: 'みゃ', ro: ['mya'] }, { jp: 'みゅ', ro: ['myu'] }, { jp: 'みょ', ro: ['myo'] },
    { jp: 'りゃ', ro: ['rya'] }, { jp: 'りゅ', ro: ['ryu'] }, { jp: 'りょ', ro: ['ryo'] },
    { jp: 'ぎゃ', ro: ['gya'] }, { jp: 'ぎゅ', ro: ['gyu'] }, { jp: 'ぎょ', ro: ['gyo'] },
    { jp: 'じゃ', ro: ['ja','zya','jya'] }, { jp: 'じゅ', ro: ['ju','zyu','jyu'] }, { jp: 'じょ', ro: ['jo','zyo','jyo'] },
    { jp: 'びゃ', ro: ['bya'] }, { jp: 'びゅ', ro: ['byu'] }, { jp: 'びょ', ro: ['byo'] },
    { jp: 'ぴゃ', ro: ['pya'] }, { jp: 'ぴゅ', ro: ['pyu'] }, { jp: 'ぴょ', ro: ['pyo'] },
  ],
  sokuon: [
    { jp: 'っか', ro: ['kka'] }, { jp: 'っき', ro: ['kki'] }, { jp: 'っく', ro: ['kku'] }, { jp: 'っけ', ro: ['kke'] }, { jp: 'っこ', ro: ['kko'] },
    { jp: 'っさ', ro: ['ssa'] }, { jp: 'っし', ro: ['sshi','ssi'] }, { jp: 'っす', ro: ['ssu'] }, { jp: 'っせ', ro: ['sse'] }, { jp: 'っそ', ro: ['sso'] },
    { jp: 'った', ro: ['tta'] }, { jp: 'っち', ro: ['cchi','tti'] }, { jp: 'っつ', ro: ['ttsu','ttu'] }, { jp: 'って', ro: ['tte'] }, { jp: 'っと', ro: ['tto'] },
    { jp: 'っぱ', ro: ['ppa'] }, { jp: 'っぴ', ro: ['ppi'] }, { jp: 'っぷ', ro: ['ppu'] }, { jp: 'っぺ', ro: ['ppe'] }, { jp: 'っぽ', ro: ['ppo'] },
  ],
  chouon: [
    { jp: 'こう', ro: ['kou','koo'] },
    { jp: 'そう', ro: ['sou','soo'] },
    { jp: 'とう', ro: ['tou','too'] },
    { jp: 'のう', ro: ['nou','noo'] },
    { jp: 'ほう', ro: ['hou','hoo'] },
    { jp: 'きょう', ro: ['kyou','kyoo'] },
    { jp: 'しょう', ro: ['shou','shoo','syou','syoo'] },
    { jp: 'ちょう', ro: ['chou','choo','tyou','tyoo'] },
    { jp: 'おおきい', ro: ['ookii'] },
    { jp: 'おねえさん', ro: ['oneesan','oneisan'] },
    { jp: 'えいが', ro: ['eiga','eega'] },
    { jp: 'せんせい', ro: ['sensei','sensee'] },
  ],
};

const ALPHA_TABLE = {
  home: ['A','S','D','F','J','K','L'],
  az: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
};

const ROMAJI_WORDS = [
  { en: 'sushi', ja: 'すし' }, { en: 'ramen', ja: 'ラーメン' }, { en: 'sakura', ja: 'さくら' },
  { en: 'nihon', ja: 'にほん' }, { en: 'konnichiha', ja: 'こんにちは' }, { en: 'arigatou', ja: 'ありがとう' },
  { en: 'tomodachi', ja: 'ともだち' }, { en: 'gakkou', ja: 'がっこう' }, { en: 'sensei', ja: 'せんせい' },
  { en: 'asobi', ja: 'あそび' }, { en: 'taberu', ja: 'たべる' }, { en: 'nomu', ja: 'のむ' },
  { en: 'hashiru', ja: 'はしる' }, { en: 'yomu', ja: 'よむ' }, { en: 'kaku', ja: 'かく' },
  { en: 'tanoshii', ja: 'たのしい' }, { en: 'yasashii', ja: 'やさしい' }, { en: 'hayai', ja: 'はやい' },
  { en: 'ookii', ja: 'おおきい' }, { en: 'chiisai', ja: 'ちいさい' },
  { en: 'kyou', ja: 'きょう' }, { en: 'ashita', ja: 'あした' },
  { en: 'otousan', ja: 'おとうさん' }, { en: 'okaasan', ja: 'おかあさん' },
  { en: 'oneesan', ja: 'おねえさん' }, { en: 'oniisan', ja: 'おにいさん' },
  { en: 'chikatetsu', ja: 'ちかてつ' }, { en: 'issho', ja: 'いっしょ' },
  { en: 'zutto', ja: 'ずっと' }, { en: 'byouin', ja: 'びょういん' },
  { en: 'shukudai', ja: 'しゅくだい' }, { en: 'ryokou', ja: 'りょこう' },
  { en: 'eiga', ja: 'えいが' }, { en: 'kouen', ja: 'こうえん' },
  { en: 'suugaku', ja: 'すうがく' }, { en: 'toukyou', ja: 'とうきょう' },
];

const ROMAJI_SENTENCES = [
  { en: 'watashi ha gakusei desu', ja: 'わたしは がくせい です' },
  { en: 'kyou ha tenki ga ii desu', ja: 'きょうは てんきが いい です' },
  { en: 'ashita ha gakkou e ikimasu', ja: 'あしたは がっこうへ いきます' },
  { en: 'hon o yomu no ga suki desu', ja: 'ほんを よむのが すきです' },
  { en: 'tomodachi to asobimasu', ja: 'ともだちと あそびます' },
  { en: 'watashi ha toukyou e ikimasu', ja: 'わたしは とうきょうへ いきます' },
  { en: 'kyou ha ryokou no junbi o shimasu', ja: 'きょうは りょこうの じゅんびを します' },
  { en: 'ashita ha kouen de asobimasu', ja: 'あしたは こうえんで あそびます' },
  { en: 'eiga o mi ni ikimasu', ja: 'えいがを みに いきます' },
  { en: 'shukudai o yatte kara nemasu', ja: 'しゅくだいを やってから ねます' },
];

// ========================
// Utility functions
// ========================
function loadStats(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return { sessions:0, recent:[], daily:{}, missMap:{}, badges:{} };
    const s = JSON.parse(raw);
    return {
      sessions: Number(s.sessions)||0,
      recent: Array.isArray(s.recent)? s.recent.slice(0,20):[],
      daily: s.daily && typeof s.daily==='object'? s.daily : {},
      missMap: s.missMap && typeof s.missMap==='object' ? s.missMap : {},
      badges: s.badges && typeof s.badges==='object' ? s.badges : {},
    };
  }catch{ return { sessions:0, recent:[], daily:{}, missMap:{}, badges:{} }; }
}
function saveStats(stats){ localStorage.setItem(STORAGE_KEY, JSON.stringify(stats)); }
function yyyymmdd(){
  const d=new Date();
  const p=n=>String(n).padStart(2,'0');
  return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`;
}
function mean(arr){ if(!arr.length) return null; return arr.reduce((a,b)=>a+b,0)/arr.length; }

function normalizeInput(s){
  if(!s) return '';
  return s
    .replace(/[\uFF01-\uFF5E]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0))
    .replace(/\u3000/g, ' ');
}

function romajiVariants(base){
  const b = String(base);
  const set = new Set([b]);
  const add = (s) => { if (s && s !== b) set.add(s); };
  add(b.replaceAll('ou', 'oo'));
  add(b.replaceAll('oo', 'ou'));
  add(b.replaceAll('ei', 'ee'));
  add(b.replaceAll('ee', 'ei'));
  return [...set];
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function calcScore(acc, wpm){
  const a = Math.max(0, Math.min(1, (acc||0)/100));
  return Math.max(0, Math.floor((wpm||0) * Math.pow(a, 3)));
}

function consecutiveDaysCount(dailyMap){
  const keys = Object.keys(dailyMap || {}).filter(k => Number(dailyMap[k]||0) > 0).sort();
  if(!keys.length) return 0;
  const toDate = (s) => new Date(s + 'T00:00:00');
  let best = 1, cur = 1;
  for(let i=1;i<keys.length;i++){
    const diff = (toDate(keys[i]) - toDate(keys[i-1])) / 86400000;
    if(diff === 1){ cur += 1; best = Math.max(best, cur); }
    else cur = 1;
  }
  return best;
}

// ========================
// DOM refs
// ========================
const homeScreen = document.getElementById('homeScreen');
const gameScreen = document.getElementById('gameScreen');
const resultScreen = document.getElementById('resultScreen');

// Header
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const themeLabel = document.querySelector('.theme-label');
const badgesBtn = document.getElementById('badgesBtn');
const badgeCountEl = document.getElementById('badgeCount');
const badgeTotalEl = document.getElementById('badgeTotal');
const streakBadge = document.getElementById('streakBadge');

// Home
const modeEl = document.getElementById('mode');
const levelEl = document.getElementById('level');
const lengthEl = document.getElementById('length');
const soundToggleEl = document.getElementById('soundToggle');
const levelChipsContainer = document.getElementById('levelChips');
const startBtn = document.getElementById('startBtn');
const resetStatsBtn = document.getElementById('resetStatsBtn');
const courseCards = document.querySelectorAll('.course-card');
const gradeBtns = document.querySelectorAll('.grade-btn');

const accEl = document.getElementById('acc');
const wpmEl = document.getElementById('wpm');
const scoreEl = document.getElementById('score');
const sessionsEl = document.getElementById('sessions');

// Game
const progressLabel = document.getElementById('progressLabel');
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');
const promptEl = document.getElementById('prompt');
const meaningEl = document.getElementById('meaning');
const hintEl = document.getElementById('hint');
const feedbackBadge = document.getElementById('feedbackBadge');
const feedbackText = document.getElementById('feedbackText');
const remainingEl = document.getElementById('remaining');
const correctEl = document.getElementById('correct');
const missEl = document.getElementById('miss');
const typeInput = document.getElementById('typeInput');
const giveUpBtn = document.getElementById('giveUpBtn');
const keyboard = document.getElementById('keyboard');

// Result
const rAccEl = document.getElementById('rAcc');
const rWpmEl = document.getElementById('rWpm');
const rScoreEl = document.getElementById('rScore');
const rTotalEl = document.getElementById('rTotal');
const rAccChangeEl = document.getElementById('rAccChange');
const rWpmChangeEl = document.getElementById('rWpmChange');
const rScoreChangeEl = document.getElementById('rScoreChange');
const badgeNotification = document.getElementById('badgeNotification');
const badgeNotifTitle = document.getElementById('badgeNotifTitle');
const badgeNotifDesc = document.getElementById('badgeNotifDesc');
const againBtn = document.getElementById('againBtn');
const backBtn = document.getElementById('backBtn');

const badgesDialog = document.getElementById('badgesDialog');
const badgesGrid = document.getElementById('badgesGrid');

let stats = loadStats();

// ========================
// Settings
// ========================
function loadSettings(){
  try{
    const raw = localStorage.getItem(SETTINGS_KEY);
    if(!raw) return { sound: true };
    return { sound: !!JSON.parse(raw).sound };
  } catch { return { sound: true }; }
}
function saveSettings(s){ localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); }
let settings = loadSettings();

// ========================
// Theme
// ========================
function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return 'light'; // default to light now!
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon && (themeIcon.textContent = '🌙');
    themeLabel && (themeLabel.textContent = 'ダーク');
  } else {
    document.body.classList.remove('dark-mode');
    themeIcon && (themeIcon.textContent = '☀️');
    themeLabel && (themeLabel.textContent = 'ライト');
  }
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  const current = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ========================
// SFX
// ========================
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
  o.type = type; o.frequency.value = freq;
  g.gain.value = gain;
  o.connect(g); g.connect(c.destination);
  const now = c.currentTime;
  o.start(now); o.stop(now + durMs/1000);
}
function sfxOk(){ beep(880, 45, 'triangle', 0.06); }
function sfxMiss(){ beep(220, 90, 'sawtooth', 0.05); }

// ========================
// Screen management
// ========================
function showScreen(id) {
  [homeScreen, gameScreen, resultScreen].forEach(s => {
    if (s) s.classList.remove('active');
  });
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    target.classList.add('page-enter');
    setTimeout(() => target.classList.remove('page-enter'), 500);
  }
  // Show/hide quit button in header for game screen
  const headerActions = document.getElementById('headerActions');
  if (headerActions) {
    headerActions.style.display = (id === 'gameScreen') ? 'none' : 'flex';
  }
}

// ========================
// Level chips (visual)
// ========================
function renderLevelChips() {
  const mode = modeEl.value;
  const levels = MODES[mode].levels;
  levelChipsContainer.innerHTML = '';
  levelEl.innerHTML = '';

  // Limit visible chips (show first 6, then "..." if more)
  const maxVisible = 6;
  const visible = levels.slice(0, maxVisible);
  const hasMore = levels.length > maxVisible;

  for (const lv of levels) {
    // Hidden select option
    const opt = document.createElement('option');
    opt.value = lv.id;
    opt.textContent = lv.name;
    levelEl.appendChild(opt);
  }

  for (const lv of visible) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'level-chip' + (lv.id === levelEl.value ? ' active' : '');
    chip.textContent = lv.name;
    chip.dataset.levelId = lv.id;
    chip.addEventListener('click', () => {
      levelEl.value = lv.id;
      // Update active states
      levelChipsContainer.querySelectorAll('.level-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
    levelChipsContainer.appendChild(chip);
  }

  if (hasMore) {
    const more = document.createElement('select');
    more.className = 'styled-select';
    more.style.fontSize = '13px';
    for (const lv of levels.slice(maxVisible)) {
      const opt = document.createElement('option');
      opt.value = lv.id;
      opt.textContent = lv.name;
      more.appendChild(opt);
    }
    more.addEventListener('change', () => {
      levelEl.value = more.value;
      levelChipsContainer.querySelectorAll('.level-chip').forEach(c => c.classList.remove('active'));
    });
    levelChipsContainer.appendChild(more);
  }
}

// ========================
// Presets
// ========================
const PRESETS = {
  g1: { mode: 'kana', level: 'vowels', length: 20 },
  g2: { mode: 'kana', level: 'ka', length: 20 },
  g3: { mode: 'kana', level: 'dakuten', length: 20 },
  g4: { mode: 'kana', level: 'sokuon', length: 20 },
  g5: { mode: 'kana', level: 'chouon', length: 20 },
  g6: { mode: 'romaji', level: 'sentences', length: 10 },
};

function applyPreset(id) {
  const p = PRESETS[id];
  if (!p) return;
  modeEl.value = p.mode;
  renderLevelChips();
  levelEl.value = p.level;
  lengthEl.value = String(p.length);

  // Update visual states
  gradeBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.preset === id));
  courseCards.forEach(card => card.classList.toggle('active', card.dataset.mode === p.mode));

  // Update level chip active
  levelChipsContainer.querySelectorAll('.level-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.levelId === p.level);
  });
}

// ========================
// Progress bar
// ========================
function updateProgress() {
  if (!game) return;
  const done = game.idx;
  const total = game.total;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  progressLabel.textContent = `もんだい ${done}/${total}`;
  progressFill.style.width = `${pct}%`;
  progressPercent.textContent = `${pct}%`;
}

// ========================
// Feedback badge
// ========================
let feedbackTimer = null;
function showFeedback(type, text) {
  clearTimeout(feedbackTimer);
  feedbackBadge.className = `feedback-badge feedback-badge--${type} show`;
  feedbackText.textContent = text;
  feedbackTimer = setTimeout(() => {
    feedbackBadge.classList.remove('show');
  }, 1200);
}

// ========================
// Badges
// ========================
const BADGES = [
  { id:'first_play', name:'はじめての一歩', desc:'はじめて れんしゅうした', icon:'🎯', category:'achievement' },
  { id:'acc95', name:'せいかく名人', desc:'せいかいりつ 95% いじょう', icon:'🎖️', category:'accuracy' },
  { id:'acc95_3', name:'3れんしょう', desc:'せいかいりつ 95% を 3かい れんぞく', icon:'🔥', category:'accuracy' },
  { id:'days2', name:'まいにち', desc:'2にち れんぞくで れんしゅう', icon:'📅', category:'streak' },
  { id:'vowels_master', name:'母音マスター', desc:'母音を 95% いじょうで クリア', icon:'⭐', category:'achievement' },
  { id:'yoon_clear', name:'拗音クリア', desc:'拗音を 95% いじょうで クリア', icon:'✨', category:'achievement' },
  { id:'romaji_explorer', name:'ローマ字たんけん', desc:'ローマ字を さいごまで うちきった', icon:'🗺️', category:'achievement' },
  { id:'wpm_20', name:'スピード入門', desc:'WPM 20 いじょう！', icon:'⚡', category:'speed' },
  { id:'wpm_30', name:'スピードスター', desc:'WPM 30 いじょう！', icon:'💨', category:'speed' },
  { id:'wpm_40', name:'光速タイパー', desc:'WPM 40 いじょう！', icon:'🚀', category:'speed' },
  { id:'wpm_50', name:'神速の指', desc:'WPM 50 いじょう！', icon:'⚡', category:'speed' },
  { id:'perfect', name:'パーフェクト', desc:'ミスなし！ かんぺき！', icon:'💯', category:'accuracy' },
  { id:'acc95_5', name:'精密機械', desc:'95% いじょうを 5かい れんぞく', icon:'🎯', category:'accuracy' },
  { id:'acc98_3', name:'正確王', desc:'98% いじょうを 3かい れんぞく', icon:'👑', category:'accuracy' },
  { id:'days7', name:'週間チャンピオン', desc:'1しゅうかん つづけた！', icon:'🏆', category:'streak' },
  { id:'days30', name:'月間マスター', desc:'1か月 つづけた！', icon:'🎖️', category:'streak' },
  { id:'sessions50', name:'練習の鬼', desc:'50かい れんしゅう した！', icon:'💪', category:'streak' },
  { id:'all_kana', name:'ひらがな博士', desc:'ひらがな マスター！', icon:'📚', category:'achievement' },
  { id:'all_alpha', name:'アルファベット名人', desc:'アルファベット マスター！', icon:'🔤', category:'achievement' },
  { id:'all_romaji', name:'ローマ字マスター', desc:'ローマ字 マスター！', icon:'📖', category:'achievement' },
];

function hasBadge(id){ return !!stats.badges?.[id]; }
function grantBadge(id){
  stats.badges = stats.badges || {};
  if(stats.badges[id]) return false;
  stats.badges[id] = { at: Date.now() };
  saveStats(stats);
  return true;
}

function renderBadges(){
  const unlocked = Object.keys(stats.badges||{}).length;
  badgeCountEl.textContent = String(unlocked);
  if(badgeTotalEl) badgeTotalEl.textContent = String(BADGES.length);
  const bue = document.getElementById('badgeUnlocked');
  const bt2 = document.getElementById('badgeTotal2');
  if(bue) bue.textContent = String(unlocked);
  if(bt2) bt2.textContent = String(BADGES.length);

  if(!badgesGrid) return;
  badgesGrid.innerHTML = '';

  // Group by category
  const categories = [
    { key: 'achievement', label: '🏆 たっせい' },
    { key: 'speed', label: '⚡ スピード' },
    { key: 'accuracy', label: '🎯 せいかく' },
    { key: 'streak', label: '📅 けいぞく' },
  ];

  for (const cat of categories) {
    const badges = BADGES.filter(b => b.category === cat.key);
    if (!badges.length) continue;

    const catLabel = document.createElement('div');
    catLabel.style.cssText = 'grid-column: 1 / -1; font-weight: 700; font-size: 14px; margin-top: 8px; color: var(--text-secondary);';
    catLabel.textContent = cat.label;
    badgesGrid.appendChild(catLabel);

    for (const b of badges) {
      const isUnlocked = hasBadge(b.id);
      const div = document.createElement('div');
      div.className = 'badgeCard' + (isUnlocked ? '' : ' locked');
      div.innerHTML = `
        <div style="font-size:24px;margin-bottom:4px;">${b.icon} ${isUnlocked ? '✅' : '🔒'}</div>
        <div class="badgeName">${b.name}</div>
        <div class="badgeDesc">${b.desc}</div>
      `;
      badgesGrid.appendChild(div);
    }
  }
}

// ========================
// Toast
// ========================
let toastTimer = null;
function showToast(text){
  let el = document.getElementById('toast');
  if(!el){
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2500);
}

// ========================
// Stats rendering
// ========================
function renderStats(){
  const recent = stats.recent.slice(0,10);
  const acc = mean(recent.map(r=>r.acc));
  const wpm = mean(recent.map(r=>r.wpm));
  const score = mean(recent.map(r=>r.score).filter(x => typeof x === 'number'));
  accEl.textContent = acc==null? '-' : Math.round(acc).toString();
  wpmEl.textContent = wpm==null? '-' : Math.round(wpm).toString();
  scoreEl.textContent = score==null? '-' : Math.round(score).toString();
  sessionsEl.textContent = String(stats.sessions||0);

  const today = yyyymmdd();
  const todayCount = Number(stats.daily?.[today]||0);
  if (streakBadge) {
    streakBadge.querySelector('span:last-child').textContent = `きょう: ${todayCount}かい`;
  }
  renderBadges();
}

// ========================
// Keyboard
// ========================
function showKeyboardForMode(mode){
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
  const keyEl = keyboard.querySelector(`.key[data-key="${up}"]`);
  if(keyEl) keyEl.classList.add('active');
}

// ========================
// Game state
// ========================
let game = null;

function missKeyFor(mode, item){
  if(mode==='kana') return `kana:${item.jp}`;
  if(mode==='alpha') return `alpha:${String(item)}`;
  if(mode==='romaji') return `romaji:${String(item.en)}`;
  return 'x';
}

function weightedPick(arr, mode){
  const weights = arr.map(item => {
    const key = missKeyFor(mode, item);
    const m = Number(stats.missMap?.[key] || 0);
    return 1 + Math.min(50, Math.pow(m, 1.5));
  });
  const sum = weights.reduce((a,b)=>a+b,0);
  let r = Math.random() * sum;
  for(let i=0;i<arr.length;i++){
    r -= weights[i];
    if(r <= 0) return arr[i];
  }
  return arr[arr.length-1];
}

function buildQueue(mode, level, n){
  const queue=[];
  if(mode==='kana'){
    const arr = KANA_TABLE[level] || KANA_TABLE.vowels;
    for(let i=0;i<n;i++) queue.push(weightedPick(arr, 'kana'));
    return queue;
  }
  if(mode==='alpha'){
    const arr = ALPHA_TABLE[level] || ALPHA_TABLE.az;
    for(let i=0;i<n;i++) queue.push(weightedPick(arr, 'alpha'));
    return queue;
  }
  if(mode==='romaji'){
    const base = (level==='sentences' ? ROMAJI_SENTENCES : ROMAJI_WORDS)
      .map(item => ({ ...item, variants: romajiVariants(item.en) }));
    for(let i=0;i<n;i++) queue.push(weightedPick(base, 'romaji'));
    return queue;
  }
  return queue;
}

function startGame(){
  const mode = modeEl.value;
  const level = levelEl.value;
  const n = Number(lengthEl.value)||20;
  const queue = buildQueue(mode, level, n);

  if(settings.sound){
    try{ ctx().resume(); }catch{}
    try{ beep(1, 1, 'sine', 0.0001); }catch{}
  }

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

  showScreen('gameScreen');
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
  if(game.mode==='kana') return item.ro;
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
  if(game.mode==='alpha') return 'その もじ を うとう';
  if(game.mode==='romaji') return 'ただしく うつと すすむ';
  return '';
}

function renderRomajiPromptProgress(expected, typed){
  const e = String(expected || '');
  const t = String(typed || '');
  let n = 0;
  while(n < e.length && n < t.length && e[n] === t[n]) n++;
  if(!t){ promptEl.textContent = e; return; }
  const done = e.slice(0, n);
  const rest = e.slice(n);
  promptEl.innerHTML = `<span class="done">${escapeHtml(done)}</span>${escapeHtml(rest)}`;
}

function nextPrompt(){
  if(!game) return;
  if(game.idx >= game.total){ endGame(); return; }

  const item = currentItem();
  const p = promptText(item);

  // Set prompt text
  if(game.mode === 'romaji'){
    game.romajiTyped = '';
    renderRomajiPromptProgress(p, '');
    promptEl.className = 'prompt-char romaji-mode';
  } else {
    promptEl.textContent = p;
    promptEl.className = 'prompt-char';
  }

  meaningEl.textContent = meaningText(item);
  hintEl.classList.remove('wrong');
  hintEl.textContent = hintText(item);

  updateProgress();
  remainingEl.textContent = String(game.total - game.idx);
  correctEl.textContent = String(game.correct);
  missEl.textContent = String(game.miss);

  promptEl.classList.remove('success', 'error');
  feedbackBadge.classList.remove('show');

  if(game.mode==='alpha') highlightKey(String(item));
  else highlightKey(null);
}

function recordMiss(mode, item){
  try{
    const key = missKeyFor(mode, item);
    stats.missMap = stats.missMap || {};
    stats.missMap[key] = Number(stats.missMap[key] || 0) + 1;
    saveStats(stats);
  }catch{}
}

function missAdvance(showCorrectText){
  if(!game) return;
  game.miss++;
  recordMiss(game.mode, currentItem());
  sfxMiss();
  missEl.textContent = String(game.miss);

  showFeedback('error', `せいかい: ${showCorrectText}`);
  promptEl.classList.add('error');
  setTimeout(() => promptEl.classList.remove('error'), 400);

  hintEl.textContent = `せいかい: ${showCorrectText}`;
  hintEl.classList.add('wrong');

  typeInput.disabled = true;
  setTimeout(() => {
    if(!game) return;
    typeInput.disabled = false;
    typeInput.value = '';
    if(game.mode === 'romaji') game.romajiTyped = '';
    game.idx++;
    nextPrompt();
    typeInput.focus();
  }, 900);
}

function romajiMissLock(){
  if(!game) return;
  game.miss++;
  recordMiss(game.mode, currentItem());
  sfxMiss();
  missEl.textContent = String(game.miss);

  showFeedback('error', 'まちがい！');
  promptEl.classList.add('error');
  setTimeout(() => promptEl.classList.remove('error'), 400);

  hintEl.textContent = 'まちがい！';
  hintEl.classList.add('wrong');

  typeInput.disabled = true;
  setTimeout(() => {
    if(!game) return;
    typeInput.disabled = false;
    hintEl.classList.remove('wrong');
    const item = currentItem();
    hintEl.textContent = item ? hintText(item) : '';
    typeInput.focus();
  }, 650);
}

function accept(forceOk = null){
  if(!game) return;
  const item = currentItem();
  const expected = expectedText(item);
  const got = normalizeInput(typeInput.value).trim();
  if(typeInput.value !== normalizeInput(typeInput.value)) typeInput.value = normalizeInput(typeInput.value);

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

  if(ok) {
    game.correct++;
    sfxOk();
    showFeedback('success', 'せいかい！');
    promptEl.classList.add('success');
    setTimeout(() => promptEl.classList.remove('success'), 400);
  } else {
    game.miss++;
    recordMiss(game.mode, item);
    sfxMiss();
    showFeedback('error', 'まちがい！');
    promptEl.classList.add('error');
    setTimeout(() => promptEl.classList.remove('error'), 400);
  }

  typeInput.value='';
  game.idx++;
  nextPrompt();
}

// ========================
// End game & results
// ========================
function renderDiff(el, diff, suffix = '') {
  if (!el) return;
  if (diff > 0) {
    el.textContent = `↑ +${Math.round(diff)}${suffix}`;
    el.className = 'metric-diff metric-diff--up';
  } else if (diff < 0) {
    el.textContent = `↓ ${Math.round(diff)}${suffix}`;
    el.className = 'metric-diff metric-diff--down';
  } else {
    el.textContent = '';
    el.className = 'metric-diff';
  }
}

function endGame(){
  if(!game) return;
  const elapsedMs = performance.now() - game.startedAt;
  const elapsedSec = Math.max(1, Math.round(elapsedMs/1000));
  const total = game.correct + game.miss;
  const acc = total ? (game.correct / total) * 100 : 0;
  const minutes = elapsedSec / 60;
  const wpm = minutes > 0 ? (game.typedChars/5) / minutes : 0;
  const score = calcScore(acc, wpm);

  rAccEl.textContent = String(Math.round(acc));
  rWpmEl.textContent = String(Math.round(wpm));
  rScoreEl.textContent = String(score);
  rTotalEl.textContent = String(total);

  // Diff from previous
  if(stats.recent.length > 0){
    const prev = stats.recent[0];
    renderDiff(rAccChangeEl, acc - (prev.acc || 0), '%');
    renderDiff(rWpmChangeEl, wpm - (prev.wpm || 0));
    renderDiff(rScoreChangeEl, score - (prev.score || 0));
  } else {
    [rAccChangeEl, rWpmChangeEl, rScoreChangeEl].forEach(el => {
      if(el) { el.textContent = ''; el.className = 'metric-diff'; }
    });
  }

  // Confetti
  if(acc >= 95 && typeof confetti !== 'undefined'){
    try{ confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }); }catch{}
  }

  // Save
  stats.sessions = (stats.sessions||0) + 1;
  stats.recent.unshift({ acc, wpm, score, mode: game.mode, level: game.level, at: Date.now() });
  stats.recent = stats.recent.slice(0, 20);
  const today = yyyymmdd();
  stats.daily = stats.daily || {};
  stats.daily[today] = Number(stats.daily[today]||0) + 1;
  saveStats(stats);

  // Badges
  const newly = [];
  if(stats.sessions === 1) if (grantBadge('first_play')) newly.push('はじめての一歩');
  if(acc >= 95) if (grantBadge('acc95')) newly.push('せいかく名人');
  if(stats.recent.slice(0,3).every(r => (r.acc||0) >= 95) && stats.recent.length >= 3)
    if (grantBadge('acc95_3')) newly.push('3れんしょう');

  const consecutiveDays = consecutiveDaysCount(stats.daily);
  if(consecutiveDays >= 2) if (grantBadge('days2')) newly.push('まいにち');
  if(game.mode === 'kana' && game.level === 'vowels' && acc >= 95) if (grantBadge('vowels_master')) newly.push('母音マスター');
  if(game.mode === 'kana' && game.level === 'yoon' && acc >= 95) if (grantBadge('yoon_clear')) newly.push('拗音クリア');
  if(game.mode === 'romaji') if (grantBadge('romaji_explorer')) newly.push('ローマ字たんけん');

  if(wpm >= 20) if (grantBadge('wpm_20')) newly.push('スピード入門');
  if(wpm >= 30) if (grantBadge('wpm_30')) newly.push('スピードスター');
  if(wpm >= 40) if (grantBadge('wpm_40')) newly.push('光速タイパー');
  if(wpm >= 50) if (grantBadge('wpm_50')) newly.push('神速の指');

  if(acc === 100) if (grantBadge('perfect')) newly.push('パーフェクト');
  if(stats.recent.slice(0,5).every(r => r.acc >= 95) && stats.recent.length >= 5) if (grantBadge('acc95_5')) newly.push('精密機械');
  if(stats.recent.slice(0,3).every(r => r.acc >= 98) && stats.recent.length >= 3) if (grantBadge('acc98_3')) newly.push('正確王');

  if(consecutiveDays >= 7) if (grantBadge('days7')) newly.push('週間チャンピオン');
  if(consecutiveDays >= 30) if (grantBadge('days30')) newly.push('月間マスター');
  if(stats.sessions >= 50) if (grantBadge('sessions50')) newly.push('練習の鬼');

  saveStats(stats);
  renderStats();

  // Badge notification in result screen
  if (newly.length) {
    badgeNotification.hidden = false;
    badgeNotifTitle.textContent = 'バッジGET！';
    const b = BADGES.find(x => x.name === newly[0]);
    badgeNotifDesc.textContent = b ? `${b.icon} ${b.name} — ${b.desc}` : newly[0];
    showToast(`🏅 バッジGET！ ${newly[0]}`);
  } else {
    badgeNotification.hidden = true;
  }

  showScreen('resultScreen');
  highlightKey(null);
}

function stopGame(){
  if(!game) return;
  if(confirm('れんしゅうをやめます。いいですか？')){
    game = null;
    showScreen('homeScreen');
    highlightKey(null);
  }
}

// ========================
// Event wiring
// ========================

// Course cards
courseCards.forEach(card => {
  card.addEventListener('click', () => {
    const mode = card.dataset.mode;
    modeEl.value = mode;
    courseCards.forEach(c => c.classList.toggle('active', c === card));
    renderLevelChips();
    // Reset grade active
    gradeBtns.forEach(b => b.classList.remove('active'));
  });
});

// Grade presets
gradeBtns.forEach(btn => {
  btn.addEventListener('click', () => applyPreset(btn.dataset.preset));
});

// Start
startBtn.addEventListener('click', startGame);

// Romaji input
typeInput.addEventListener('keydown', (ev) => {
  if(!game || game.mode !== 'romaji') return;

  const item = currentItem();
  if(!item) return;
  const primary = String(item.en);
  const variants = Array.isArray(item.variants) && item.variants.length ? item.variants.map(String) : [primary];
  const key = ev.key;

  if(key === 'Tab' || key === 'Escape') return;

  if(key === 'Backspace'){
    ev.preventDefault();
    game.romajiTyped = game.romajiTyped.slice(0, -1);
    typeInput.value = game.romajiTyped;
    renderRomajiPromptProgress(primary, game.romajiTyped);
    return;
  }

  if(key.length !== 1) { ev.preventDefault(); return; }

  const ch = normalizeInput(key).toLowerCase();
  const prefix = game.romajiTyped;
  let candidates = variants.filter(v => v.startsWith(prefix));
  if(!candidates.length) candidates = variants;

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
    candidates = candidates.filter(v => v.startsWith(game.romajiTyped));
    while (candidates.length && candidates.every(v => v[game.romajiTyped.length] === ' ')) {
      game.romajiTyped += ' ';
      candidates = candidates.filter(v => v.startsWith(game.romajiTyped));
    }
    typeInput.value = game.romajiTyped;
    renderRomajiPromptProgress(primary, game.romajiTyped);
    if(candidates.some(v => v === game.romajiTyped)){
      typeInput.value = game.romajiTyped;
      accept(true);
    }
    return;
  }
  romajiMissLock();
});

// Kana & Alpha input
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
    if(!got){ hintEl.textContent = hintText(item); return; }

    const candidates = list.filter(x => x.startsWith(got));
    if(candidates.length){
      const chosen = (list.find(x => candidates.includes(x)) || candidates[0]);
      const n = Math.min(chosen.length, got.length);
      const prefixOk = chosen.slice(0, n) === got.slice(0, n);
      if(prefixOk){
        const done = chosen.slice(0, n);
        const rest = chosen.slice(n);
        hintEl.innerHTML = `<span class="done">${escapeHtml(done)}</span>${escapeHtml(rest)}`;
      } else {
        hintEl.textContent = chosen;
      }
      hintEl.classList.remove('wrong');
      if(candidates.some(x => x === got)) accept(true);
      return;
    }
    missAdvance((list||[]).join(' / '));
    return;
  }

  if(game.mode === 'alpha'){
    if(!got) return;
    const ch = got[0].toLowerCase();
    typeInput.value = ch;
    const expected = String(item).toLowerCase();
    if(ch === expected) accept(true);
    else missAdvance(expected.toUpperCase());
    return;
  }

  if(game.mode === 'romaji'){
    const expected = String(item.en);
    renderRomajiPromptProgress(expected, got);
    meaningEl.textContent = String(item.ja || '');
    return;
  }
});

// Buttons
giveUpBtn.addEventListener('click', stopGame);
againBtn.addEventListener('click', () => startGame());
backBtn.addEventListener('click', () => showScreen('homeScreen'));

resetStatsBtn.addEventListener('click', () => {
  if(!confirm('きろくをぜんぶけします。いいですか？')) return;
  localStorage.removeItem(STORAGE_KEY);
  stats = loadStats();
  renderStats();
});

badgesBtn?.addEventListener('click', () => {
  renderBadges();
  badgesDialog?.showModal();
});

soundToggleEl.checked = !!settings.sound;
soundToggleEl.addEventListener('change', () => {
  settings.sound = !!soundToggleEl.checked;
  saveSettings(settings);
  if(settings.sound){
    try{ ctx().resume(); }catch{}
    sfxOk();
  }
});

themeToggle?.addEventListener('click', toggleTheme);

// ========================
// Init
// ========================
renderLevelChips();
renderStats();
applyTheme(getInitialTheme());
