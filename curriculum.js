/* Original classroom explanations; syllabus terminology follows NESA Music 7–10 (2024). */
const MUSIC_SOURCES = {
  syllabus: 'https://curriculum.nsw.edu.au/learning-areas/creative-arts/music-7-10-2024/overview',
  outcomes: 'https://curriculum.nsw.edu.au/learning-areas/creative-arts/music-7-10-2024/outcomes',
  notation: 'https://pressbooks.nebraska.edu/openmusictheory/chapter/other-aspects-of-notation/',
  expression: 'https://www.allclassical.org/music-terminology-101-expressive-terms/'
};
const ELEMENTS = [
  ['Duration', 'How long sounds and silences last, and how they are organised in time.'],
  ['Pitch', 'How high or low a sound is.'],
  ['Texture', 'How layers of sound are combined.'],
  ['Performing media and timbre', 'The voices, instruments and other sound sources used, and their distinctive sound qualities.'],
  ['Dynamics and expression', 'How loud or soft music is, and the performance details that communicate character and style.'],
  ['Structure', 'How a piece is organised into sections and how those sections relate.']
];
const DYNAMICS = [
  {term:'Piano',mark:'p',def:'Soft',aliases:['p'],stage:4},
  {term:'Mezzo piano',mark:'mp',def:'Moderately soft',aliases:['mp','medium soft'],stage:4},
  {term:'Mezzo forte',mark:'mf',def:'Moderately loud',aliases:['mf','medium loud'],stage:4},
  {term:'Forte',mark:'f',def:'Loud',aliases:['f'],stage:4},
  {term:'Crescendo',mark:'cresc.',def:'Gradually getting louder',aliases:['cresc','getting louder','gradually louder'],stage:4},
  {term:'Decrescendo',mark:'decresc.',def:'Gradually getting softer',aliases:['decresc','dim','diminuendo','getting softer','gradually softer','gradually getting quieter'],stage:4},
  {term:'Pianissimo',mark:'pp',def:'Very soft',aliases:['pp'],stage:5},
  {term:'Fortissimo',mark:'ff',def:'Very loud',aliases:['ff'],stage:5}
];
const TECHNIQUES = [
  {term:'Staccato',mark:'stacc.',def:'Play notes short and detached, leaving space between them.',stage:4},
  {term:'Legato',mark:'legato',def:'Play or sing notes smoothly and connected.',stage:4},
  {term:'Tenuto',mark:'ten.',def:'Hold the note for its full written value; context may also suggest slight emphasis.',stage:4},
  {term:'Accent',mark:'>',def:'Give a note extra emphasis compared with surrounding notes.',stage:4},
  {term:'Marcato',mark:'^',def:'Play with a strong, marked accent.',stage:4},
  {term:'Fermata',mark:'fermata',def:'Hold a note or rest longer than its written value; the exact length depends on the performance.',aliases:['pause'],stage:4},
  {term:'Pizzicato',mark:'pizz.',def:'Pluck the strings of a bowed string instrument instead of bowing them.',stage:4},
  {term:'Arco',mark:'arco',def:'Use the bow on a bowed string instrument, often after pizzicato.',stage:4},
  {term:'Tremolo',mark:'trem.',def:'Rapidly repeat a note, or rapidly alternate between two notes.',stage:4},
  {term:'Vibrato',mark:'vib.',def:'Make small, regular changes in pitch to add expression to a sustained sound.',stage:4}
];
// [term, plain-language definition, element, suggested stage, accepted synonyms]
const VOCABULARY = [
  ['Duration',ELEMENTS[0][1],0,4],
  ['Beat','The regular underlying pulse in music.',0,4,['pulse']],
  ['Rhythm','The pattern of long and short sounds and silences.',0,4],
  ['Tempo','The speed of the beat.',0,4],
  ['Metre','The organisation of beats into regular groups, such as groups of two, three or four.',0,4,['meter']],
  ['Time signature','Numbers at the start of a staff that indicate how beats are grouped and the note value used to count them.',0,4],
  ['Rest','A written sign for a period of silence.',0,4],
  ['Bar','A section of music containing the number of beats set by the metre.',0,4,['measure']],
  ['Ostinato','A short musical pattern repeated persistently.',0,4],
  ['Syncopation','Emphasis on normally weak beats or between the main beats.',0,5],
  ['Adagio','A slow tempo indication.',0,4],
  ['Andante','A walking-pace tempo indication.',0,4],
  ['Allegro','A fast, lively tempo indication.',0,4],
  ['Accelerando','Gradually getting faster.',0,4,['accel']],
  ['Ritardando','Gradually getting slower.',0,4,['rit']],
  ['Pitch',ELEMENTS[1][1],1,4],
  ['Melody','A sequence of pitches heard as a musical line or tune.',1,4],
  ['Harmony','The combination of pitches sounding together and their relationships.',1,4],
  ['Interval','The distance between two pitches.',1,4],
  ['Octave','The interval between pitches with the same letter name, eight scale steps apart.',1,4],
  ['Scale','A sequence of pitches arranged in ascending or descending order.',1,4],
  ['Chord','Three or more different pitches sounding together.',1,4],
  ['Ledger line','A short extra staff line used for notes above or below the five-line staff.',1,4],
  ['Clef','A symbol that fixes the pitch names of the lines and spaces of a staff.',1,4],
  ['Tonality','The organisation of pitches around a tonal centre, such as a major or minor key.',1,5],
  ['Consonance','A combination of pitches heard as relatively stable or settled within its musical context.',1,5],
  ['Dissonance','A combination of pitches heard as relatively tense or unsettled within its musical context.',1,5],
  ['Texture',ELEMENTS[2][1],2,4],
  ['Monophonic','A single melodic line without a separate accompaniment.',2,4,['monophony']],
  ['Homophonic','A main melody supported by an accompaniment, or parts moving mainly together.',2,4,['homophony']],
  ['Polyphonic','Two or more independent melodic lines sounding together.',2,5,['polyphony']],
  ['Unison','Performers sounding the same pitches at the same time.',2,4],
  ['Imitation','A musical idea repeated in another voice or part after it first appears.',2,5],
  ['Performing media','The voices, instruments and other sound sources used to make music.',3,4],
  ['Timbre','The distinctive sound quality that helps us recognise a voice, instrument or other sound source.',3,4,['tone colour','tone color']],
  ['Ensemble','A group of musicians performing together.',3,4],
  ['Acoustic','Sound produced by physical vibration without depending on electronic sound generation.',3,4],
  ['Electronic','Sound created or processed using electronic technology.',3,4],
  ['Dynamics','How loud or soft music is.',4,4],
  ['Expression','The musical details used to communicate character, feeling and style in a performance.',4,4],
  ['Articulation','How notes begin, end, connect or separate.',4,4],
  ['Phrasing','Shaping groups of notes into meaningful musical ideas.',4,4],
  ['Rubato','Expressive flexibility in timing, with some notes lengthened and others shortened.',4,5],
  ['Structure',ELEMENTS[5][1],5,4,['form']],
  ['Phrase','A group of notes forming a meaningful musical idea, like a sentence in speech.',5,4],
  ['Binary form','A structure with two main sections, usually labelled AB.',5,4,['binary']],
  ['Ternary form','A structure with three main sections, usually labelled ABA.',5,4,['ternary']],
  ['Rondo','A structure in which a main section returns between contrasting sections, such as ABACA.',5,5,['rondo form']],
  ['Verse','A song section whose music usually returns with different lyrics.',5,4],
  ['Chorus','A recurring song section, usually with the same music and lyrics.',5,4],
  ['Theme and variations','A structure presenting a theme followed by altered versions of it.',5,5,['theme and variation']],
  ['Repetition','The return of a musical idea, pattern or section.',5,4],
  ['Contrast','A noticeable difference between musical ideas or sections.',5,4]
].map(([term,def,element,stage,aliases=[]])=>({term,def,element,stage,aliases}));

