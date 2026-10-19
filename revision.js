const TOPIC_LABELS={pitch:'Note identification',rhythm:'Note values and rhythm',symbols:'Music symbols',dynamics:'Dynamics',expression:'Expressive techniques',vocabulary:'Elements of music'};
const PDF_SOURCES=[
  'https://pressbooks.nebraska.edu/openmusictheory/chapter/clefs/',
  'https://pressbooks.nebraska.edu/openmusictheory/chapter/rhythmic-rest-values/',
  'https://pressbooks.nebraska.edu/openmusictheory/chapter/other-aspects-of-notation/',
  'https://curriculum.nsw.edu.au/learning-areas/creative-arts/music-7-10-2024/glossary',
  'https://www.allclassical.org/music-terminology-101-expressive-terms/'
];
let worksheetData=null,pdfObjectURL=null;
function selectedPracticeTopics(){return [...document.querySelectorAll('.practice-topic:checked')].map(e=>e.value)}
function validateSetup(){
  const activity=$('activity').value;
  let error='';
  if(activity!=='challenge'&&!selectedPracticeTopics().length)error='Choose at least one practice topic.';
  const count=Number($('worksheet-count').value);
  if(activity==='worksheet'&&(!$('worksheet-count').checkValidity()||!Number.isInteger(count)||count<1||count>20))error='Choose a whole number of questions from 1 to 20.';
  $('setup-error').textContent=error;return !error;
}
function syncActivity(){
  const activity=$('activity').value;
  $('single-topic-field').hidden=activity!=='challenge';
  $('practice-topics').hidden=activity==='challenge';
  $('challenge-duration-field').hidden=activity!=='challenge';
  $('revision-duration-field').hidden=activity!=='revision';
  $('worksheet-settings').hidden=activity!=='worksheet';
  $('pitch-settings').hidden=activity==='challenge'?!['mixed','pitch'].includes($('topic').value):!selectedPracticeTopics().includes('pitch');
  $('sb').textContent=activity==='worksheet'?'Create worksheet':activity==='revision'?'Start revision':'Start';
  $('activity-help').textContent=activity==='revision'?'Choose one or more topics. Revision has no question deadlines or time penalties. Check explanations, reveal answers, and finish whenever you like.':activity==='worksheet'?'Choose your topics and 1–20 multiple-choice questions, preview them, then download a printable A4 PDF.':'Reach 300 points to be sharp. Challenge high scores are kept separately for each round length.';
  $('bs').hidden=activity!=='challenge';
  $('setup-error').textContent='';
}
function questionExplanation(q){
  if(q.kind==='pitch')return `This is ${q.pitch}${q.pitch==='C4'?' (middle C)':''} in the ${q.clef} clef. ${q.pitch==='C4'?'Middle C is the only ledger-line note in this quiz.':'Read the staff lines and spaces in the repeating A–G sequence.'}`;
  const item=[...DYNAMICS,...TECHNIQUES,...VOCABULARY].find(e=>e.term===q.a||e.def===q.a);
  if(item)return item.term+': '+item.def;
  const choice=q.o.find(o=>o.v===q.a);
  const label=choice?.txt|| (choice?.sym?lab(choice.sym):String(q.a));
  if(q.kind==='rhythm')return `Correct answer: ${label}.${typeof q.a==='number'?' This represents '+fb(q.a)+' when a crotchet is counted as one beat.':''}`;
  const explanations={
    'Pause':'Also called a fermata: hold the note or rest longer than its written value.',
    'Treble clef':'The treble clef marks G4 on the second line from the bottom.',
    'Bass clef':'The bass clef marks F3 on the second line from the top.',
    'Brace':'A brace groups staves, such as the treble and bass staves of a piano part.',
    'Sharp':'A sharp raises a natural pitch by one semitone.',
    'Flat':'A flat lowers a natural pitch by one semitone.',
    'Natural':'A natural cancels an accidental and returns the pitch to its natural form.',
    'Tie':'A tie joins notes of the same pitch; add their durations without repeating the attack.',
    'Slur':'A slur groups notes to be performed smoothly and connected.',
    'Repeat sign':'A repeat sign tells the performer to repeat a passage.',
    'Staff':'A staff has five lines and four spaces for writing music.',
    'Bar line':'A bar line divides music into bars.'
  };
  return q.a+': '+(explanations[q.a]||'Use the study section to review this symbol.');
}
function resolveRevision(revealed){
  if(S.resolved)return;
  S.resolved=true;
  if(revealed){S.revealed++;S.wr++;say('Answer shown. Read the explanation, then try another.','var(--t2)')}
  [...$('an').children].forEach((b,i)=>{b.disabled=true;if(S.q.o[i].v===S.q.a)b.classList.add('correct-option')});
  $('revision-explanation').textContent=questionExplanation(S.q);
  $('reveal-answer').hidden=true;$('next-question').hidden=false;
}
function endRevision(){
  clearInterval(iv);stopMusic();clearTimeout(faceT);$('fc').classList.remove('show');
  $('g').hidden=true;$('e').hidden=false;document.body.classList.remove('is-playing');window.scrollTo(0,0);
  const total=S.co+S.wr;
  $('ef').src='faces/'+(S.co?'joy':'think')+'.jpg';$('eh').textContent='Revision complete';
  $('es').textContent=S.co;$('rm').textContent='Correct answers. Keep practising at your own pace.';$('eb').textContent='';
  $('ed').innerHTML=`<div>Correct<b>${S.co}</b></div><div>Answer attempts<b>${total}</b></div><div>Accuracy<b>${total?Math.round(S.co/total*100):0}%</b></div><div>Answers revealed<b>${S.revealed}</b></div>`;
}
function cleanQuestionVisual(q){
  const source=q.svg||(q.syms.length?draw(q.syms,q.gap):'');
  if(source.startsWith('<svg'))return {svg:source,text:''};
  const div=document.createElement('div');div.innerHTML=source;return {svg:'',text:div.textContent||''};
}
function createWorksheet(){
  if(!validateSetup())return;
  stopMusic();
  const previous=S,topics=selectedPracticeTopics(),questions=[],seen=new Set();
  try{
    S={...S,mode:'mc',co:0,revision:false};
    const order=sh(topics);
    for(let i=0;i<Number($('worksheet-count').value);i++){
      const topic=order[i%order.length];let q;
      for(let trial=0;trial<40;trial++){
        q=curriculumQuestion(topic);
        const key=JSON.stringify([topic,q.p,q.a,q.pitch,q.clef,q.syms,q.gap]);
        if(!seen.has(key)||trial===39){seen.add(key);break}
      }
      questions.push({...q,visual:cleanQuestionVisual(q),explanation:questionExplanation(q),
        options:q.o.map(o=>({...o,visual:o.sym?draw([o.sym]):''})),
        answerIndex:q.o.findIndex(o=>o.v===q.a)});
    }
  }finally{S=previous}
  worksheetData={questions,topics,stage:$('stage').value,level:S.lv,clef:$('clef').value,octaves:$('octaves').checked,answerKey:$('worksheet-key').checked};
  if(pdfObjectURL){URL.revokeObjectURL(pdfObjectURL);pdfObjectURL=null}
  $('pdf-ready').hidden=true;$('pdf-status').textContent='';
  $('m').hidden=$('g').hidden=$('e').hidden=true;$('worksheet-view').hidden=false;
  $('worksheet-meta').textContent=`${questions.length} question${questions.length===1?'':'s'} · Stage ${worksheetData.stage} · ${cap(worksheetData.level)} · ${topics.map(t=>TOPIC_LABELS[t]).join(', ')}${worksheetData.answerKey?' · Separate answer key included':''}`;
  $('worksheet-preview').replaceChildren();
  questions.forEach((q,i)=>{
    const card=document.createElement('article');card.className='worksheet-card';
    const title=document.createElement('h3');title.textContent=`${i+1}. ${q.p}`;card.append(title);
    const picture=document.createElement('div');picture.className='worksheet-visual';if(q.visual.svg)picture.innerHTML=q.visual.svg;else picture.textContent=q.visual.text;card.append(picture);
    const options=document.createElement('ol');options.type='A';options.className='worksheet-options';
    q.options.forEach(o=>{const li=document.createElement('li');if(o.visual)li.innerHTML=o.visual;else li.textContent=o.txt;options.append(li)});
    card.append(options);$('worksheet-preview').append(card);
  });
  window.scrollTo(0,0);
}
const scriptLoads={};
function loadPDFScript(src){
  if(scriptLoads[src])return scriptLoads[src];
  scriptLoads[src]=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=src;script.onload=resolve;script.onerror=()=>{delete scriptLoads[src];script.remove();reject(new Error('The PDF tools could not load. Check your connection and try again.'))};document.head.append(script)});
  return scriptLoads[src];
}
async function svgPNG(source){
  let svg=source.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ').replace(/currentColor/g,'#2a1d14').replace(/var\(--t2\)/g,'#64584c').replace(/var\(--mg\)/g,'#2a1d14');
  const root=new DOMParser().parseFromString(svg,'image/svg+xml').documentElement;
  const box=(root.getAttribute('viewBox')||'0 0 170 70').split(/\s+/).map(Number);
  const width=900,height=Math.max(100,Math.round(width*box[3]/box[2]));
  const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
  const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,width,height);
  const image=new Image();
  await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(new Error('A music symbol could not be drawn. Please try again.'));image.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)});
  ctx.drawImage(image,0,0,width,height);
  return {data:canvas.toDataURL('image/png'),ratio:box[2]/box[3]};
}
function pdfSourceNumber(q){return {pitch:1,rhythm:2,vocabulary:4,expression:5}[q.kind]||3}
async function downloadWorksheet(){
  if(!worksheetData)return;
  const data=worksheetData;
  const button=$('worksheet-download');button.disabled=true;$('pdf-status').textContent='Preparing your PDF…';
  try{
    await loadPDFScript('vendor/jspdf.umd.min.js');
    await loadPDFScript('vendor/pdf-fonts.js');
    const doc=new window.jspdf.jsPDF({unit:'pt',format:'a4',compress:true,putOnlyUsedFonts:true});
    doc.setProperties({title:'Sharp or Flat Music Revision Worksheet',author:'Perplexity Computer',subject:'Multiple-choice music practice'});
    doc.addFileToVFS('Lato-Regular.ttf',window.PDF_FONTS.regular);doc.addFont('Lato-Regular.ttf','Lato','normal');
    doc.addFileToVFS('Lato-Bold.ttf',window.PDF_FONTS.bold);doc.addFont('Lato-Bold.ttf','Lato','bold');
    const W=doc.internal.pageSize.getWidth(),H=doc.internal.pageSize.getHeight(),margin=36,content=W-72;
    const prepared=[];
    for(let i=0;i<data.questions.length;i++){
      $('pdf-status').textContent=`Drawing question ${i+1} of ${data.questions.length}…`;
      const q=data.questions[i];
      prepared.push({...q,image:q.visual.svg?await svgPNG(q.visual.svg):null,
        optionImages:await Promise.all(q.options.map(o=>o.visual?svgPNG(o.visual):null))});
    }
    const setFont=(bold=false,size=11)=>{doc.setFont('Lato',bold?'bold':'normal');doc.setFontSize(size);doc.setTextColor(35,30,25)};
    const wrap=(text,width,size=11,bold=false)=>{setFont(bold,size);return doc.splitTextToSize(String(text),width)};
    let y=0,pageSources=new Set(),pageNumber=0;
    function footer(){
      setFont(false,7);let fy=H-74;
      doc.setDrawColor(190);doc.line(margin,fy-10,W-margin,fy-10);
      [...pageSources].sort().forEach(n=>{const text=`[${n}] ${PDF_SOURCES[n-1]}`;doc.text(text,margin,fy);doc.link(margin,fy-7,doc.getTextWidth(text),10,{url:PDF_SOURCES[n-1]});fy+=11});
      doc.text('Sharp or Flat · Multiple choice · '+pageNumber,W-margin,H-20,{align:'right'});
    }
    function page(title,answer=false){
      if(pageNumber){footer();doc.addPage()}
      pageNumber++;pageSources=new Set();setFont(true,20);doc.text(title,margin,44);
      setFont(false,9);doc.text(`Stage ${data.stage}  |  ${cap(data.level)}  |  ${data.questions.length} question${data.questions.length===1?'':'s'}`,margin,62);
      if(!answer){doc.text('Name: ____________________________   Class: ______________   Date: ______________',margin,82);doc.text('Circle one answer for each question. Note values use crotchet (quarter-note) beats.',margin,100)}
      else doc.text('Answers and explanations. Keep these pages separate when practising.',margin,84);
      doc.setDrawColor(169,43,35);doc.line(margin,answer?96:112,W-margin,answer?96:112);y=answer?114:130;
    }
    function imageAt(image,x,top,maxWidth,maxHeight){
      const h=Math.min(maxHeight,maxWidth/image.ratio),w=h*image.ratio;
      doc.addImage(image.data,'PNG',x+(maxWidth-w)/2,top,w,h,undefined,'FAST');return h;
    }
    page('Sharp or Flat · Music worksheet');
    for(let i=0;i<prepared.length;i++){
      const q=prepared[i],source=pdfSourceNumber(q);
      const prompt=wrap(`${i+1}. ${q.p}`,content-15,11,true);
      const visualText=q.visual.text?wrap(q.visual.text,content-12,11):[];
      const col=(content-16)/2,rows=[];
      for(let j=0;j<q.options.length;j+=2){
        const pair=q.options.slice(j,j+2).map((o,k)=>({o,index:j+k,lines:q.optionImages[j+k]?[]:wrap(o.txt,col-31,10)}));
        rows.push({pair,height:Math.max(...pair.map(p=>q.optionImages[p.index]?38:p.lines.length*12+8))});
      }
      const visualHeight=q.image?58:visualText.length?visualText.length*13+8:0;
      const height=prompt.length*14+visualHeight+rows.reduce((a,r)=>a+r.height,0)+18;
      if(y+height>H-96)page('Sharp or Flat · Music worksheet');
      pageSources.add(source);
      setFont(true,11);doc.text(prompt,margin,y);setFont(false,6);doc.text(String(source),W-margin-8,y-4);
      y+=prompt.length*14;
      if(q.image){imageAt(q.image,margin,y,content,54);y+=58}
      else if(visualText.length){setFont(false,11);doc.text(visualText,margin+6,y+4);y+=visualHeight}
      for(const row of rows){
        for(let k=0;k<row.pair.length;k++){
          const p=row.pair[k],x=margin+k*(col+16);
          setFont(true,10);doc.text(String.fromCharCode(65+p.index)+'.',x,y+10);
          if(q.optionImages[p.index])imageAt(q.optionImages[p.index],x+25,y,col-30,32);
          else {setFont(false,10);doc.text(p.lines,x+25,y+10)}
        }
        y+=row.height;
      }
      doc.setDrawColor(220);doc.line(margin,y+4,W-margin,y+4);y+=18;
    }
    if(data.answerKey){
      page('Sharp or Flat · Answer key',true);
      for(let i=0;i<prepared.length;i++){
        const q=prepared[i],answer=q.options[q.answerIndex];
        const label=answer.txt||(answer.sym?lab(answer.sym):String(q.a));
        const lines=wrap(`${i+1}. ${String.fromCharCode(65+q.answerIndex)} · ${label}`,content,11,true);
        const explanation=wrap(q.explanation,content,10);
        if(y+lines.length*14+explanation.length*12+18>H-96)page('Sharp or Flat · Answer key',true);
        pageSources.add(pdfSourceNumber(q));
        setFont(true,11);doc.text(lines,margin,y);setFont(false,6);doc.text(String(pdfSourceNumber(q)),W-margin-8,y-4);y+=lines.length*14;
        setFont(false,10);doc.text(explanation,margin,y);y+=explanation.length*12+16;
      }
    }
    footer();
    if(data!==worksheetData||$('worksheet-view').hidden){$('pdf-status').textContent='Download cancelled because the worksheet changed.';return}
    const blob=doc.output('blob');
    if(pdfObjectURL)URL.revokeObjectURL(pdfObjectURL);
    pdfObjectURL=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=pdfObjectURL;a.download=`Sharp-or-Flat-${data.questions.length}-question${data.questions.length===1?'':'s'}.pdf`;document.body.append(a);a.click();a.remove();
    $('pdf-open').href=pdfObjectURL;$('pdf-ready').hidden=false;
    $('pdf-status').textContent='Your PDF is ready. If it did not download, use “Open or save the PDF”.';
  }catch(e){$('pdf-status').textContent=e.message||'The PDF could not be created. Please try again.'}
  finally{button.disabled=false}
}
function initRevision(){
  $('activity').onchange=()=>{syncActivity();info()};
  $('duration').onchange=info;
  document.querySelectorAll('.practice-topic').forEach(e=>e.onchange=syncActivity);
  $('topics-all').onclick=()=>{document.querySelectorAll('.practice-topic').forEach(e=>e.checked=true);syncActivity()};
  $('topics-none').onclick=()=>{document.querySelectorAll('.practice-topic').forEach(e=>e.checked=false);syncActivity()};
  $('reveal-answer').onclick=()=>resolveRevision(true);
  $('next-question').onclick=()=>{say('','');nq()};
  $('finish-revision').onclick=end;
  $('worksheet-back').onclick=menu;
  $('worksheet-download').onclick=downloadWorksheet;
  // Use drawn clefs and accidentals in both the quiz and PDFs; no music-font dependency.
  SY.treble.g=()=>STF(90)+'<g transform="translate(15 -2.6) scale(.68)">'+clefShape('treble')+'</g>';
  SY.bass.g=()=>STF(90)+'<g transform="translate(8 -25)">'+clefShape('bass')+'</g>';
  SY.sharp.g=()=>STF(90)+'<path d="M38 12V59M50 10V57" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M31 30L57 24M31 45L57 39" fill="none" stroke="currentColor" stroke-width="5"/>';
  SY.flat.g=()=>STF(90)+'<path d="M39 10V53C67 38 57 24 39 38" fill="none" stroke="currentColor" stroke-width="3"/>';
  SY.natural.g=()=>STF(90)+'<path d="M38 10V48L51 44V25L38 29M51 25V61" fill="none" stroke="currentColor" stroke-width="3"/>';
  syncActivity();
}
