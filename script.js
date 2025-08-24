// ---------- Word Checker ----------
const area=document.getElementById('text'),
      kWords=document.getElementById('k-words'),
      kChars=document.getElementById('k-chars'),
      kCharsNS=document.getElementById('k-chars-ns'),
      kParas=document.getElementById('k-paras'),
      kRead=document.getElementById('k-read');

function updateStats(){
  if(!area) return;
  const t=area.value, trimmed=t.trim(),
        words=trimmed?t.split(/\s+/).length:0,
        chars=t.length,
        charsNS=t.replace(/\s/g,'').length,
        paras=trimmed?t.split(/\n{2,}|\r?\n/).filter(Boolean).length:0,
        minutes=Math.max(0,Math.ceil(words/200));
  kWords.textContent=words;
  kChars.textContent=chars;
  kCharsNS.textContent=charsNS;
  kParas.textContent=paras;
  kRead.textContent=`${minutes} min`;
}
area?.addEventListener('input',updateStats);

function toUpper(){ area.value=area.value.toUpperCase(); updateStats(); }
function toLower(){ area.value=area.value.toLowerCase(); updateStats(); }
function toTitle(){ area.value=area.value.replace(/\w\S*/g,w=>w[0].toUpperCase()+w.slice(1).toLowerCase()); updateStats(); }
function removeSpaces(){ area.value=area.value.replace(/\s+/g,' ').trim(); updateStats(); }
function copyText(){ navigator.clipboard.writeText(area.value); toast('Copied'); }
function clearText(){ area.value=''; updateStats(); }

function toast(msg){
  const el=document.createElement('div');
  el.textContent=msg;
  el.style.cssText=`position:fixed; left:50%; bottom:28px; transform:translateX(-50%);
  background:linear-gradient(135deg,#10b981,#6366f1); color:#fff; padding:10px 14px;
  border-radius:999px; box-shadow:0 10px 24px rgba(0,0,0,.25); z-index:1000; font-weight:700;`;
  document.body.appendChild(el);
  setTimeout(()=>{ el.style.transition='opacity .4s'; el.style.opacity='0'; },900);
  setTimeout(()=>el.remove(),1400);
}
updateStats();

// ---------- JSON Formatter ----------
function formatJSON(){
  const input=document.getElementById('json-input')?.value;
  if(!input) return;
  try{ document.getElementById('json-output').textContent=JSON.stringify(JSON.parse(input),null,4); }
  catch(e){ document.getElementById('json-output').textContent='Invalid JSON'; }
}
function copyJSON(){ navigator.clipboard.writeText(document.getElementById('json-output')?.textContent || ''); }
function clearJSON(){ if(document.getElementById('json-input')) document.getElementById('json-input').value=''; if(document.getElementById('json-output')) document.getElementById('json-output').textContent=''; }

// ---------- Regex Tester ----------
function testRegex(){
  const text=document.getElementById('regex-text')?.value,
        pattern=document.getElementById('regex-pattern')?.value;
  if(!text || !pattern) return;
  try{ const regex=new RegExp(pattern,'g'); const matches=text.match(regex);
        document.getElementById('regex-output').textContent=matches?matches.join('\n'):'No matches'; }
  catch(e){ document.getElementById('regex-output').textContent='Invalid Regex'; }
}
function copyRegex(){ navigator.clipboard.writeText(document.getElementById('regex-output')?.textContent || ''); }
function clearRegex(){ if(document.getElementById('regex-text')) document.getElementById('regex-text').value=''; if(document.getElementById('regex-pattern')) document.getElementById('regex-pattern').value=''; if(document.getElementById('regex-output')) document.getElementById('regex-output').textContent=''; }

// ---------- Base64 ----------
function encodeBase64(){ if(document.getElementById('base64-input')) document.getElementById('base64-output').textContent=btoa(document.getElementById('base64-input').value); }
function decodeBase64(){ 
  try{ if(document.getElementById('base64-input')) document.getElementById('base64-output').textContent=atob(document.getElementById('base64-input').value); }
  catch(e){ if(document.getElementById('base64-output')) document.getElementById('base64-output').textContent='Invalid Base64'; }
}
function clearBase64(){ if(document.getElementById('base64-input')) document.getElementById('base64-input').value=''; if(document.getElementById('base64-output')) document.getElementById('base64-output').textContent=''; }

// ---------- Color Picker / Gradient ----------
function generateGradient(){
  const c1=document.getElementById('color1')?.value, c2=document.getElementById('color2')?.value;
  if(document.getElementById('gradient-output')) document.getElementById('gradient-output').style.background=`linear-gradient(to right, ${c1}, ${c2})`;
}
function clearGradient(){ if(document.getElementById('color1')) document.getElementById('color1').value='#ffffff'; if(document.getElementById('color2')) document.getElementById('color2').value='#ffffff'; if(document.getElementById('gradient-output')) document.getElementById('gradient-output').style.background='none'; }
