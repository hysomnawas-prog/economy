(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
$$('.tabs [data-t]').forEach(b=>b.onclick=()=>{$$('.tabs button').forEach(x=>x.classList.toggle('on',x===b));$$('.tab').forEach(t=>t.classList.toggle('on',t.id===b.dataset.t))});
if(store.get('pf-dark',false))document.body.setAttribute('data-dark','');
$('#theme').onclick=()=>store.set('pf-dark',document.body.toggleAttribute('data-dark'));
const read=store.get('pf-read',[]),chaps=$$('.chap');
chaps.forEach((c,i)=>{const h=c.querySelector('h2'),li=document.createElement('li');li.innerHTML=`<a href="#${h.id}">${h.textContent.replace(/^\S+\s*/,'')}</a>`;$('#toc').appendChild(li)});
function paint(){chaps.forEach((c,i)=>{const r=read.includes(i);c.classList.toggle('read',r);c.querySelector('.done').textContent=r?'✅ Read — tap to undo':'✓ Mark chapter as read';$('#toc').children[i].classList.toggle('read',r)});$('#prog').textContent=`${read.length}/${chaps.length} chapters read`}
chaps.forEach((c,i)=>c.querySelector('.done').onclick=()=>{const k=read.indexOf(i);k<0?read.push(i):read.splice(k,1);store.set('pf-read',read);paint()});paint();
addEventListener('scroll',()=>{const h=document.documentElement;$('#barfill').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'});
const CARDS=[
[1,'Article 266(1)?','Consolidated Fund of India'],[1,'Article 266(2)?','Public Account of India'],[1,'Article 267(1)?','Contingency Fund of India (at the President’s disposal)'],
[1,'Which fund holds money in trust (PF, small savings)?','Public Account — withdrawals generally need no prior parliamentary approval'],[1,'Which fund needs prior Parliament authorisation (Appropriation Act)?','Consolidated Fund of India'],
[2,'Revenue Deficit =','Revenue Expenditure − Revenue Receipts'],[2,'Effective Revenue Deficit (ERD) =','Revenue Deficit − Grants for creation of capital assets (introduced Budget 2011–12)'],
[2,'Fiscal Deficit =','Total Expenditure − (Revenue Receipts + Non-debt Capital Receipts)'],[2,'Why does fiscal deficit exclude borrowing?','Borrowing finances the gap and creates a liability; counting it as income would hide the gap'],
[2,'Primary Deficit =','Fiscal Deficit − Interest Payments'],[2,'Monetised Deficit =','Net RBI credit to the Government — inflation risk'],[2,'Budget Deficit (basic formula) =','Total Expenditure − Total Receipts'],
[3,'Two types of public debt?','Internal (in ₹: T-bills, G-secs, WMA) and External (IMF, World Bank, ADB; forex exposure)'],[3,'Which Act and body manage public debt?','Public Debt Act, 1944 — RBI'],
[3,'Four effects of very high public debt?','Higher interest burden, crowding out, rating downgrades, reduced fiscal space'],[3,'Off-budget borrowing?','Loans via PSUs/SPVs (e.g. FCI, PFC bonds) outside the headline fiscal deficit — hurts transparency'],
[4,'Original FRBM Act 2003 targets?','Revenue deficit zero by 2008; fiscal deficit 3% of GDP by 2009'],[4,'Three documents under FRBM?','MTFPS, FPSS, MFS'],
[4,'FRBM Amendment 2012 targets?','FD 3% of GDP by 2017; RD below 2% and ERD zero by 2015; Medium-Term Expenditure Framework'],
[4,'N. K. Singh Committee (2017) debt anchor?','60% of GDP combined: 40% Centre + 20% States'],[4,'N. K. Singh: escape clause and council?','Deviation up to 0.5% of GDP (war, calamity); independent Fiscal Council; drop revenue-deficit target'],
[4,'Centre FD: RE 2024–25 and BE 2025–26?','4.8% and 4.4% of GDP (3% target deferred)'],
[5,'Seven fiscal consolidation approaches?','More revenue, rationalise spending, disinvest/monetise, control FD, manage debt, reform subsidies, better budgeting'],
[6,'Zero-Based Budgeting principle?','Start from zero — justify every rupee; no automatic carry-forward'],
[7,'Outlay vs Output vs Outcome?','Money allocated vs immediate deliverable vs result/impact'],[7,'PMGSY outcome-budget example?','₹10,000 cr outlay → 10,000 km roads → better connectivity']];
const names={1:'Ch1 Funds',2:'Ch2 Deficits',3:'Ch3 Debt',4:'Ch4 FRBM',5:'Ch5 Consolidation',6:'Ch6 ZBB',7:'Ch7 Outcome Budget'};
$('#deck').innerHTML='<option value="0">All chapters</option>'+Object.entries(names).map(([k,v])=>`<option value="${k}">${v}</option>`).join('');
let deck=[],ix=0,got=0;const card=$('#card');
function build(){const f=+$('#deck').value;deck=CARDS.filter(c=>!f||c[0]===f);ix=0;got=0;show()}
function show(){card.classList.remove('flip');if(ix>=deck.length){$('.front').textContent='🎉 Deck complete!';$('.back').textContent='';$('#cnt').textContent='';$('#score').textContent=`Mastered ${got}`;return}
$('.front').textContent=deck[ix][1];$('.back').textContent=deck[ix][2];$('#cnt').textContent=`${ix+1} / ${deck.length}`;$('#score').textContent=`Mastered: ${got}`}
const go=d=>{ix=Math.max(0,Math.min(deck.length,ix+d));show()};
card.onclick=$('#flip').onclick=()=>card.classList.toggle('flip');$('#next').onclick=()=>go(1);$('#prev').onclick=()=>go(-1);
$('#know').onclick=()=>{got++;go(1)};$('#again').onclick=()=>{if(ix<deck.length)deck.push(deck[ix]);go(1)};
$('#shuf').onclick=()=>{deck.sort(()=>Math.random()-.5);ix=0;show()};$('#deck').onchange=build;build();
addEventListener('keydown',e=>{if(!$('#cards').classList.contains('on'))return;if(e.key===' '){e.preventDefault();card.classList.toggle('flip')}if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(-1)});
const F=[['rexp','Revenue expenditure',80000],['rrec','Revenue receipts',60000],['grant','Grants for capital assets',5000],['texp','Total expenditure',110000],['ndcr','Non-debt capital receipts',10000],['int','Interest payments',15000],['rbi','Net RBI credit to govt',0]];
$('#inputs').innerHTML=F.map(f=>`<div><label>${f[1]}</label><input type="number" id="${f[0]}" value="${f[2]}"></div>`).join('');
function calc(){const v=k=>+$('#'+k).value||0,rd=v('rexp')-v('rrec'),fd=v('texp')-(v('rrec')+v('ndcr'));
const R=[['Revenue Deficit',rd,'#2563eb'],['Effective Revenue Deficit',rd-v('grant'),'#db2777'],['Fiscal Deficit',fd,'#d97706'],['Primary Deficit',fd-v('int'),'#059669'],['Monetised Deficit',v('rbi'),'#7c3aed']];
$('#results').innerHTML=R.map(r=>`<div class="res" style="background:${r[2]}">${r[0]}<b>₹${r[1].toLocaleString('en-IN')} cr</b></div>`).join('')}
$$('#inputs input').forEach(i=>i.oninput=calc);calc();
let sc=0,done=0;$('#quizhost').innerHTML=QUIZ.map((q,i)=>`<div class="q" data-i="${i}"><h3>${q.t}</h3>${q.s}${q.o.map(o=>`<button class="opt" data-k="${o[0]}"><b>${o[0]}.</b> ${o[1]}</button>`).join('')}<div class="expl"><b>Answer: ${q.a}</b>${q.e}</div></div>`).join('');
$$('.q').forEach(el=>{const q=QUIZ[el.dataset.i];el.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(el.dataset.d)return;el.dataset.d=1;done++;if(b.dataset.k===q.a)sc++;el.querySelectorAll('.opt').forEach(x=>x.classList.add(x.dataset.k===q.a?'ok':x===b?'no':'x'));el.querySelector('.expl').style.display='block';$('#qscore').textContent=`Score: ${sc}/${done} answered (${QUIZ.length} questions)`})});
$('#qscore').textContent=`${QUIZ.length} questions — pick an option to see the answer and explanation.`;
const nq=$('#quiz');if(nq)nq.innerHTML='<div class="callout tip"><strong>Practice</strong>These PYQs are interactive — open the 🎯 PYQ Quiz tab.</div>';
})();