const wordKey = s => String(s).toLowerCase().replace(/[^a-z0-9]/g,'');
const activeStage = () => document.getElementById('stage').value;
const eligible = a => a.filter(e=>activeStage()!=='4'||e.stage===4);
const pitchNames = Array.from({length:21},(_,i)=>{
  const d=18+i; return 'CDEFGAB'[d%7]+Math.floor(d/7);
}); // G2 (diatonic index 18) through F5 (38), inclusive.

function clefShape(clef) {
  // SVG paths avoid missing musical glyphs on iPhone or offline devices.
  if(clef==='bass')return '<path d="M23 50C34 28 60 40 50 61C46 69 34 76 23 78C38 70 47 58 43 49C40 42 31 42 29 48C36 45 38 56 30 57C22 58 19 54 23 50Z" fill="currentColor"/><circle cx="58" cy="45" r="2.5" fill="currentColor"/><circle cx="58" cy="55" r="2.5" fill="currentColor"/>';
  return '<g transform="translate(0 7)"><path d="M43 98C30 102 27 88 36 86C43 84 47 96 39 97M40 95L32 27C29 8 48 5 45 22C42 35 20 46 21 63C22 85 59 83 54 61C50 45 28 49 30 64C31 71 38 73 42 69" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/></g>';
}
function pitchSVG(name,clef) {
  const d=Number(name.slice(1))*7+'CDEFGAB'.indexOf(name[0]);
  const bottom=clef==='treble'?30:18; // E4 / G2.
  const pos=d-bottom,y=80-pos*5;
  let lines='';
  for(let i=0;i<5;i++)lines+=`<line x1="15" x2="175" y1="${80-i*10}" y2="${80-i*10}" stroke="currentColor" stroke-width=".8"/>`;
  for(let p=-2;p>=pos;p-=2)lines+=`<line x1="109" x2="141" y1="${80-p*5}" y2="${80-p*5}" stroke="currentColor" stroke-width="1.3"/>`;
  for(let p=10;p<=pos;p+=2)lines+=`<line x1="109" x2="141" y1="${80-p*5}" y2="${80-p*5}" stroke="currentColor" stroke-width="1.3"/>`;
  const up=pos<4,sx=up?131:119;
  const min=Math.min(4,y-38),max=Math.max(112,y+38);
  return `<svg class="pitch-svg" viewBox="0 ${min} 190 ${max-min}" role="img" aria-label="Note on ${clef} clef with ledger lines where needed">${lines}${clefShape(clef)}<ellipse cx="125" cy="${y}" rx="7.5" ry="5.5" transform="rotate(-20 125 ${y})" fill="currentColor"/><line x1="${sx}" x2="${sx}" y1="${y}" y2="${up?y-32:y+32}" stroke="currentColor" stroke-width="1.8"/></svg>`;
}
function pitchQuestion() {
  const clef=document.getElementById('clef').value==='both'?R(['treble','bass']):document.getElementById('clef').value;
  const name=R(pitchNames),oct=document.getElementById('octaves').checked;
  const answer=oct?name:name[0],pool=oct?pitchNames:'CDEFGAB'.split('');
  return {kind:'pitch',syms:[],svg:pitchSVG(name,clef),p:`Name this note in the ${clef} clef.`,
    hint:oct?'Include the octave number, e.g. C4 (middle C).':'Enter a letter A–G. Octave numbers are optional.',
    a:answer,nm:oct?[wordKey(name)]:[name[0].toLowerCase(),wordKey(name)],
    pitch:name,clef,o:sh([answer,...sh(pool.filter(n=>n!==answer)).slice(0,optN()-1)]).map(v=>({v,txt:v}))};
}
function markSVG(item,kind) {
  let inner='';
  if(item.term==='Crescendo' || item.term==='Decrescendo'){
    if(Math.random()<.5)inner=`<path d="${item.term==='Crescendo'?'M140 14L30 35L140 56':'M30 14L140 35L30 56'}" fill="none" stroke="currentColor" stroke-width="3"/>`;
  }
  if(kind==='expression'){
    const head='<ellipse cx="85" cy="48" rx="8" ry="5.5" transform="rotate(-20 85 48)" fill="currentColor"/><path d="M92 48V22" stroke="currentColor" stroke-width="2"/>';
    const marks={
      Staccato:'<circle cx="85" cy="12" r="3" fill="currentColor"/>',
      Tenuto:'<path d="M77 12H94" stroke="currentColor" stroke-width="3"/>',
      Accent:'<path d="M77 5L96 12L77 19" fill="none" stroke="currentColor" stroke-width="2.5"/>',
      Marcato:'<path d="M77 18L85 4L93 18" fill="none" stroke="currentColor" stroke-width="2.5"/>',
      Fermata:'<path d="M69 17A16 14 0 0 1 101 17" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="85" cy="14" r="2.5" fill="currentColor"/>',
      Tremolo:'<path d="M85 28L100 20M85 34L100 26M85 40L100 32" stroke="currentColor" stroke-width="2.5"/>'
    };
    if(marks[item.term])inner=head+marks[item.term];
    if(item.term==='Legato')inner='<ellipse cx="55" cy="48" rx="8" ry="5.5" fill="currentColor"/><ellipse cx="120" cy="44" rx="8" ry="5.5" fill="currentColor"/><path d="M62 48V22M127 44V18M48 17Q85 -1 126 13" fill="none" stroke="currentColor" stroke-width="2"/>';
  }
  if(!inner)inner=`<text x="85" y="48" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-weight="bold" font-size="${item.mark.length>5?25:40}" fill="currentColor">${item.mark}</text>`;
  return `<svg viewBox="0 0 170 70" role="img" aria-label="${kind==='dynamics'?'Dynamic':'Expressive'} marking">${inner}</svg>`;
}
function termQuestion(kind) {
  const pool=eligible(kind==='dynamics'?DYNAMICS:kind==='expression'?TECHNIQUES:VOCABULARY);
  const item=R(pool),mc=S.mode==='mc',definitionStyle=mc&&Math.random()<.5;
  let q={kind,syms:[],a:item.term,nm:[item.term,...(item.aliases||[]),...(item.mark?[item.mark]:[])].map(wordKey)};
  if(kind==='vocabulary'){
    q.p='Which musical term matches this definition?';
    q.svg=`<div class="definition">${item.def}</div>`;
    q.hint=ELEMENTS[item.element][0];
  }else{
    q.p=definitionStyle?'What does this marking mean?':'Name this musical marking or technique.';
    q.svg=markSVG(item,kind);q.hint=S.mode==='type'?'Type the term or its abbreviation.':'';
  }
  if(definitionStyle && kind!=='vocabulary'){
    q.a=item.def;
    q.o=sh([item,...sh(pool.filter(x=>x!==item)).slice(0,optN()-1)]).map(x=>({v:x.def,txt:x.def}));
    q.longOptions=true;
  }else{
    q.o=sh([item,...sh(pool.filter(x=>x!==item)).slice(0,optN()-1)]).map(x=>({v:x.term,txt:x.term}));
  }
  return q;
}
function curriculumQuestion() {
  const topic=document.getElementById('topic').value;
  const chosen=topic==='mixed'?R(['pitch','rhythm','symbols','dynamics','expression','vocabulary']):topic;
  if(chosen==='pitch')return pitchQuestion();
  if(['dynamics','expression','vocabulary'].includes(chosen))return termQuestion(chosen);
  if(chosen==='symbols')return symQ(S.mode==='mc');
  if(Math.random()<.2)return beamQ(S.mode==='mc');
  return rhythmQuestion();
}
function renderGlossary() {
  const search=wordKey(document.getElementById('glossary-search').value);
  const container=document.getElementById('glossary-list');
  container.replaceChildren();
  let count=0;
  ELEMENTS.forEach(([name,def],index)=>{
    const entries=[...eligible(VOCABULARY).filter(x=>x.element===index),
      ...(index===4?[...eligible(DYNAMICS),...TECHNIQUES]:[])].filter(x=>!search||wordKey(x.term+' '+x.def+' '+(x.mark||'')).includes(search));
    if(!entries.length)return;
    count+=entries.length;
    const section=document.createElement('section'),h=document.createElement('h3'),p=document.createElement('p');
    h.textContent=name;p.textContent=def;section.append(h,p);
    entries.forEach(e=>{
      const dl=document.createElement('dl'),dt=document.createElement('dt'),dd=document.createElement('dd');
      dt.textContent=e.term+(e.mark?' · '+e.mark:'')+(e.stage===5?' · Extension':'');
      dd.textContent=e.def;dl.append(dt,dd);section.append(dl);
    });
    container.append(section);
  });
  document.getElementById('glossary-count').textContent=count?`${count} terms shown`:'No matching terms. Try another word.';
}
function initCurriculum() {
  document.querySelector('.bd').append(document.getElementById('fc'));
  document.getElementById('topic').onchange=()=>{
    document.getElementById('pitch-settings').hidden=!['mixed','pitch'].includes(document.getElementById('topic').value);info();
  };
  ['stage','clef','octaves'].forEach(id=>document.getElementById(id).onchange=()=>{renderGlossary();info()});
  document.getElementById('glossary-search').oninput=renderGlossary;
  document.getElementById('quit').onclick=()=>{
    clearInterval(iv);clearTimeout(songT);SONG.pause();clearTimeout(faceT);document.getElementById('fc').classList.remove('show');menu();
  };
  renderGlossary();
  window.render_game_to_text=()=>JSON.stringify({
    phase:!$('g').hidden?'playing':!$('e').hidden?'results':'menu',
    score:S.sc||0,topic:$('topic').value,prompt:S.q?.p,
    choices:S.q?.o?.map(x=>x.txt||x.v),clef:S.q?.clef,remaining:Math.max(0,(S.endT-Date.now())/1000)
  });
}
