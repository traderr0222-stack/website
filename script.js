/* script.js — handles Word Checker, JSON, Regex, Base64, Color Picker, plus small UI helpers */

(function(){
  // Year in footer
  document.addEventListener('DOMContentLoaded', () => {
    const y = document.getElementById('year');
    if(y) y.textContent = new Date().getFullYear();
  });

  /* ---------- TOAST ---------- */
  function toast(msg){
    const el = document.createElement('div');
    el.textContent = msg;
    el.style.cssText = `
      position:fixed; left:50%; bottom:28px; transform:translateX(-50%);
      background:linear-gradient(135deg,#10b981,#6366f1); color:#fff; padding:10px 14px; border-radius:999px;
      box-shadow:0 10px 24px rgba(0,0,0,.25); z-index:9999; font-weight:700;`;
    document.body.appendChild(el);
    setTimeout(()=> el.style.opacity='0', 900);
    setTimeout(()=> el.remove(), 1400);
  }

  /* ---------- WORD CHECKER ---------- */
  const area = document.getElementById('text');
  const kWords = document.getElementById('k-words');
  const kChars = document.getElementById('k-chars');
  const kCharsNS = document.getElementById('k-chars-ns');
  const kParas = document.getElementById('k-paras');
  const kRead = document.getElementById('k-read');

  function updateStats(){
    if(!area) return;
    const t = area.value;
    const trimmed = t.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = t.length;
    const charsNS = t.replace(/\s/g,'').length;
    const paras = trimmed ? trimmed.split(/\n{2,}|\r?\n/).filter(Boolean).length : 0;
    const minutes = Math.max(0, Math.ceil(words/200));
    if(kWords) kWords.textContent = words;
    if(kChars) kChars.textContent = chars;
    if(kCharsNS) kCharsNS.textContent = charsNS;
    if(kParas) kParas.textContent = paras;
    if(kRead) kRead.textContent = `${minutes} min`;
  }
  if(area){
    area.addEventListener('input', updateStats);
    updateStats();
  }

  // Word checker buttons
  function setupWordButtons(){
    const bUp = document.getElementById('btn-upper') || document.getElementById('btn-upper-case');
    const bLow = document.getElementById('btn-lower');
    const bTitle = document.getElementById('btn-title');
    const bTrim = document.getElementById('btn-trim');
    const bCopy = document.getElementById('btn-copy');
    const bClear = document.getElementById('btn-clear');

    if(bUp) bUp.addEventListener('click', ()=>{ if(area){ area.value = area.value.toUpperCase(); updateStats(); } });
    if(bLow) bLow.addEventListener('click', ()=>{ if(area){ area.value = area.value.toLowerCase(); updateStats(); } });
    if(bTitle) bTitle.addEventListener('click', ()=>{ if(area){ area.value = area.value.replace(/\w\S*/g, w => w[0].toUpperCase()+w.slice(1).toLowerCase()); updateStats(); } });
    if(bTrim) bTrim.addEventListener('click', ()=>{ if(area){ area.value = area.value.replace(/\s+/g,' ').trim(); updateStats(); } });
    if(bCopy) bCopy.addEventListener('click', ()=>{ if(area){ navigator.clipboard.writeText(area.value).then(()=>toast('Copied')); } });
    if(bClear) bClear.addEventListener('click', ()=>{ if(area){ area.value=''; updateStats(); } });
  }
  setupWordButtons();

  /* ---------- JSON FORMATTER ---------- */
  const jsonInput = document.getElementById('json-input');
  const jsonOutput = document.getElementById('json-output');
  const btnJsonFormat = document.getElementById('btn-json-format');
  const btnJsonCopy = document.getElementById('btn-json-copy');
  const btnJsonClear = document.getElementById('btn-json-clear');

  function formatJSON(){
    if(!jsonInput || !jsonOutput) return;
    const v = jsonInput.value.trim();
    if(!v) { jsonOutput.textContent = ''; toast('No JSON input'); return; }
    try{
      const parsed = JSON.parse(v);
      jsonOutput.textContent = JSON.stringify(parsed, null, 2);
      toast('JSON formatted');
    }catch(e){
      jsonOutput.textContent = 'Invalid JSON: ' + (e.message || '');
    }
  }
  if(btnJsonFormat) btnJsonFormat.addEventListener('click', formatJSON);
  if(btnJsonCopy) btnJsonCopy.addEventListener('click', ()=>{ if(jsonOutput) navigator.clipboard.writeText(jsonOutput.textContent || '').then(()=>toast('Copied')); });
  if(btnJsonClear) btnJsonClear.addEventListener('click', ()=>{ if(jsonInput) jsonInput.value=''; if(jsonOutput) jsonOutput.textContent=''; });

  /* ---------- REGEX TESTER ---------- */
  const regexPattern = document.getElementById('regex-pattern');
  const regexText = document.getElementById('regex-text');
  const regexOutput = document.getElementById('regex-output');
  const btnRegexTest = document.getElementById('btn-regex-test');
  const btnRegexCopy = document.getElementById('btn-regex-copy');
  const btnRegexClear = document.getElementById('btn-regex-clear');

  function testRegex(){
    if(!regexText || !regexPattern || !regexOutput) return;
    const txt = regexText.value;
    const pat = regexPattern.value;
    if(!pat){ regexOutput.textContent = 'Enter a regex pattern.'; return; }
    try{
      const re = new RegExp(pat, 'g');
      const matches = txt.match(re);
      regexOutput.textContent = matches && matches.length ? matches.join('\n') : 'No matches';
    }catch(e){
      regexOutput.textContent = 'Invalid regex: ' + (e.message || '');
    }
  }
  if(btnRegexTest) btnRegexTest.addEventListener('click', testRegex);
  if(btnRegexCopy) btnRegexCopy.addEventListener('click', ()=>{ if(regexOutput) navigator.clipboard.writeText(regexOutput.textContent || '').then(()=>toast('Copied')); });
  if(btnRegexClear) btnRegexClear.addEventListener('click', ()=>{ if(regexText) regexText.value=''; if(regexPattern) regexPattern.value=''; if(regexOutput) regexOutput.textContent=''; });

  /* ---------- BASE64 ---------- */
  const base64Input = document.getElementById('base64-input') || document.getElementById('base64-text');
  const base64Output = document.getElementById('base64-output');
  const btnB64Encode = document.getElementById('btn-base64-encode') || document.getElementById('btn-base64-encode2');
  const btnB64Decode = document.getElementById('btn-base64-decode');
  const btnB64Copy   = document.getElementById('btn-base64-copy');
  const btnB64Clear  = document.getElementById('btn-base64-clear');

  function encodeBase64(){
    if(!base64Input || !base64Output) return;
    try { base64Output.textContent = btoa(base64Input.value); toast('Encoded'); }
    catch(e){ base64Output.textContent = 'Error encoding'; }
  }
  function decodeBase64(){
    if(!base64Input || !base64Output) return;
    try { base64Output.textContent = atob(base64Input.value); toast('Decoded'); }
    catch(e){ base64Output.textContent = 'Invalid Base64'; }
  }
  if(btnB64Encode) btnB64Encode.addEventListener('click', encodeBase64);
  if(btnB64Decode) btnB64Decode.addEventListener('click', decodeBase64);
  if(btnB64Copy) btnB64Copy.addEventListener('click', ()=>{ if(base64Output) navigator.clipboard.writeText(base64Output.textContent || '').then(()=>toast('Copied')); });
  if(btnB64Clear) btnB64Clear.addEventListener('click', ()=>{ if(base64Input) base64Input.value=''; if(base64Output) base64Output.textContent=''; });

  /* ---------- COLOR PICKER / GRADIENT ---------- */
  const color1 = document.getElementById('color1');
  const color2 = document.getElementById('color2');
  const gradientDisplay = document.getElementById('gradient-display') || document.getElementById('gradient-output');
  const gradientOutput = document.getElementById('gradient-output');
  const btnGenGrad = document.getElementById('btn-gen-gradient') || document.getElementById('btn-gen-gradient2') || document.getElementById('btn-gen-gradient3');
  const btnCopyGrad = document.getElementById('btn-copy-gradient') || document.getElementById('btn-copy-gradient2');
  const btnClearGrad = document.getElementById('btn-clear-gradient');

  function generateGradient(){
    if(!color1 || !color2) return;
    const c1 = color1.value, c2 = color2.value;
    const css = `linear-gradient(90deg, ${c1}, ${c2})`;
    if(gradientDisplay) gradientDisplay.style.background = css;
    if(gradientOutput) gradientOutput.textContent = `background: ${css};`;
    toast('Gradient generated');
  }
  if(btnGenGrad) btnGenGrad.addEventListener('click', generateGradient);
  if(btnCopyGrad) btnCopyGrad.addEventListener('click', ()=>{ if(gradientOutput) navigator.clipboard.writeText(gradientOutput.textContent || '').then(()=>toast('CSS copied')); });
  if(btnClearGrad) btnClearGrad.addEventListener('click', ()=>{ if(color1) color1.value='#ffffff'; if(color2) color2.value='#ffffff'; if(gradientDisplay) gradientDisplay.style.background='none'; if(gradientOutput) gradientOutput.textContent=''; });

  /* ---------- Lightweight initialization on DOM ready ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    // show year (in case loaded late)
    const y = document.getElementById('year');
    if(y) y.textContent = new Date().getFullYear();
    // run updateStats once
    updateStats();
  });

})();
