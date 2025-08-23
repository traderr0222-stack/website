// Elements
const area = document.getElementById('text');
const kWords = document.getElementById('k-words');
const kChars = document.getElementById('k-chars');
const kCharsNS = document.getElementById('k-chars-ns');
const kParas = document.getElementById('k-paras');
const kRead = document.getElementById('k-read');
document.getElementById('year').textContent = new Date().getFullYear();

// Live stats
function updateStats(){
  const t = area.value;
  const trimmed = t.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const chars = t.length;
  const charsNS = t.replace(/\s/g,'').length;
  const paras = trimmed ? trimmed.split(/\n{2,}|\r?\n/).filter(Boolean).length : 0;
  const minutes = Math.max(0, Math.ceil(words/200));

  kWords.textContent = words;
  kChars.textContent = chars;
  kCharsNS.textContent = charsNS;
  kParas.textContent = paras;
  kRead.textContent = `${minutes} min`;
}
area.addEventListener('input', updateStats);

// Tools (kept simple + fast)
function toUpper(){ area.value = area.value.toUpperCase(); updateStats(); }
function toLower(){ area.value = area.value.toLowerCase(); updateStats(); }
function toTitle(){
  area.value = area.value.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase());
  updateStats();
}
function removeSpaces(){
  area.value = area.value.replace(/\s+/g,' ').trim();
  updateStats();
}
function copyText(){
  navigator.clipboard.writeText(area.value).then(()=>toast('Copied to clipboard'));
}
function clearText(){ area.value=''; updateStats(); }

// Minimal toast (no libs)
function toast(msg){
  const el = document.createElement('div');
  el.textContent = msg;
  el.style.cssText = `
    position:fixed; left:50%; bottom:28px; transform:translateX(-50%);
    background:linear-gradient(135deg,#10b981,#6366f1);
    color:#fff; padding:10px 14px; border-radius:999px;
    box-shadow:0 10px 24px rgba(0,0,0,.25); z-index:1000; font-weight:700;`;
  document.body.appendChild(el);
  setTimeout(()=>{ el.style.transition='opacity .4s'; el.style.opacity='0'; }, 900);
  setTimeout(()=> el.remove(), 1400);
}

// Initialize
updateStats();
