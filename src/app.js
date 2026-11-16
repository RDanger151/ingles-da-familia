/* ============================================================
   MOTOR DO SITE. Não contém conteúdo de ensino: lê tudo de window.COURSE.
   ============================================================ */
(function(){
'use strict';
var C=window.COURSE;

/* ---------- utilidades ---------- */
function h(tag,attrs){
  var e=document.createElement(tag),k;
  if(attrs)for(k in attrs){var v=attrs[k];if(v==null||v===false)continue;
    if(k==='class')e.className=v;else if(k==='html')e.innerHTML=v;
    else if(k.slice(0,2)==='on')e.addEventListener(k.slice(2),v);
    else e.setAttribute(k,v===true?'':v);}
  add(e,[].slice.call(arguments,2));return e;
}
function add(e,kids){kids.forEach(function(k){if(Array.isArray(k))return add(e,k);if(k==null||k===false)return;e.appendChild(k.nodeType?k:document.createTextNode(String(k)));});return e;}
function rnd(n){return Math.floor(Math.random()*n);}
function pick(a){return a[rnd(a.length)];}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=rnd(i+1),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function sp(s){return s.split('|');}
function today(){return Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5);}
function btn(label,fn,cls){return h('button',{class:'btn'+(cls?' '+cls:''),type:'button',onclick:fn},label);}
function link(label,fn){return h('button',{class:'linkbtn',type:'button',onclick:fn},label);}
var NUM=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
function norm(s){
  s=String(s).toLowerCase().replace(/[’‘`´]/g,"'");
  s=s.replace(/\bcan't\b/g,'can not').replace(/\bcannot\b/g,'can not').replace(/\bwon't\b/g,'will not').replace(/n't\b/g,' not')
   .replace(/'m\b/g,' am').replace(/'re\b/g,' are').replace(/'ll\b/g,' will').replace(/'ve\b/g,' have').replace(/'d\b/g,' would').replace(/'s\b/g,' is')
   .replace(/\bgonna\b/g,'going to').replace(/\bwanna\b/g,'want to').replace(/\bok\b/g,'okay');
  s=s.replace(/[^a-z0-9à-ú ]/g,' ').replace(/\b(\d|1[0-2])\b/g,function(m){return NUM[+m];});
  return s.replace(/\s+/g,' ').trim();
}
function words(s){var n=norm(s);return n?n.split(' '):[];}
function clean(w){return w.replace(/[.,!?;:"“”…()]/g,'');}
function lev(a,b){var m=[],i,j;for(i=0;i<=a.length;i++)m[i]=[i];for(j=0;j<=b.length;j++)m[0][j]=j;
  for(i=1;i<=a.length;i++)for(j=1;j<=b.length;j++)m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return m[a.length][b.length];}
function checkTyped(val,alts){var v=norm(val),best=99;if(!v)return 0;
  for(var i=0;i<alts.length;i++){var a=norm(alts[i]);if(a===v)return 1;best=Math.min(best,lev(a,v));}
  return best<=Math.max(1,Math.floor(v.length/10))?0.5:0;}
function matchWords(target,heard){
  var hw=words(heard),marks=[],ok=0,tot=0;
  target.split(/\s+/).forEach(function(dw){var nw=words(dw);if(!nw.length){marks.push({w:dw,ok:true});return;}
    var all=true,idx=[];nw.forEach(function(w){var i=hw.indexOf(w);if(i<0)all=false;else idx.push(i);});
    tot+=nw.length;if(all){ok+=nw.length;idx.forEach(function(i){hw[i]=null;});}
    marks.push({w:dw,ok:all});});
  return {score:tot?ok/tot:0,marks:marks};
}

/* ---------- preparar o conteúdo ---------- */
var LESS={natural:{},grammar:{}},CARDS={},BYID={},WEEKS=[];
function parseX(s){var a=sp(s),k=a[0],al;
  if(k==='g')return{type:'gap',tpl:a[1],ans:a[2],ds:a[3].split(','),pt:a[4],why:a[5],en:a[1].replace('___',a[2]).replace(/\s*\([^)]*\)/,'')};
  if(k==='b'){al=a[2].split('/');return{type:'build',pt:a[1],en:al[0],alts:al};}
  if(k==='t'){al=a[3].split('/');return{type:'build',src:a[1],ins:a[2],en:al[0],alts:al,why:a[4],pt:''};}
  if(k==='x'){al=a[2].split('/');return{type:'type',pt:a[1],en:al[0],alts:al,why:a[3]};}
  return{type:'speak',en:a[1],pt:a[2]};}
(function prep(){
  Object.keys(C.weeks).map(Number).sort(function(a,b){return a-b;}).forEach(function(w){
    WEEKS.push(w);
    ['natural','grammar'].forEach(function(tr){
      LESS[tr][w]=(C.weeks[w][tr]||[]).map(function(r,i){
        var L={id:r.id,track:tr,week:w,idx:i,title:r.t,sit:r.sit||'',can:r.can||'',why:r.w||'',explain:r.ex||'',err:r.err||[]};
        var spk=[];
        L.dialog=(r.d||[]).map(function(s){var a=sp(s);if(spk.indexOf(a[0])<0)spk.push(a[0]);return{s:a[0],en:a[1],pt:a[2],v:spk.indexOf(a[0])};});
        L.cards=(r.c||r.e||[]).map(function(s,j){var a=sp(s),c={id:r.id+'.'+j,en:a[0],pt:a[1],week:w};CARDS[c.id]=c;return c;});
        L.subs=(r.s||[]).map(function(f){var fr=sp(f[0]);return{en:fr[0],pt:fr[1],opts:f.slice(1).map(function(o){var a=sp(o);return{en:a[0],pt:a[1]};})};});
        L.q=(r.q||[]).map(function(s){var a=sp(s);return{ask:a[0],pt:a[1],starter:a[2]};}).concat((r.p||[]).map(function(s){var a=sp(s);return{pt:a[0],starter:a[1]};}));
        L.k=(r.k||[]).map(function(a){return{q:a[0],opts:a.slice(1)};});
        L.x=(r.x||[]).map(parseX);
        BYID[L.id]=L;return L;});
    });
  });
  C.survival.forEach(function(s,i){var a=sp(s);CARDS['sv.'+i]={id:'sv.'+i,en:a[0],pt:a[1],week:0};});
})();
var MAXW=WEEKS[WEEKS.length-1]||0;
var ALLCARDS=Object.keys(CARDS).map(function(k){return CARDS[k];});

/* ---------- armazenamento e perfis ---------- */
var KEY='ingles-da-familia-v1',storageOK=true,DB=null;
try{DB=JSON.parse(localStorage.getItem(KEY));}catch(e){storageOK=false;}
if(!DB||!DB.profiles)DB={v:1,cur:null,theme:'auto',profiles:{}};
function save(){try{localStorage.setItem(KEY,JSON.stringify(DB));storageOK=true;}catch(e){storageOK=false;}}
function P(){return (DB.cur&&DB.profiles[DB.cur])||null;}
function newProfile(name){return{id:'p'+Date.now().toString(36)+rnd(99),name:name,track:null,placed:false,level:1,
  pos:{natural:{w:1,d:0},grammar:{w:1,d:0}},done:{},cards:{},bt:[],days:{},hist:[],pron:{},conv:{},rhy:{},slow:false,hide:false,best:0,last:0};}
function dayRec(){var p=P(),t=today();if(!p.days[t])p.days[t]=[0,0,0,0];return p.days[t];}
function addSpeak(sec){if(P()){dayRec()[1]+=Math.min(30,Math.max(1,Math.round(sec)));save();}}
function record(ok){var p=P();if(!p)return;p.hist.push(ok===1?1:0);if(p.hist.length>20)p.hist.shift();dayRec()[2]++;save();}
function adj(){var hh=P().hist;if(hh.length<8)return 0;var a=hh.reduce(function(x,y){return x+y;},0)/hh.length;return a>0.9?1:a<0.65?-1:0;}
var lastAct=Date.now();
['pointerdown','keydown'].forEach(function(ev){document.addEventListener(ev,function(){lastAct=Date.now();},true);});
var tickN=0;
setInterval(function(){if(P()&&!document.hidden&&Date.now()-lastAct<60000){dayRec()[0]+=5;if(++tickN%6===0)save();}},5000);

var hostTheme=document.documentElement.getAttribute('data-theme');
function applyTheme(){var r=document.documentElement;
  if(DB.theme==='auto'){if(hostTheme)r.setAttribute('data-theme',hostTheme);else r.removeAttribute('data-theme');}
  else r.setAttribute('data-theme',DB.theme);}

/* ---------- repetição espaçada ---------- */
var IV=[0,1,3,7,14,30,60,120];
function grade(id,ok){var st=P().cards[id];if(!st)return;var t=today();
  if(ok===1){st[0]=Math.min(7,st[0]+1);st[1]=t+IV[st[0]];}
  else if(ok===0.5){st[1]=t+1;}
  else{st[0]=st[0]>2?1:0;st[1]=t+1;st[3]++;}
  st[2]++;save();}
function dueCards(){var p=P(),t=today();return Object.keys(p.cards).filter(function(id){return CARDS[id]&&p.cards[id][1]<=t;}).sort(function(a,b){return p.cards[a][1]-p.cards[b][1];});}
function learnCards(list){var p=P(),t=today();list.forEach(function(c){if(!p.cards[c.id])p.cards[c.id]=[0,t+1,0,0];});}
function stats(){var p=P(),t=today(),sec=0,spk=0,daysN=0,k;
  for(k in p.days){sec+=p.days[k][0];spk+=p.days[k][1];if(p.days[k][2]>0||p.days[k][3]>0)daysN++;}
  function act(d){return p.days[d]&&(p.days[d][2]>0||p.days[d][3]>0);}
  var s=0,d=act(t)?t:t-1;while(act(d)){s++;d--;}
  var ids=Object.keys(p.cards).filter(function(id){return CARDS[id];}),ws={};
  ids.forEach(function(id){words(CARDS[id].en).forEach(function(w){ws[w]=1;});});
  return{min:Math.round(sec/60),hours:sec/3600,speak:Math.round(spk/60),days:daysN,streak:s,
    cards:ids.length,mastered:ids.filter(function(id){return p.cards[id][0]>=4;}).length,words:Object.keys(ws).length,due:dueCards().length};}

/* ---------- áudio: síntese de voz ---------- */
var TTS={ok:('speechSynthesis' in window)&&(typeof SpeechSynthesisUtterance!=='undefined'),voices:[]};
var NOVELTY=/albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|deranged|hysterical|pipe|junior|ralph|fred|eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley/i;
function loadVoices(){try{
  var v=speechSynthesis.getVoices().filter(function(x){return /^en([-_]|$)/i.test(x.lang)&&!NOVELTY.test(x.name);});
  function sc(x){return (/en[-_]US/i.test(x.lang)?4:0)+(/google|natural|samantha|enhanced|premium/i.test(x.name)?2:0)+(x.localService?1:0);}
  v.sort(function(a,b){return sc(b)-sc(a);});TTS.voices=v.slice(0,4);}catch(e){}}
if(TTS.ok){loadVoices();try{speechSynthesis.addEventListener('voiceschanged',loadVoices);}catch(e){}}
var lastText='',vTick=0,playTok=0,liveTimer=null;
function stopAudio(){playTok++;if(liveTimer){clearInterval(liveTimer);liveTimer=null;}try{if(TTS.ok)speechSynthesis.cancel();}catch(e){}}
function say(text,o){o=o||{};return new Promise(function(res){
  if(!TTS.ok)return res(false);
  try{speechSynthesis.cancel();
    var u=new SpeechSynthesisUtterance(text),vs=TTS.voices,v=null,p=P();
    if(vs.length){if(o.voice==='rand')v=pick(vs);else if(typeof o.voice==='number')v=vs[o.voice%vs.length];
      else{if(text!==lastText){vTick++;lastText=text;}v=vs[vTick%vs.length];}}
    u.lang=v?v.lang:'en-US';if(v)u.voice=v;u.rate=o.rate||((p&&p.slow)?0.72:0.95);
    var done=false,fin=function(ok){if(!done){done=true;res(ok);}};
    u.onend=function(){fin(true);};u.onerror=function(){fin(false);};
    speechSynthesis.speak(u);setTimeout(function(){fin(true);},2500+text.length*130);
  }catch(e){res(false);}});}
function audioBtns(text,o){o=o||{};
  if(!TTS.ok)return h('p',{class:'muted small'},'Este navegador não tem voz em inglês. Leia a frase em voz alta.');
  return h('div',{class:'audio'},
    h('button',{class:'abtn'+(o.big?' big':''),type:'button',onclick:function(ev){ev.stopPropagation();say(text,{voice:o.voice});}},'▶ Ouvir'),
    h('button',{class:'abtn slow',type:'button',onclick:function(ev){ev.stopPropagation();say(text,{voice:o.voice,rate:0.62});}},'Devagar'));}

/* ---------- fala do aluno: reconhecimento, gravação ou autoavaliação ---------- */
var SRC=window.SpeechRecognition||window.webkitSpeechRecognition||null,micBlocked=false;
var canRec=!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&window.MediaRecorder),recBlocked=false;
function micMode(){return SRC&&!micBlocked?'sr':(canRec&&!recBlocked?'rec':'self');}
function speakBox(target,o){
  o=o||{};var box=h('div',{class:'speak'}),out=h('div',{class:'heard'}),note='';
  function render(){
    box.textContent='';var mode=micMode();
    if(mode==='sr'){var b=btn('Falar',function(){startSR(b);},'mic');box.appendChild(b);}
    else if(mode==='rec'){var r=btn('Gravar minha voz',function(){startRec(r);},'mic');box.appendChild(r);}
    else box.appendChild(h('p',{class:'note'},'Diga em voz alta, com calma. '+(note||'Aqui o microfone não está disponível, então você mesmo avalia.')));
    if(note&&mode!=='self')box.appendChild(h('p',{class:'note'},note));
    box.appendChild(out);
  }
  function show(alts){
    out.textContent='';var best=alts[0],m=null;
    if(target){alts.forEach(function(a){var r=matchWords(target,a);if(!m||r.score>m.score){m=r;best=a;}});
      out.appendChild(h('p',{class:'w'},m.marks.map(function(k){return h('span',{class:k.ok?'ok':'no'},k.w);})));
      out.appendChild(h('p',{class:'small'},m.score>=0.8?'Entendi tudo. Muito bem!':m.score>=0.5?'Entendi quase tudo. As palavras sublinhadas não ficaram claras.':'Entendi pouco. Ouça o modelo e tente de novo.'));}
    out.appendChild(h('p',{class:'small muted'},'O aparelho ouviu: “'+best+'”'));
    if(o.onResult)o.onResult(m?m.score:null,best);
  }
  function startSR(b){
    var t0=Date.now(),r;stopAudio();
    try{r=new SRC();}catch(e){micBlocked=true;return render();}
    r.lang='en-US';r.interimResults=false;r.maxAlternatives=3;
    b.textContent='Ouvindo… fale agora';b.classList.add('live');b.disabled=true;out.textContent='';
    r.onresult=function(e){var alts=[];for(var i=0;i<e.results[0].length;i++)alts.push(e.results[0][i].transcript);show(alts);};
    r.onerror=function(e){
      if(e.error==='not-allowed'||e.error==='service-not-allowed'||e.error==='audio-capture'){micBlocked=true;note='O microfone não foi liberado aqui.';render();}
      else if(e.error==='network'){micBlocked=true;note='Sem internet, este aparelho não reconhece a fala.';render();}
      else out.textContent='Não ouvi nada. Toque em Falar e tente de novo.';};
    r.onend=function(){addSpeak((Date.now()-t0)/1000);b.textContent='Falar de novo';b.classList.remove('live');b.disabled=false;};
    try{r.start();}catch(e){micBlocked=true;render();}
  }
  function startRec(b){
    stopAudio();
    navigator.mediaDevices.getUserMedia({audio:true}).then(function(st){
      var mr=new MediaRecorder(st),chunks=[],t0=Date.now(),to;
      mr.ondataavailable=function(e){chunks.push(e.data);};
      mr.onstop=function(){clearTimeout(to);st.getTracks().forEach(function(t){t.stop();});addSpeak((Date.now()-t0)/1000);
        var url=URL.createObjectURL(new Blob(chunks,{type:mr.mimeType||'audio/webm'}));
        b.textContent='Gravar de novo';b.classList.remove('live');b.onclick=null;
        out.textContent='';
        out.appendChild(h('div',{class:'audio'},
          h('button',{class:'abtn',type:'button',onclick:function(){try{new Audio(url).play();}catch(e){}}},'▶ Minha voz'),
          target&&h('button',{class:'abtn slow',type:'button',onclick:function(){say(target);}},'▶ Modelo')));
        out.appendChild(h('p',{class:'small muted'},'Compare as duas e repita até ficar parecido.'));
        if(o.onResult)o.onResult(null,null);};
      mr.start();b.textContent='Parar a gravação';b.classList.add('live');
      var stop=function(){if(mr.state!=='inactive')mr.stop();};
      b.onclick=stop;to=setTimeout(stop,12000);
    }).catch(function(){recBlocked=true;note='O microfone não foi liberado aqui.';render();});
  }
  render();return box;
}

/* ---------- exercícios ---------- */
var FILL=['is','are','do','does','the','a','not','to','am','have','in','at','it','he','my'];
function feedback(box,ok,card,why,next){
  var fb=h('div',{class:'fb '+(ok===1?'good':ok?'mid':'bad')},
    h('strong',null,ok===1?pick(['Isso!','Muito bem!','Certo!','Perfeito!']):ok?'Quase! Olhe a escrita.':'Ainda não. O certo é:'),
    card&&card.en&&h('p',{class:'en'},card.en),card&&card.pt&&h('p',{class:'pt'},card.pt),
    why&&ok!==1&&h('p',{class:'why'},why),card&&card.en&&audioBtns(card.en));
  var b=btn('Continuar',next);box.appendChild(fb);box.appendChild(b);
  if(card&&card.en)say(card.en);
  try{b.scrollIntoView({block:'nearest'});}catch(e){}
}
function selfRate(box,cb){
  box.appendChild(h('p',{class:'ins'},'Como foi?'));
  box.appendChild(h('div',{class:'row'},btn('Errei',function(){cb(0);},'sec'),btn('Quase',function(){cb(0.5);},'sec'),btn('Acertei',function(){cb(1);})));
}
function distract(spec,n,field){var pool=ALLCARDS.filter(function(c){return c[field]!==spec[field]&&(!spec.week||c.week===spec.week||c.week===0);});
  if(pool.length<n)pool=ALLCARDS.filter(function(c){return c[field]!==spec[field];});
  var out=[];shuffle(pool).forEach(function(c){if(out.length<n&&out.indexOf(c[field])<0)out.push(c[field]);});return out;}
function exercise(spec,done){
  var box=h('div',{class:'ex'}),card={en:spec.en,pt:spec.pt},locked=false;
  function fin(ok){record(ok);feedback(box,ok,card,spec.why,function(){done(ok);});}
  function rate(){selfRate(box,function(ok){record(ok);done(ok);});}
  var t=spec.type;
  if(t==='mc'){
    box.appendChild(h('p',{class:'ins'},'Ouça. O que significa?'));box.appendChild(audioBtns(spec.en,{big:true}));
    if(!TTS.ok)box.appendChild(h('p',{class:'en'},spec.en));
    shuffle([spec.pt].concat(distract(spec,2,'pt'))).forEach(function(o){
      var b=h('button',{class:'opt',type:'button',onclick:function(){if(locked)return;locked=true;b.classList.add(o===spec.pt?'right':'wrong');fin(o===spec.pt?1:0);}},o);box.appendChild(b);});
    setTimeout(function(){say(spec.en);},250);
  }
  else if(t==='recall'){
    box.appendChild(h('p',{class:'ins'},'Ouça e diga em voz alta o que significa. Depois confira.'));box.appendChild(audioBtns(spec.en,{big:true}));
    if(!TTS.ok)box.appendChild(h('p',{class:'en'},spec.en));
    var rb=btn('Ver a resposta',function(){rb.remove();box.appendChild(h('div',{class:'card soft'},h('p',{class:'en'},spec.en),h('p',{class:'pt'},spec.pt)));rate();},'sec');
    box.appendChild(rb);setTimeout(function(){say(spec.en);},250);
  }
  else if(t==='build'){
    if(spec.ins){box.appendChild(h('p',{class:'ins'},spec.ins));box.appendChild(h('p',{class:'prompt'},spec.src));}
    else{box.appendChild(h('p',{class:'ins'},'Monte a frase em inglês:'));box.appendChild(h('p',{class:'prompt'},spec.pt));}
    var alts=spec.alts||[spec.en],ws=alts[0].split(/\s+/).map(clean).filter(Boolean),low=ws.map(function(w){return w.toLowerCase();});
    var extra=shuffle(FILL.filter(function(w){return low.indexOf(w)<0;})).slice(0,2);
    var aEl=h('div',{class:'tiles answer','aria-label':'Sua resposta'}),bEl=h('div',{class:'tiles bank'});
    var chk=btn('Conferir',function(){if(locked)return;locked=true;var s=[].map.call(aEl.children,function(c){return c.textContent;}).join(' ');chk.remove();
      fin(alts.some(function(a){return norm(a)===norm(s);})?1:0);});chk.disabled=true;
    shuffle(ws.concat(extra)).forEach(function(w){var tl=h('button',{class:'tile',type:'button'},w);
      tl.onclick=function(){if(locked)return;(tl.parentNode===bEl?aEl:bEl).appendChild(tl);chk.disabled=!aEl.children.length;};bEl.appendChild(tl);});
    box.appendChild(aEl);box.appendChild(bEl);box.appendChild(chk);
  }
  else if(t==='gap'){
    box.appendChild(h('p',{class:'ins'},'Complete a frase:'));box.appendChild(h('p',{class:'prompt'},spec.tpl));
    if(spec.pt)box.appendChild(h('p',{class:'pt'},spec.pt));
    if(spec.ds){shuffle([spec.ans].concat(spec.ds)).forEach(function(o){
      var b=h('button',{class:'opt',type:'button',onclick:function(){if(locked)return;locked=true;b.classList.add(o===spec.ans?'right':'wrong');fin(o===spec.ans?1:0);}},o);box.appendChild(b);});}
    else typed('Escreva a palavra que falta',function(v){return checkTyped(v,[spec.ans]);});
  }
  else if(t==='dict'){
    box.appendChild(h('p',{class:'ins'},'Ouça e escreva o que ouviu:'));box.appendChild(audioBtns(spec.en,{big:true}));
    if(!TTS.ok){box.appendChild(h('p',{class:'pt'},spec.pt));}
    typed('Escreva em inglês',function(v){return checkTyped(v,[spec.en]);});setTimeout(function(){say(spec.en);},250);
  }
  else if(t==='type'){
    box.appendChild(h('p',{class:'ins'},'Escreva em inglês:'));box.appendChild(h('p',{class:'prompt'},spec.pt));
    typed('Escreva em inglês',function(v){return checkTyped(v,spec.alts||[spec.en]);});
    box.appendChild(link('Prefiro montar com palavras prontas',function(){var n=exercise({type:'build',pt:spec.pt,en:spec.en,alts:spec.alts,why:spec.why},done);box.parentNode.replaceChild(n,box);}));
  }
  else if(t==='say'){
    if(spec.model){box.appendChild(h('div',{class:'card soft'},h('p',{class:'small muted'},'Modelo'),h('p',{class:'en'},spec.model.en),h('p',{class:'pt'},spec.model.pt),audioBtns(spec.model.en)));
      box.appendChild(h('p',{class:'ins'},'Agora troque uma parte e diga em inglês:'));}
    else box.appendChild(h('p',{class:'ins'},'Diga em inglês, em voz alta:'));
    box.appendChild(h('p',{class:'prompt'},spec.pt));
    var shown=false,rv=btn('Ver a resposta',reveal,'sec');
    function reveal(){if(shown)return;shown=true;rv.remove();
      box.appendChild(h('div',{class:'card soft'},h('p',{class:'en'},spec.en),audioBtns(spec.en)));say(spec.en);rate();}
    box.appendChild(speakBox(spec.en,{onResult:function(){setTimeout(reveal,600);}}));box.appendChild(rv);
  }
  else{ /* speak: ouvir e repetir com o texto à vista */
    box.appendChild(h('p',{class:'ins'},'Ouça e repita em voz alta, imitando o ritmo:'));
    box.appendChild(h('p',{class:'en'},spec.en));box.appendChild(h('p',{class:'pt'},spec.pt));box.appendChild(audioBtns(spec.en));
    box.appendChild(speakBox(spec.en));box.appendChild(btn('Continuar',function(){dayRec()[2]++;if(micMode()==='self')addSpeak(3);done(1);}));
    setTimeout(function(){say(spec.en);},250);
  }
  function typed(ph,check){
    var inp=h('input',{class:'inp',id:'resposta',type:'text',placeholder:ph,autocomplete:'off',autocapitalize:'off',autocorrect:'off',spellcheck:'false','aria-label':ph});
    function go(){if(locked||!inp.value.trim())return;locked=true;inp.disabled=true;row.remove();fin(check(inp.value));}
    var row=h('div',{class:'row'},btn('Não sei',function(){if(locked)return;locked=true;inp.disabled=true;row.remove();fin(0);},'sec'),btn('Conferir',go));
    inp.addEventListener('keydown',function(e){if(e.key==='Enter')go();});
    box.appendChild(inp);box.appendChild(row);
  }
  return box;
}
function quizQ(spec,done){ /* pergunta de múltipla escolha; a 1ª opção é a certa */
  var box=h('div',{class:'ex'}),locked=false,right=spec.opts[0];
  if(spec.say){box.appendChild(audioBtns(spec.say,{big:true}));setTimeout(function(){say(spec.say);},250);}
  if(spec.text)box.appendChild(h('p',{class:'en'},spec.text));
  box.appendChild(h('p',{class:'prompt'},spec.q));
  var os=shuffle(spec.opts);if(spec.dunno)os.push('Não sei');
  os.forEach(function(o){var b=h('button',{class:'opt',type:'button',onclick:function(){if(locked)return;locked=true;var ok=o===right?1:0;
    b.classList.add(ok?'right':'wrong');
    if(spec.quick){setTimeout(function(){done(ok);},650);return;}
    record(ok);
    box.appendChild(h('div',{class:'fb '+(ok?'good':'bad')},h('strong',null,ok?'Isso!':'Ainda não.'),!ok&&h('p',null,'Resposta: '+right),spec.after&&h('p',{class:'small'},spec.after)));
    box.appendChild(btn('Continuar',function(){done(ok);}));}},o);box.appendChild(b);});
  return box;
}
function cardSpec(id,lvl){
  var c=CARDS[id],types=lvl<=1?['mc','build','gap']:lvl<=3?['build','gap','say','recall','mc']:['gapT','dict','say','recall','build'];
  var t=pick(types),s={type:t,en:c.en,pt:c.pt,week:c.week};
  if(t==='gap'||t==='gapT'){
    var ws=c.en.split(' '),cand=[];ws.forEach(function(w,i){if(clean(w).length>=3&&!/\d/.test(w))cand.push(i);});
    if(!cand.length){s.type='build';return s;}
    var i=pick(cand),ans=clean(ws[i]);s.ans=ans;s.tpl=ws.map(function(w,j){return j===i?w.replace(ans,'___'):w;}).join(' ');
    if(t==='gap'){var pool=[];ALLCARDS.forEach(function(x){x.en.split(' ').forEach(function(w){w=clean(w);if(w.length>=2&&w.toLowerCase()!==ans.toLowerCase()&&pool.indexOf(w.toLowerCase())<0)pool.push(w.toLowerCase());});});
      s.ds=shuffle(pool).slice(0,2);if(/^[A-Z]/.test(ans)&&i===0)s.ds=s.ds.map(function(w){return w.charAt(0).toUpperCase()+w.slice(1);});}
    s.type='gap';
  }
  return s;
}
function runList(el,items,render,next,o){
  o=o||{};var q=items.slice(),n=0,total=items.length,redo=[];
  (function go(){
    if(!q.length)return next();
    var it=q.shift();n++;el.textContent='';
    el.appendChild(h('p',{class:'count'},(o.title?o.title+' · ':'')+(n<=total?n+' de '+total:'de novo, para fixar')));
    el.appendChild(render(it,function(ok){if(o.requeue&&ok===0&&redo.indexOf(it)<0){redo.push(it);q.push(it);}if(o.onResult)o.onResult(it,ok);go();}));
    window.scrollTo(0,0);
  })();
}

/* ---------- fluxo em etapas ---------- */
var $top=document.getElementById('top'),$main=document.getElementById('main'),$nav=document.getElementById('nav');
var tab='hoje',sub=null;
function go(t,s){tab=t;sub=s||null;render();}
function flow(steps,onEnd,exitFn){
  var i=0;document.body.classList.add('flow');
  function end(){document.body.classList.remove('flow');stopAudio();}
  function step(){
    stopAudio();
    if(i>=steps.length){end();return onEnd();}
    var s=steps[i];i++;
    $top.textContent='';
    $top.appendChild(h('div',{class:'fhead'},
      h('button',{class:'exit',type:'button',onclick:function(){end();save();(exitFn||render)();}},'✕ Sair'),
      h('div',{class:'ft'},h('b',null,s.label),h('small',null,'Etapa '+i+' de '+steps.length)),
      h('div',{class:'bar'},h('i',{style:'width:'+Math.round((i-1)/steps.length*100)+'%'}))));
    $main.textContent='';var el=h('section',{class:'step'});$main.appendChild(el);window.scrollTo(0,0);
    s.run(el,step);
  }
  step();
}
function showDone(title,lines,label,fn){
  $main.textContent='';chrome();
  $main.appendChild(h('div',{class:'card'},h('p',{class:'eyebrow'},'Concluído'),h('h1',null,title),lines.map(function(l){return h('p',null,l);})));
  $main.appendChild(btn(label||'Continuar',fn||render));window.scrollTo(0,0);
}

/* ---------- etapas reutilizáveis ---------- */
function dialogEl(lines){
  var wrap=h('div',{class:'stack'}),els=[];
  lines.forEach(function(l){
    var pt=h('p',{class:'l-pt hid'},l.pt);
    var e=h('div',{class:'line',role:'button',tabindex:'0',onclick:function(){say(l.en,{voice:l.v});}},
      h('span',{class:'who'},l.s),h('p',{class:'l-en'},l.en),pt,
      h('button',{class:'linkbtn',type:'button',onclick:function(ev){ev.stopPropagation();pt.classList.toggle('hid');}},'Ver ou esconder a tradução'));
    els.push(e);wrap.appendChild(e);});
  wrap.play=function(){var tok=++playTok,i=0;(function nx(){els.forEach(function(e){e.classList.remove('on');});
    if(tok!==playTok||i>=lines.length)return;els[i].classList.add('on');try{els[i].scrollIntoView({block:'center',behavior:'smooth'});}catch(e){}
    say(lines[i].en,{voice:lines[i].v}).then(function(){i++;setTimeout(nx,350);});})();};
  return wrap;
}
function sDialog(L,o){o=o||{};return{label:o.label||'Entrada nova',run:function(el,next){
  var d=dialogEl(L.dialog);
  el.appendChild(h('p',{class:'eyebrow'},L.sit||'Diálogo'));el.appendChild(h('h2',null,L.title));
  el.appendChild(h('p',{class:'muted'},o.again?'Ouça de novo, sem pressa. Quanto você entende sem olhar a tradução?':'Ouça primeiro sem olhar a tradução. Toque em uma frase para ouvir de novo. A tradução aparece quando você pedir.'));
  if(TTS.ok)el.appendChild(h('div',{class:'row'},btn('▶ Ouvir tudo',function(){d.play();}),btn('Esconder o inglês',function(ev){ev.target.textContent=d.classList.toggle('hideen')?'Mostrar o inglês':'Esconder o inglês';},'sec')));
  else el.appendChild(h('p',{class:'note'},'Este navegador não tem voz em inglês. Leia o diálogo em voz alta.'));
  el.appendChild(d);
  if(L.why)el.appendChild(h('details',null,h('summary',null,'Quer saber por quê?'),h('p',null,L.why)));
  el.appendChild(btn(o.again||!L.k.length?'Continuar':'Entendi. Vamos às perguntas',function(){stopAudio();
    if(o.again||!L.k.length)return next();
    runList(el,L.k,function(k,cb){return quizQ({q:k.q,opts:k.opts},cb);},next,{title:'Compreensão'});}));
}};}
function sExplain(L){return{label:'Entrada nova',run:function(el,next){
  el.appendChild(h('p',{class:'eyebrow'},'Gramática'));el.appendChild(h('h2',null,L.title));
  el.appendChild(h('div',{class:'card'},h('p',{html:L.explain})));
  el.appendChild(h('div',{class:'card soft'},h('h3',null,'Erros comuns de brasileiros'),h('ul',{class:'plain'},L.err.map(function(e){return h('li',{html:e});}))));
  el.appendChild(h('h3',null,'Exemplos'));
  L.cards.forEach(function(c){el.appendChild(h('div',{class:'line',onclick:function(){say(c.en);}},h('p',{class:'l-en'},c.en),h('p',{class:'l-pt'},c.pt)));});
  if(L.dialog.length){el.appendChild(h('h3',null,'Na conversa'));var d=dialogEl(L.dialog);if(TTS.ok)el.appendChild(btn('▶ Ouvir a conversa',function(){d.play();},'sec'));el.appendChild(d);}
  el.appendChild(btn('Entendi. Vamos praticar',function(){next();}));
}};}
function sPractice(L){return{label:'Prática de lembrar',run:function(el,next){
  var items;
  if(L.track==='grammar')items=L.x.slice();
  else{
    var ty=shuffle(['mc','build','gap','mc','build','gap','build','mc']);
    items=L.cards.map(function(c,i){var s=cardSpec(c.id,0);if(s.type!==ty[i%ty.length]&&ty[i%ty.length]!=='gap'){s={type:ty[i%ty.length],en:c.en,pt:c.pt,week:c.week};}return s;});
    items=shuffle(items);
    L.subs.forEach(function(f){var m={en:f.en.replace('___',f.opts[0].en),pt:f.pt.replace('___',f.opts[0].pt)};
      shuffle(f.opts.slice(1)).slice(0,2).forEach(function(o){items.push({type:'say',model:m,en:f.en.replace('___',o.en),pt:f.pt.replace('___',o.pt)});});});
  }
  runList(el,items,exercise,next,{requeue:true});
}};}
function pickSound(){var p=P(),best=C.sounds[0],bn=1e9;C.sounds.forEach(function(s){var n=(p.pron[s.id]||[0,0])[1];if(n<bn){bn=n;best=s;}});return best;}
function pairDrill(el,snd,n,next){
  var tr=[],i,ok=0,labs;
  if(snd.type==='cat'){labs=Object.keys(snd.cats);for(i=0;i<n;i++){var l=pick(labs);tr.push({say:pick(snd.cats[l]),opts:labs,ans:l,show:true});}}
  else for(i=0;i<n;i++){var pr=pick(snd.pairs);tr.push({say:pick(pr),opts:pr,ans:null});}
  tr.forEach(function(t){if(!t.ans)t.ans=t.say;});
  if(!TTS.ok){el.appendChild(h('p',{class:'note'},'Este treino precisa da voz do navegador, que não está disponível aqui.'));el.appendChild(btn('Continuar',next));return;}
  runList(el,tr,function(t,cb){
    var box=h('div',{class:'ex'}),locked=false,rate=0.78+Math.random()*0.22,vo=TTS.voices.length?rnd(TTS.voices.length):0;
    function play(){say(t.say,{voice:vo,rate:rate});}
    box.appendChild(h('p',{class:'eyebrow'},snd.name));
    box.appendChild(h('p',{class:'prompt'},t.show?snd.q:'Qual palavra você ouviu?'));
    if(t.show)box.appendChild(h('p',{class:'en'},t.say));
    box.appendChild(h('button',{class:'abtn big',type:'button',onclick:play},'▶ Ouvir de novo'));
    var grid=h('div',{class:t.opts.length===2?'pairrow':'stack'});
    t.opts.forEach(function(o){var b=h('button',{class:'opt center',type:'button',onclick:function(){if(locked)return;locked=true;var good=o===t.ans;if(good)ok++;
      b.classList.add(good?'right':'wrong');dayRec()[2]++;
      box.appendChild(h('div',{class:'fb '+(good?'good':'bad')},h('strong',null,good?'Isso!':'Era “'+t.ans+'”.'),
        !t.show&&h('p',{class:'small'},'Ouça a diferença:'),
        !t.show&&h('div',{class:'audio'},t.opts.map(function(w){return h('button',{class:'abtn',type:'button',onclick:function(){say(w,{voice:vo,rate:0.8});}},'▶ '+w);}))));
      box.appendChild(btn('Próxima',function(){cb(good?1:0);}));}},o);grid.appendChild(b);});
    box.appendChild(grid);setTimeout(play,300);return box;
  },function(){var p=P(),r=p.pron[snd.id]||[0,0];r[0]+=ok;r[1]+=n;p.pron[snd.id]=r;save();
    el.textContent='';el.appendChild(h('div',{class:'card'},h('h2',null,'Você acertou '+ok+' de '+n),h('p',{class:'muted'},ok>=n-1?'Seu ouvido já separa bem esses sons.':'É normal errar: esses sons não existem em português. O ouvido aprende com repetição.')));
    el.appendChild(btn('Continuar',next));},{title:'Treino de ouvido'});
}
function shadow(el,sents,next){
  runList(el,sents,function(c,cb){return exercise({type:'speak',en:c.en,pt:c.pt},cb);},next,{title:'Ouvir e repetir'});
}
function sSpeak(L){return{label:'Fala e ouvido',run:function(el,next){
  var snd=pickSound(),src=L.cards.length?L.cards:L.dialog;
  var sents=shuffle(src).slice(0,4);
  pairDrill(el,snd,6,function(){shadow(el,sents,next);});
}};}
function produceEl(q,cb){
  var box=h('div',{class:'ex'});
  if(q.ask){box.appendChild(h('p',{class:'ins'},'Responda em voz alta, sobre você:'));box.appendChild(h('p',{class:'en'},q.ask));box.appendChild(h('p',{class:'pt'},q.pt));box.appendChild(audioBtns(q.ask));setTimeout(function(){say(q.ask);},250);}
  else{box.appendChild(h('p',{class:'ins'},'Diga em inglês, sobre a sua vida:'));box.appendChild(h('p',{class:'prompt'},q.pt));}
  box.appendChild(h('details',null,h('summary',null,'Preciso de uma ajuda para começar'),h('p',{class:'en'},q.starter)));
  box.appendChild(speakBox(null,{}));
  box.appendChild(btn('Falei. Continuar',function(){dayRec()[2]++;if(micMode()==='self')addSpeak(4);save();cb(1);}));
  return box;
}
function sProduce(qs,label){return{label:label||'Desafio final',run:function(el,next){
  runList(el,qs,produceEl,next,{title:'Sua vez de falar'});
}};}
function backTrans(el,L,next){
  var lines=L.dialog.slice(0,6);
  el.textContent='';
  el.appendChild(h('div',{class:'card'},h('p',{class:'eyebrow'},'Tradução de volta'),h('h2',null,L.title),
    h('p',null,'Você ouviu este diálogo há alguns dias. Agora veja cada frase em português e diga em inglês antes de conferir.')));
  el.appendChild(btn('Começar',function(){
    runList(el,lines,function(l,cb){return exercise({type:'say',en:l.en,pt:l.pt},cb);},next,{title:'Tradução de volta'});}));
}
function reviewRun(el,ids,next,nograde){
  var a=adj();
  runList(el,ids,function(id,cb){return exercise(cardSpec(id,P().cards[id][0]+a),cb);},next,
    {title:'Revisão',requeue:true,onResult:function(id,ok){if(!nograde)grade(id,ok);}});
}
function speedRound(el,next){
  var p=P(),ids=shuffle(Object.keys(p.cards).filter(function(id){return CARDS[id];}));
  el.textContent='';
  if(ids.length<4){el.appendChild(h('p',{class:'note'},'A rodada rápida aparece quando você tiver algumas frases aprendidas.'));el.appendChild(btn('Continuar',next));return;}
  el.appendChild(h('div',{class:'card'},h('p',{class:'eyebrow'},'Rapidez'),h('h2',null,'Rodada rápida'),
    h('p',null,'Você tem 75 segundos. Veja a frase em português, diga em inglês o mais rápido que puder e confira. Aqui vale velocidade com o que você já sabe.'),
    p.best?h('p',{class:'muted'},'Seu recorde: '+p.best+' frases.'):null));
  el.appendChild(btn('Começar',function(){
    var left=75,n=0,i=0,timer=h('p',{class:'timer'},'75 s'),body=h('div',{class:'ex'});
    el.textContent='';el.appendChild(timer);el.appendChild(body);
    function show(){var c=CARDS[ids[i%ids.length]];i++;body.textContent='';
      body.appendChild(h('p',{class:'prompt'},c.pt));
      body.appendChild(btn('Falei',function(){body.textContent='';body.appendChild(h('p',{class:'en'},c.en));
        body.appendChild(h('div',{class:'row'},btn('Não lembrei',show,'sec'),btn('Acertei',function(){n++;show();})));},'huge'));}
    function end(){clearInterval(liveTimer);liveTimer=null;addSpeak(30);dayRec()[2]+=n;var rec=n>p.best;if(rec)p.best=n;save();
      el.textContent='';el.appendChild(h('div',{class:'card'},h('h2',null,n+' frases em 75 segundos'),h('p',{class:'muted'},rec?'Novo recorde!':'Seu recorde é '+p.best+'.')));el.appendChild(btn('Continuar',next));}
    liveTimer=setInterval(function(){left--;timer.textContent=left+' s';if(left<=0)end();},1000);show();
  }));
}
function matchOpt(text,opts){var t=' '+norm(text)+' ',best=null,bs=0;
  opts.forEach(function(o){var s=matchWords(o.en,text).score;o.kw.forEach(function(k){if(k&&t.indexOf(' '+norm(k)+' ')>=0)s+=2;});if(s>bs){bs=s;best=o;}});
  return bs>=0.6?best:null;}
function conversation(el,sc,next){
  var p=P(),chat=h('div',{class:'chat'}),area=h('div',{class:'stack'});
  el.textContent='';el.appendChild(h('p',{class:'eyebrow'},'Conversa'));el.appendChild(h('h2',null,sc.title));el.appendChild(h('p',{class:'muted'},sc.intro));
  el.appendChild(chat);el.appendChild(area);
  function node(id){
    area.textContent='';
    if(id==='end'||!sc.nodes[id]){p.conv[sc.id]=(p.conv[sc.id]||0)+1;save();
      area.appendChild(h('div',{class:'fb good'},h('strong',null,'Conversa concluída!'),h('p',null,'Você foi até o fim em inglês. Faça de novo escolhendo outras respostas.')));
      area.appendChild(btn('Continuar',next));return;}
    var nd=sc.nodes[id],a=sp(nd[0]),pt=h('p',{class:'l-pt hid'},a[1]);
    chat.appendChild(h('div',{class:'bubble'},h('p',{class:'l-en'},a[0]),pt,
      h('div',{class:'audio'},h('button',{class:'abtn',type:'button',onclick:function(){say(a[0],{voice:1});}},'▶ Ouvir'),
        h('button',{class:'abtn slow',type:'button',onclick:function(){pt.classList.toggle('hid');}},'Tradução'))));
    say(a[0],{voice:1});
    var opts=nd[1].map(function(s){var x=sp(s);return{en:x[0],pt:x[1],kw:x[2].split(','),next:x[3]};});
    var msg=h('p',{class:'small muted'}),list=h('div',{class:'stack'});
    function choose(o){stopAudio();chat.appendChild(h('div',{class:'bubble me'},h('p',{class:'l-en'},o.en)));dayRec()[2]++;node(o.next);try{area.scrollIntoView({block:'end',behavior:'smooth'});}catch(e){}}
    var sr=micMode()==='sr';
    area.appendChild(h('p',{class:'ins'},sr?'Responda em voz alta. Se preferir, toque em uma resposta.':'Responda em voz alta e depois toque na frase que você disse.'));
    area.appendChild(speakBox(null,{onResult:function(sc2,text){if(!text)return;var m=matchOpt(text,opts);if(m)setTimeout(function(){choose(m);},700);else msg.textContent='Não reconheci uma das respostas. Tente de novo ou toque em uma delas.';}}));
    area.appendChild(msg);
    function drawList(){list.textContent='';
      if(!p.hide)opts.forEach(function(o){list.appendChild(h('button',{class:'opt',type:'button',onclick:function(){choose(o);}},h('span',{class:'l-en'},o.en),h('br'),h('span',{class:'pt small'},o.pt)));});
      list.appendChild(link(p.hide?'Mostrar respostas possíveis':'Esconder as respostas (mais difícil)',function(){p.hide=!p.hide;save();drawList();}));}
    drawList();area.appendChild(list);
  }
  node(sc.start);
}
function rhythmQuiz(el,r,next){
  runList(el,shuffle(r.quiz),function(q,cb){return quizQ({say:q[0],q:q[1],opts:q.slice(2)},cb);},function(){P().rhy[r.id]=1;save();next();},{title:r.title});
}

/* ---------- montar lições e a sessão do dia ---------- */
function lessonSteps(L){
  return [L.track==='grammar'?sExplain(L):sDialog(L),sPractice(L),sSpeak(L),sProduce(L.q)];
}
function completeLesson(L){
  var p=P(),t=today(),first=!p.done[L.id];
  p.done[L.id]=t;learnCards(L.cards);
  if(first&&L.dialog.length>=4)p.bt.push([L.id,t+3]);
  var pos=p.pos[L.track],wk=LESS[L.track][pos.w];
  while(wk&&pos.d<wk.length&&p.done[wk[pos.d].id])pos.d++;
  dayRec()[3]++;save();
}
function plan(){
  var p=P(),tr=p.track,pos=p.pos[tr],wk=LESS[tr][pos.w];
  if(!wk||!wk.length)return{kind:'none',w:pos.w};
  if(pos.d<wk.length)return{kind:'lesson',lesson:wk[pos.d],w:pos.w,d:pos.d};
  if(pos.d===wk.length)return{kind:'fluency',w:pos.w,d:pos.d,wk:wk};
  return{kind:'talk',w:pos.w,d:pos.d,wk:wk};
}
function btDue(){var p=P(),t=today();for(var i=0;i<p.bt.length;i++)if(p.bt[i][1]<=t&&BYID[p.bt[i][0]])return p.bt[i];return null;}
function sessionSteps(pl){
  var p=P(),st=[],due=dueCards().slice(0,12),bt=btDue();
  if(due.length||bt)st.push({label:'Revisão',run:function(el,next){
    var after=function(){if(!bt)return next();backTrans(el,BYID[bt[0]],function(){p.bt.splice(p.bt.indexOf(bt),1);save();next();});};
    if(due.length)reviewRun(el,due,after);else after();}});
  if(pl.kind==='lesson')return st.concat(lessonSteps(pl.lesson));
  var sc=C.scenarios[(pl.w-1)%C.scenarios.length],rh=C.rhythm[(pl.w-1)%C.rhythm.length];
  if(pl.kind==='fluency'){
    var a=pick(pl.wk),b=pick(pl.wk.filter(function(x){return x!==a;}))||a;
    st.push(sDialog(a,{again:true,label:'Escuta'}));
    st.push({label:'Tradução de volta',run:function(el,next){backTrans(el,b,next);}});
    st.push({label:'Fala e ouvido',run:function(el,next){pairDrill(el,pickSound(),8,function(){shadow(el,a.dialog.slice(0,4),next);});}});
    st.push({label:'Rapidez',run:speedRound});
    return st;
  }
  if(pl.kind==='talk'){
    var qs=[];pl.wk.forEach(function(L){if(L.q.length)qs.push(pick(L.q));});
    st.push({label:'Ritmo e melodia',run:function(el,next){
      el.appendChild(h('div',{class:'card'},h('p',{class:'eyebrow'},'Ritmo e melodia'),h('h2',null,rh.title),h('p',null,rh.text)));
      rh.items.forEach(function(it){el.appendChild(h('div',{class:'line',onclick:function(){say(it[0]);}},h('p',{class:'l-en'},it[0]),h('p',{class:'l-pt'},it[1])));});
      el.appendChild(btn('Treinar',function(){rhythmQuiz(el,rh,next);}));}});
    st.push({label:'Conversa',run:function(el,next){conversation(el,sc,next);}});
    st.push(sProduce(shuffle(qs).slice(0,4)));
    st.push({label:'Rapidez',run:speedRound});
    return st;
  }
  /* sem conteúdo novo: manutenção */
  st.push({label:'Conversa',run:function(el,next){conversation(el,pick(C.scenarios),next);}});
  st.push({label:'Fala e ouvido',run:function(el,next){pairDrill(el,pickSound(),10,next);}});
  st.push({label:'Rapidez',run:speedRound});
  return st;
}
function startSession(){
  var pl=plan(),p=P();
  flow(sessionSteps(pl),function(){
    var lines=['O que você estudou hoje se fixa enquanto você dorme. Volte amanhã para a próxima sessão.'],title='Sessão de hoje concluída';
    if(pl.kind==='lesson'){completeLesson(pl.lesson);if(pl.lesson.can)lines.unshift('Agora você consegue '+pl.lesson.can+'.');}
    else if(pl.kind==='fluency'){p.pos[p.track].d++;dayRec()[3]++;}
    else if(pl.kind==='talk'){p.pos[p.track].w++;p.pos[p.track].d=0;dayRec()[3]++;title='Semana '+pl.w+' concluída';lines.unshift('Você já consegue '+C.plan[pl.w-1][2]+'.');}
    else dayRec()[3]++;
    p.last=today();save();showDone(title,lines,'Ver meu progresso',function(){go('progresso');});
  },function(){go('hoje');});
}
function openLesson(L,backTab){
  flow(lessonSteps(L),function(){completeLesson(L);
    showDone('Lição concluída',[L.can?'Agora você consegue '+L.can+'.':'As frases desta lição entraram na sua revisão.','Elas voltam amanhã, depois em 3 dias, depois em 7, e assim por diante.'],'Voltar',function(){go(backTab);});},
    function(){go(backTab);});
}

/* ---------- moldura: topo e abas ---------- */
var TABS=[['hoje','Hoje','<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z"/>'],
['natural','Natural','<path d="M4 5h16v11H10l-5 4v-4H4z"/>'],
['gramatica','Gramática','<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><path d="M13 16.5h7M16.5 13v7"/>'],
['falar','Falar','<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'],
['revisao','Revisão','<path d="M20 11a8 8 0 0 0-14.5-4M4 4v4h4M4 13a8 8 0 0 0 14.5 4M20 20v-4h-4"/>'],
['progresso','Progresso','<path d="M5 20V10M12 20V4M19 20v-7"/>']];
function chrome(){
  var p=P(),bare=!p||!p.placed||!p.track;
  document.body.classList.toggle('bare',bare);document.body.classList.remove('flow');
  $top.textContent='';
  var bar=h('div',{class:'topin'},h('span',{class:'brand'},'Inglês da Família'));
  if(p&&!bare){
    bar.appendChild(h('button',{class:'chip'+(p.slow?' on':''),type:'button','aria-pressed':p.slow?'true':'false',onclick:function(){p.slow=!p.slow;save();chrome();}},p.slow?'Voz lenta':'Voz normal'));
    bar.appendChild(h('button',{class:'chip',type:'button',onclick:function(){go('progresso','perfil');}},p.name));
  }
  $top.appendChild(bar);
  $nav.textContent='';
  var nin=h('div',{class:'navin'});
  TABS.forEach(function(t){nin.appendChild(h('button',{type:'button',class:tab===t[0]?'on':'','aria-current':tab===t[0]?'page':null,onclick:function(){go(t[0]);},
    html:'<svg viewBox="0 0 24 24" aria-hidden="true">'+t[2]+'</svg><span>'+t[1]+'</span>'}));});
  $nav.appendChild(nin);
}
function page(title,backFn,kids){
  if(backFn)$main.appendChild(link('← Voltar',backFn));
  $main.appendChild(h('h1',null,title));
  add($main,[].slice.call(arguments,2));
}
function render(){
  stopAudio();applyTheme();$main.textContent='';chrome();window.scrollTo(0,0);
  var p=P();
  if(!p)return vProfiles();
  if(!p.placed)return vWelcome();
  if(!p.track)return vTrack();
  VIEWS[tab]();
}

/* ---------- entrada: perfis, nivelamento, trilha ---------- */
function vProfiles(){
  var ids=Object.keys(DB.profiles);
  $main.appendChild(h('div',{class:'stack'},h('p',{class:'eyebrow'},'Bem-vindo'),h('h1',null,'Quem vai estudar agora?'),
    h('p',{class:'muted'},'Cada pessoa tem o seu progresso guardado neste aparelho. Não precisa de senha.')));
  ids.forEach(function(id){var q=DB.profiles[id];$main.appendChild(h('button',{class:'listbtn',type:'button',onclick:function(){DB.cur=id;save();tab='hoje';sub=null;render();}},
    h('span',{class:'grow'},h('b',null,q.name),h('br'),h('span',{class:'small muted'},q.track?'Semana '+q.pos[q.track].w+' · '+Object.keys(q.cards).length+' frases':'Ainda não começou')),h('span',{class:'tag next'},'Entrar')));});
  var inp=h('input',{class:'inp',id:'nome-novo',type:'text',placeholder:'Seu nome',maxlength:'20',autocomplete:'off','aria-label':'Seu nome'});
  function create(){var n=inp.value.trim();if(!n)return inp.focus();var q=newProfile(n);DB.profiles[q.id]=q;DB.cur=q.id;save();tab='hoje';render();}
  inp.addEventListener('keydown',function(e){if(e.key==='Enter')create();});
  $main.appendChild(h('div',{class:'card'},h('h2',null,ids.length?'Criar outro perfil':'Criar meu perfil'),inp,btn('Criar perfil',create)));
  $main.appendChild(h('details',null,h('summary',null,'Já estudei em outro aparelho'),importBox()));
  if(!storageOK)$main.appendChild(h('p',{class:'note'},'Este navegador não está guardando dados. O site funciona, mas o progresso some ao fechar. Use “Levar meu progresso” ao terminar.'));
}
function vWelcome(){
  var p=P();
  $main.appendChild(h('div',{class:'stack'},h('p',{class:'eyebrow'},'Olá, '+p.name),h('h1',null,'Vamos achar o seu ponto de partida'),
    h('p',null,'O teste leva de 5 a 8 minutos. Você ouve frases e escolhe respostas. Ele para sozinho quando ficar difícil, então não se preocupe em errar.')));
  $main.appendChild(btn('Fazer o teste',startPlacement,'huge'));
  $main.appendChild(btn('Nunca estudei inglês: começar do zero',function(){placeAt(0);},'sec'));
  $main.appendChild(link('Trocar de pessoa',function(){DB.cur=null;save();render();}));
}
function placeAt(passed){
  var p=P(),start=[1,3,5,9,13][passed],w=Math.max(WEEKS[0]||1,Math.min(start,MAXW));
  p.level=start;p.placed=true;p.pos={natural:{w:w,d:0},grammar:{w:w,d:0}};save();
  $main.textContent='';chrome();
  var lines=[start===1?'Você começa do começo, pelos sons e pelas primeiras frases. É o melhor lugar para construir uma base firme.':'Pelo teste, você já conhece o conteúdo das primeiras semanas.'];
  if(start>MAXW)lines.push('Seu nível indica a semana '+start+'. Por enquanto o site tem as semanas 1 a '+MAXW+', então você começa na semana '+w+'. Use bastante a aba Falar: a pronúncia e as conversas servem para qualquer nível.');
  $main.appendChild(h('div',{class:'card'},h('p',{class:'eyebrow'},'Resultado'),h('h1',null,'Você começa na semana '+w),lines.map(function(l){return h('p',null,l);})));
  $main.appendChild(btn('Continuar',render));
}
function startPlacement(){
  var items=C.placement,right={1:0,2:0,3:0,4:0};
  function passed(){var n=0;for(var t=1;t<=4;t++){if(right[t]>=3)n=t;else break;}return n;}
  flow([{label:'Teste de nível',run:function(el){
    var i=0;
    (function nx(){
      if(i>=items.length||(i>0&&items[i].t!==items[i-1].t&&right[items[i-1].t]<3)){document.body.classList.remove('flow');return placeAt(passed());}
      var it=items[i];i++;el.textContent='';
      el.appendChild(h('p',{class:'count'},'Pergunta '+i+' de até '+items.length));
      el.appendChild(quizQ({say:it.k==='l'?it.en:null,text:it.k==='l'&&TTS.ok?null:it.en,q:it.q,opts:it.o,dunno:true,quick:true},function(ok){right[it.t]+=ok;nx();}));
      window.scrollTo(0,0);
    })();
  }}],function(){},function(){render();});
}
function vTrack(){
  var p=P();
  $main.appendChild(h('div',{class:'stack'},h('p',{class:'eyebrow'},'Escolha'),h('h1',null,'Como você prefere aprender?'),
    h('p',{class:'muted'},'Você pode trocar quando quiser. As frases que você já aprendeu continuam com você.')));
  function card(tr,t,d,who){return h('div',{class:'card'},h('h2',null,t),h('p',null,d),h('p',{class:'muted small'},who),btn('Quero esta trilha',function(){p.track=tr;save();tab='hoje';render();}));}
  $main.appendChild(card('natural','Trilha Natural','Histórias curtas, diálogos do dia a dia e frases prontas. Sem nomes de gramática. É o caminho mais rápido para começar a se comunicar.','Boa para quem quer falar logo e não gosta de regras.'));
  $main.appendChild(card('grammar','Trilha Gramática','Cada lição explica uma regra em português, compara com o nosso idioma, mostra os erros comuns de brasileiros e depois faz você usar.','Boa para quem gosta de entender o porquê das coisas.'));
}

/* ---------- aba Hoje ---------- */
function vToday(){
  var p=P(),pl=plan(),s=stats(),doneToday=p.last===today();
  var what=pl.kind==='lesson'?pl.lesson.title:pl.kind==='fluency'?'Dia de escuta e rapidez':pl.kind==='talk'?'Dia de conversa':'Manutenção: revisão e conversa';
  $main.appendChild(h('div',{class:'stack'},h('p',{class:'eyebrow'},pl.kind==='none'?'Conteúdo disponível concluído':'Semana '+pl.w+' · dia '+(pl.d+1)+' de 7'),
    h('h1',null,doneToday?'Muito bem, '+p.name+'!':'Olá, '+p.name+'!')));
  if(doneToday){
    $main.appendChild(h('div',{class:'card soft'},h('h2',null,'A sessão de hoje está feita'),h('p',null,'Agora é com o seu sono: é dormindo que o cérebro fixa o que você estudou. Volte amanhã.')));
    $main.appendChild(btn('Quero estudar mais um pouco',startSession,'sec'));
  }else{
    $main.appendChild(btn('Começar a sessão de hoje',startSession,'huge'));
    $main.appendChild(h('div',{class:'card'},h('p',{class:'muted small'},'Hoje · de 20 a 30 minutos'),h('h2',null,what),
      h('ol',{class:'stages'},[['Revisão','lembrar o que está para ser esquecido'],['Entrada nova','ouvir e entender algo novo'],['Prática de lembrar','responder antes de ver a resposta'],['Fala e ouvido','treinar um som e repetir frases'],['Desafio final','falar sobre a sua vida']].map(function(x,i){
        return h('li',null,h('span',{class:'n'},i+1),h('span',null,h('b',null,x[0]),h('br'),h('span',{class:'muted small'},x[1])));}))));
  }
  if(pl.kind==='none')$main.appendChild(h('p',{class:'note'},'Você terminou as lições que o site tem até agora (semanas 1 a '+MAXW+'). A sessão diária continua com revisão, conversa e rapidez até as próximas semanas chegarem.'));
  $main.appendChild(h('div',{class:'stats'},
    h('div',{class:'stat'},h('b',null,s.streak),h('span',null,s.streak===1?'dia seguido':'dias seguidos')),
    h('div',{class:'stat'},h('b',null,s.due),h('span',null,'frases para revisar hoje'))));
  $main.appendChild(h('p',{class:'note'},'Vinte minutos todo dia ensinam mais do que duas horas no sábado. Se faltar um dia, nada se perde: é só continuar.'));
}

/* ---------- abas das trilhas ---------- */
function vTrackTab(tr){
  var p=P(),nat=tr==='natural',pos=p.pos[tr];
  page(nat?'Trilha Natural':'Trilha Gramática',null,
    h('p',{class:'muted'},nat?'Você aprende por histórias, diálogos e frases prontas, das mais usadas para as menos usadas. Nenhum nome de gramática.':'Cada regra é explicada em português, comparada com o nosso idioma e praticada até virar fala.'));
  if(p.track!==tr)$main.appendChild(h('div',{class:'card soft'},h('p',null,'Sua sessão diária usa a outra trilha. Você pode fazer lições daqui à vontade, ou trocar.'),
    btn('Usar esta trilha na sessão diária',function(){p.track=tr;save();render();},'sec')));
  C.plan.forEach(function(w,i){
    var n=i+1,ls=LESS[tr][n];
    if(!ls||!ls.length){ if(n===MAXW+1)$main.appendChild(h('p',{class:'note'},'As semanas '+n+' a 24 ainda serão acrescentadas. O plano completo está na aba Progresso.'));return;}
    $main.appendChild(h('h2',null,'Semana '+n+' · '+(nat?w[0]:w[1])));
    ls.forEach(function(L){var isNext=pos.w===n&&pos.d===L.idx;
      $main.appendChild(h('button',{class:'listbtn',type:'button',onclick:function(){openLesson(L,tab);}},
        h('span',{class:'grow'},h('b',null,L.title),nat&&h('br'),nat&&h('span',{class:'small muted'},L.sit)),
        p.done[L.id]?h('span',{class:'tag done'},'Feita'):isNext?h('span',{class:'tag next'},'Próxima'):null));});
  });
}

/* ---------- aba Falar ---------- */
function vSpeak(){
  var p=P();
  if(sub==='sons')return vSounds();
  if(sub&&sub.indexOf('som:')===0)return vSound(sub.slice(4));
  if(sub==='ritmo')return vRhythm();
  if(sub==='shadow')return vShadow();
  if(sub==='conv')return vConv();
  if(sub==='sobre')return vSurvive();
  page('Conversação e pronúncia',null,h('p',{class:'muted'},'Treine o ouvido, a boca e a coragem. Tudo aqui serve para qualquer nível.'));
  [['sons','Sons difíceis para brasileiros','Ouvir pares de palavras e escolher qual foi dita'],['ritmo','Ritmo e melodia','Sílaba forte, palavras fracas, perguntas e ligações'],
   ['shadow','Ouvir e repetir','Diálogos em velocidade lenta e normal'],['conv','Simulador de conversas','Restaurante, aeroporto, entrevista, bate-papo, telefone'],
   ['sobre','Frases de sobrevivência','Pedir para repetir, ganhar tempo, dizer que não entendeu']].forEach(function(x){
    $main.appendChild(h('button',{class:'listbtn',type:'button',onclick:function(){go('falar',x[0]);}},h('span',{class:'grow'},h('b',null,x[1]),h('br'),h('span',{class:'small muted'},x[2]))));});
  var m=micMode();
  $main.appendChild(h('p',{class:'note'},m==='sr'?'Neste aparelho o site tenta ouvir o que você diz e mostra as palavras que entendeu.':m==='rec'?'Neste aparelho você pode gravar a sua voz e comparar com o modelo.':'Neste aparelho o microfone não está disponível. Você fala em voz alta e avalia você mesmo.'));
}
function vSounds(){
  var p=P();
  page('Sons difíceis',function(){go('falar');},h('p',{class:'muted'},'Estes sons não existem em português, por isso o ouvido não os separa no começo. O treino usa muitas palavras, vozes e velocidades, com correção na hora.'));
  C.sounds.forEach(function(s){var r=p.pron[s.id];
    $main.appendChild(h('button',{class:'listbtn',type:'button',onclick:function(){go('falar','som:'+s.id);}},h('span',{class:'grow'},h('b',null,s.name)),
      r?h('span',{class:'tag'+(r[0]/r[1]>=0.85?' done':'')},Math.round(r[0]/r[1]*100)+'% de acerto'):h('span',{class:'tag'},'Novo')));});
}
function vSound(id){
  var s=C.sounds.filter(function(x){return x.id===id;})[0];if(!s)return go('falar','sons');
  page(s.name,function(){go('falar','sons');});
  $main.appendChild(h('div',{class:'card'},h('h3',null,'Como fazer'),h('p',null,s.how),h('p',{class:'muted'},s.approx),
    h('details',null,h('summary',null,'Símbolo fonético (opcional)'),h('p',null,s.ipa))));
  $main.appendChild(btn('Treinar o ouvido (12 palavras)',function(){
    flow([{label:s.name,run:function(el,next){pairDrill(el,s,12,next);}}],function(){go('falar','som:'+id);},function(){go('falar','som:'+id);});},'huge'));
  $main.appendChild(h('h3',null,'Ouça e repita'));
  if(s.type==='cat')Object.keys(s.cats).forEach(function(l){$main.appendChild(h('div',{class:'card'},h('b',null,l),h('div',{class:'audio'},s.cats[l].map(function(w){return h('button',{class:'abtn slow',type:'button',onclick:function(){say(w,{rate:0.8});}},w);}))));});
  else s.pairs.forEach(function(pr){$main.appendChild(h('div',{class:'pairrow'},pr.map(function(w){return h('button',{class:'abtn',type:'button',onclick:function(){say(w,{rate:0.8});}},'▶ '+w);})));});
}
function vRhythm(){
  page('Ritmo e melodia',function(){go('falar');});
  C.rhythm.forEach(function(r){
    var c=h('div',{class:'card'},h('h2',null,r.title),h('p',null,r.text));
    r.items.forEach(function(it){c.appendChild(h('div',{class:'line',onclick:function(){say(it[0]);}},h('p',{class:'l-en'},'▶ '+it[0]),h('p',{class:'l-pt'},it[1])));});
    c.appendChild(btn(P().rhy[r.id]?'Treinar de novo':'Treinar',function(){flow([{label:r.title,run:function(el,next){rhythmQuiz(el,r,next);}}],function(){go('falar','ritmo');},function(){go('falar','ritmo');});}));
    $main.appendChild(c);});
}
function vShadow(){
  var p=P(),any=false;
  page('Ouvir e repetir',function(){go('falar');},h('p',{class:'muted'},'Escolha um diálogo. Ouça cada frase devagar, repita junto, depois em velocidade normal. Com o microfone, compare a sua voz com o modelo.'));
  WEEKS.forEach(function(w){['natural','grammar'].forEach(function(tr){LESS[tr][w].forEach(function(L){
    if(!L.dialog.length||!(p.done[L.id]||w<=p.pos[tr].w))return;any=true;
    $main.appendChild(h('button',{class:'listbtn',type:'button',onclick:function(){
      flow([{label:'Ouvir e repetir',run:function(el,next){shadow(el,L.dialog,next);}}],function(){go('falar','shadow');},function(){go('falar','shadow');});}},
      h('span',{class:'grow'},h('b',null,L.title),h('br'),h('span',{class:'small muted'},'Semana '+w+' · '+L.dialog.length+' frases'))));});});});
  if(!any)$main.appendChild(h('p',{class:'note'},'Os diálogos aparecem aqui conforme você avança.'));
}
function vConv(){
  var p=P();
  page('Simulador de conversas',function(){go('falar');},h('p',{class:'muted'},'O site fala, você responde em voz alta. Cada conversa muda conforme a sua resposta. As respostas possíveis ficam à vista; esconda quando quiser mais desafio.'));
  C.scenarios.forEach(function(sc){$main.appendChild(h('button',{class:'listbtn',type:'button',onclick:function(){
    flow([{label:sc.title,run:function(el,next){conversation(el,sc,next);}}],function(){go('falar','conv');},function(){go('falar','conv');});}},
    h('span',{class:'grow'},h('b',null,sc.title),h('br'),h('span',{class:'small muted'},sc.intro)),p.conv[sc.id]?h('span',{class:'tag done'},p.conv[sc.id]+'×'):null));});
}
function vSurvive(){
  var p=P(),cards=C.survival.map(function(s,i){return CARDS['sv.'+i];}),has=cards.every(function(c){return p.cards[c.id];});
  page('Frases de sobrevivência',function(){go('falar');},h('p',{class:'muted'},'Com estas frases você nunca fica travado: pede para repetir, ganha tempo e mantém a conversa.'));
  $main.appendChild(has?h('p',{class:'note'},'Estas frases já estão na sua revisão.'):btn('Colocar estas frases na minha revisão',function(){learnCards(cards);save();render();}));
  $main.appendChild(btn('Treinar falando',function(){flow([{label:'Sobrevivência',run:function(el,next){shadow(el,cards,next);}}],function(){go('falar','sobre');},function(){go('falar','sobre');});},'sec'));
  cards.forEach(function(c){$main.appendChild(h('div',{class:'line',onclick:function(){say(c.en);}},h('p',{class:'l-en'},'▶ '+c.en),h('p',{class:'l-pt'},c.pt)));});
}

/* ---------- aba Revisão ---------- */
function vReview(){
  var p=P(),due=dueCards(),s=stats(),ids=Object.keys(p.cards).filter(function(id){return CARDS[id];});
  page('Revisão',null,h('p',{class:'muted'},'Cada frase volta pouco antes de você esquecer. Acertou, ela demora mais para voltar. Errou, volta logo. Sempre frases inteiras, nunca palavras soltas.'));
  if(due.length){
    $main.appendChild(btn('Revisar agora: '+Math.min(20,due.length)+' frases',function(){
      flow([{label:'Revisão',run:function(el,next){reviewRun(el,due.slice(0,20),next);}}],function(){showDone('Revisão feita',['As frases que você acertou voltam daqui a mais tempo.'],'Voltar',function(){go('revisao');});},function(){go('revisao');});},'huge'));
    if(due.length>20)$main.appendChild(h('p',{class:'muted small'},'Há '+due.length+' frases esperando. Vinte por vez é o bastante.'));
  }else $main.appendChild(h('div',{class:'card soft'},h('h2',null,'Nada para revisar agora'),h('p',null,ids.length?'Suas frases estão em dia. As próximas voltam amanhã ou depois.':'As frases entram aqui quando você termina uma lição.')));
  if(ids.length>=4){
    $main.appendChild(btn('Rodada rápida (75 segundos)',function(){flow([{label:'Rapidez',run:speedRound}],function(){go('revisao');},function(){go('revisao');});},'sec'));
    if(!due.length)$main.appendChild(btn('Praticar mesmo assim',function(){
      flow([{label:'Prática livre',run:function(el,next){reviewRun(el,shuffle(ids).slice(0,10),next,true);}}],function(){go('revisao');},function(){go('revisao');});},'sec'));
  }
  var c=[0,0,0];ids.forEach(function(id){var b=p.cards[id][0];c[b<=1?0:b<=3?1:2]++;});
  $main.appendChild(h('div',{class:'stats'},h('div',{class:'stat'},h('b',null,c[0]),h('span',null,'frases novas')),h('div',{class:'stat'},h('b',null,c[1]),h('span',null,'em aprendizado')),
    h('div',{class:'stat'},h('b',null,c[2]),h('span',null,'dominadas')),h('div',{class:'stat'},h('b',null,s.words),h('span',null,'palavras diferentes nessas frases'))));
  $main.appendChild(h('details',null,h('summary',null,'Como a revisão escolhe o exercício'),
    h('p',null,'Frase nova: você ouve e escolhe o significado, ou monta com palavras prontas. Frase em aprendizado: completa a lacuna, ou vê em português e diz em inglês. Frase quase dominada: ouve e escreve, ou diz sem nenhuma ajuda.'),
    h('p',null,'Os tipos vêm misturados de propósito, e o site sobe ou desce a dificuldade conforme os seus acertos.')));
}

/* ---------- aba Progresso ---------- */
function importBox(){
  var ta=h('textarea',{class:'inp',id:'codigo-importar',placeholder:'Cole aqui o código','aria-label':'Código de progresso'}),msg=h('p',{class:'small'});
  return h('div',{class:'stack'},h('p',{class:'small muted'},'No outro aparelho, abra Progresso, depois Perfil, e copie o código. Cole aqui.'),ta,
    btn('Trazer meu progresso',function(){
      try{var raw=ta.value.trim().replace(/^IF1:/,'');var q=JSON.parse(decodeURIComponent(escape(atob(raw))));
        if(!q||!q.id||!q.name||!q.cards)throw 0;
        var base=newProfile(q.name);for(var k in base)if(q[k]===undefined)q[k]=base[k];
        DB.profiles[q.id]=q;DB.cur=q.id;save();tab='hoje';sub=null;render();
      }catch(e){msg.textContent='Este código não funcionou. Confira se copiou tudo, do começo ao fim.';}},'sec'),msg);
}
function vProgress(){
  if(sub==='metodo')return vMethod();
  if(sub==='fora')return vOutside();
  if(sub==='perfil')return vProfile();
  var p=P(),s=stats(),tr=p.track,cur=p.pos[tr].w;
  page('Progresso e plano');
  $main.appendChild(h('div',{class:'stats'},
    h('div',{class:'stat'},h('b',null,s.streak),h('span',null,'dias seguidos')),h('div',{class:'stat'},h('b',null,s.days),h('span',null,'dias de estudo no total')),
    h('div',{class:'stat'},h('b',null,s.min),h('span',null,'minutos estudados')),h('div',{class:'stat'},h('b',null,s.speak),h('span',null,'minutos falando')),
    h('div',{class:'stat'},h('b',null,s.mastered),h('span',null,'frases dominadas')),h('div',{class:'stat'},h('b',null,s.cards),h('span',null,'frases em estudo'))));
  if(s.streak===0&&s.days>0)$main.appendChild(h('p',{class:'note'},'A sequência recomeça hoje. Nada do que você aprendeu foi perdido.'));
  var cans=[];WEEKS.forEach(function(w){LESS.natural[w].concat(LESS.grammar[w]).forEach(function(L){if(p.done[L.id])cans.push(L.can||('usar: '+L.title));});});
  $main.appendChild(h('div',{class:'card'},h('h2',null,'O que você já consegue fazer'),
    cans.length?h('ul',{class:'plain'},cans.map(function(c){return h('li',null,c.charAt(0).toUpperCase()+c.slice(1));})):h('p',{class:'muted'},'Depois da primeira lição, suas conquistas aparecem aqui.')));
  var hrs=s.hours,pc=function(x){return Math.min(100,x/400*100)+'%';};
  $main.appendChild(h('div',{class:'card'},h('h2',null,'Onde isso leva, sem promessa falsa'),
    h('div',{class:'scale'},h('i',{style:'width:'+pc(hrs)}),h('em',{style:'left:'+pc(90)},'90 h'),h('em',{style:'left:'+pc(190)},'A2'),h('em',{style:'left:'+pc(375)},'B1'),h('em',{class:'b',style:'left:'+pc(Math.max(12,hrs))},'você: '+(hrs<10?hrs.toFixed(1).replace('.',','):Math.round(hrs))+' h')),
    h('p',null,'A referência de Cambridge é de cerca de 180 a 200 horas de estudo guiado para o nível A2 (básico sólido) e de 350 a 400 horas para o B1 (intermediário), partindo do zero.'),
    h('p',null,'Com 30 minutos por dia durante 6 meses você soma perto de 90 horas. A meta realista é comunicação básica firme: se apresentar, pedir, perguntar, resolver o dia a dia.'),
    h('p',null,'Com 1 hora por dia e mais prática fora do site, dá para chegar a conversas simples do cotidiano com confiança. Fluência completa leva mais tempo, e o caminho é este mesmo.')));
  $main.appendChild(h('div',{class:'stack'},
    btn('Por que este método funciona',function(){go('progresso','metodo');},'sec'),btn('Prática grátis fora do site',function(){go('progresso','fora');},'sec'),btn('Perfil, trilha e aparelho',function(){go('progresso','perfil');},'sec')));
  $main.appendChild(h('h2',null,'Plano de 24 semanas'));
  C.phases.forEach(function(ph){
    $main.appendChild(h('p',{class:'eyebrow'},'Semanas '+ph[0]+' a '+ph[1]+' · '+ph[2]));
    for(var n=ph[0];n<=ph[1];n++){var w=C.plan[n-1];
      $main.appendChild(h('div',{class:'week'+(n===cur?' cur':'')+(n>MAXW?' off':'')},h('span',{class:'n'},n),
        h('span',null,h('b',null,w[0]),n===cur?h('span',{class:'tag next',style:'margin-left:8px;font-size:.75rem;padding:2px 8px;border-radius:99px;background:var(--accent);color:#fff'},'você está aqui'):null,h('br'),
          h('span',{class:'small muted'},'Gramática: '+w[1]),h('br'),h('span',{class:'small'},'Para '+w[2]+'.'),n>MAXW?h('span',{class:'small muted'},' Ainda não disponível.'):null)));}
  });
}
function vMethod(){
  page('Por que este método funciona',function(){go('progresso');},h('p',{class:'muted'},'Cada parte do site existe por causa de um resultado de pesquisa sobre memória e aprendizado de línguas.'));
  C.method.forEach(function(m,i){$main.appendChild(h('div',{class:'card'},h('h2',null,(i+1)+'. '+m[0]),h('p',null,m[2]),h('p',null,h('b',null,'No site: '),m[3]),h('p',{class:'small muted'},m[1])));});
  $main.appendChild(h('div',{class:'card soft'},h('h2',null,'O que o site não faz'),h('ul',{class:'plain'},
    h('li',null,'Não adapta o ensino a “estilos de aprendizagem” (visual, auditivo e outros). As revisões de pesquisa não encontraram benefício nisso (Pashler e colegas, 2008).'),
    h('li',null,'Não usa listas de palavras soltas. Toda palavra vem dentro de uma frase.'),
    h('li',null,'Não promete fluência em poucas semanas.'))));
  $main.appendChild(h('h2',null,'Técnicas de poliglotas'));
  $main.appendChild(h('p',{class:'note'},'As ideias abaixo vêm da experiência prática de pessoas que aprenderam muitas línguas, não de estudos controlados. Entraram no site porque combinam com os princípios acima.'));
  C.polyglots.forEach(function(g){$main.appendChild(h('div',{class:'card'},h('h3',null,g[1]),h('p',{class:'small muted'},g[0]),h('p',null,g[2])));});
}
function vOutside(){
  page('Prática grátis fora do site',function(){go('progresso');},h('p',{class:'muted'},'O site cuida do estudo guiado. O que mais acelera o resultado é somar horas de contato com o inglês em coisas de que você gosta.'));
  C.outside.forEach(function(o){$main.appendChild(h('div',{class:'card'},h('h2',null,o[0]),h('p',null,o[1])));});
}
function vProfile(){
  var p=P();
  page('Perfil, trilha e aparelho',function(){go('progresso');});
  $main.appendChild(h('div',{class:'card'},h('h2',null,p.name),h('p',{class:'muted'},'Trilha da sessão diária: '+(p.track==='natural'?'Natural':'Gramática')+' · semana '+p.pos[p.track].w),
    btn('Trocar para a trilha '+(p.track==='natural'?'Gramática':'Natural'),function(){p.track=p.track==='natural'?'grammar':'natural';save();render();},'sec'),
    btn('Trocar de pessoa',function(){DB.cur=null;save();render();},'sec'),
    btn('Refazer o teste de nível',function(){p.placed=false;save();render();},'quiet')));
  $main.appendChild(h('div',{class:'card'},h('h2',null,'Aparência'),h('div',{class:'row'},[['auto','Automática'],['light','Clara'],['dark','Escura']].map(function(t){
    return btn(t[1],function(){DB.theme=t[0];save();render();},DB.theme===t[0]?'':'sec');}))));
  var code='IF1:'+btoa(unescape(encodeURIComponent(JSON.stringify(p)))),msg=h('p',{class:'small'});
  var ta=h('textarea',{class:'inp',id:'codigo-exportar',readonly:true,'aria-label':'Seu código de progresso'},code);
  $main.appendChild(h('div',{class:'card'},h('h2',null,'Levar meu progresso para outro aparelho'),
    h('p',{class:'muted small'},'Copie este código e envie para você mesmo, por mensagem ou e-mail. No outro aparelho, abra o site e escolha “Já estudei em outro aparelho”. Guarde uma cópia de vez em quando, por segurança.'),ta,
    btn('Copiar o código',function(){ta.focus();ta.select();
      try{navigator.clipboard.writeText(code).then(function(){msg.textContent='Código copiado.';},function(){msg.textContent='Segure o dedo sobre o código e escolha Copiar.';});}
      catch(e){msg.textContent='Segure o dedo sobre o código e escolha Copiar.';}}),msg));
  $main.appendChild(h('details',null,h('summary',null,'Trazer progresso de outro aparelho'),importBox()));
  if(!storageOK)$main.appendChild(h('p',{class:'note'},'Este navegador não está guardando dados. Copie o código acima ao terminar cada sessão.'));
  var del=btn('Apagar este perfil',function(){
    if(del.dataset.sure){delete DB.profiles[p.id];DB.cur=null;save();render();}
    else{del.dataset.sure='1';del.textContent='Toque de novo para apagar tudo de '+p.name;}},'danger');
  $main.appendChild(del);
}

var VIEWS={hoje:vToday,natural:function(){vTrackTab('natural');},gramatica:function(){vTrackTab('grammar');},falar:vSpeak,revisao:vReview,progresso:vProgress};
window.__app={go:go,P:P,DB:function(){return DB;},save:save,render:render,today:today};
render();
})();
