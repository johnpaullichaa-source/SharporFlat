# Sharp or Flat: learning content

The game is a supplementary notation and music-vocabulary practice resource, not an assessment of the full NSW syllabus. The entry point is `index.html`; the legacy `Sharp or Flat.html` redirects there. Additional questions and the study glossary are in `curriculum.js`; revision and worksheet tools are in `revision.js`; responsive additions are in `curriculum.css`.

## Practice topics

- Mixed quiz: selects across all six question families.
- Pitch: only notes on the five-line staff plus middle C (C4). The treble pool is E4–F5 plus C4; bass is G2–A3 plus C4 (10 pitches per clef). No other out-of-staff notes or ledger-line pitches are used. Students may practise either clef or both. Optional octave-number choices use scientific pitch notation. Accidentals are not part of this pitch bank.
- Rhythm: existing note/rest values, joined notes, sums and missing beats. Values are expressed in crotchet beats.
- Symbols: the existing identification bank.
- Dynamics: p, mp, mf, f, cresc. and decresc.; crescendo/decrescendo hairpins are included. Stage 5 also includes pp and ff.
- Expressive techniques: staccato, legato, tenuto, accent, marcato, fermata, pizzicato, arco, tremolo and vibrato.
- Vocabulary: original plain-language definitions across all six elements.

All topics use multiple-choice answers; the typed-answer option has been removed. Topic and learning focus are independent of difficulty/timer controls. The Stage 4/5 split is a suggested classroom progression, not a mandatory NESA allocation of terms. Stage 5 retains foundational content.

The study section includes a searchable reference chart of semibreve, minim, crotchet, quaver and semiquaver names (with American equivalents), their written note/rest symbols and durations in crotchet beats, plus dotted minims/crotchets and joined-note groups. ([Open Music Theory: Rhythmic and Rest Values](https://pressbooks.nebraska.edu/openmusictheory/chapter/rhythmic-rest-values/))

## Arcade round

The piano tiles have been replaced with a framed question screen, with answer choices directly underneath. The sticky header keeps the timer, score and Back button visible while scrolling; a second Back button is below the answer area. The sharp target is 300 points. Mozart plays continuously throughout the timed round and stops on either Back button or the results screen. Replay starts the track from the beginning.

Challenge rounds may last 1, 2 or 4 minutes. High scores are separate for each duration and difficulty; the original one-minute records are preserved. The 300-point sharp threshold remains the same for all three durations.

## Revision and worksheets

Revision allows any combination of the six practice topics, with either no timer or a 1-, 2- or 4-minute session timer. Revision removes per-question deadlines and time penalties at every difficulty. Correct answers and revealed answers stay on screen with an explanation until the student chooses Next question. Finish revision opens an attempt-based summary; revision never overwrites challenge high scores.

Worksheet mode uses the selected topics, Stage 4/5 learning focus, difficulty and clef settings to create 1–20 multiple-choice questions. Topic coverage is balanced; small topic banks can repeat concepts. The preview freezes the questions and choice order, so the downloaded PDF and its optional separate answer-key pages match it. Pitch questions retain the staff-plus-middle-C restriction.

PDFs are generated in the student's browser without a backend or student-data upload. The bundled jsPDF library and Lato fonts load only when a worksheet is downloaded. A4 output contains readable drawn notation, embedded fonts, blank student details and clickable source footnotes; answers are excluded unless the separate answer-key setting is checked. iPhone users can use the PDF viewer's Share menu to save or print. Third-party licences are included in `vendor/`.

## NSW alignment

The NSW Music 7–10 Syllabus (2024) is implemented from 2026 and organises learning through Performing, Listening and Composing. ([NESA overview](https://curriculum.nsw.edu.au/learning-areas/creative-arts/music-7-10-2024/overview))

The six elements are duration; pitch; texture; performing media and timbre; dynamics and expression; and structure. The game's glossary uses these current names rather than only the older labels “tone colour” or “dynamics and expressive techniques”. ([NESA overview](https://curriculum.nsw.edu.au/learning-areas/creative-arts/music-7-10-2024/overview))

The game supports terminology and notation knowledge used in MU4-PER-01, MU4-LIS-01 and MU4-COM-01, and in MU5-PER-02, MU5-LIS-02 and MU5-COM-02; successful quiz scores do not by themselves demonstrate those performance, listening or composition outcomes. ([NESA outcomes](https://curriculum.nsw.edu.au/learning-areas/creative-arts/music-7-10-2024/outcomes))

Students still need contextual repertoire study, actual performance, listening and composition tasks. The full course includes broader repertoire requirements that this quiz and its single reward track do not cover. ([NESA course overview](https://curriculum.nsw.edu.au/learning-areas/creative-arts/music-7-10-2024/overview/course))

## Content references

Element terminology and foundational definitions were checked against the [NESA glossary](https://curriculum.nsw.edu.au/learning-areas/creative-arts/music-7-10-2024/glossary). Pitch placement follows the staff, clef and ledger-line principles described in [Open Music Theory: Reading Clefs](https://pressbooks.nebraska.edu/openmusictheory/chapter/clefs/).

Dynamics and articulation explanations draw on [Open Music Theory: Other Aspects of Notation](https://pressbooks.nebraska.edu/openmusictheory/chapter/other-aspects-of-notation/) and [All Classical Radio: Expressive Terms](https://www.allclassical.org/music-terminology-101-expressive-terms/). The game's explanations are original classroom paraphrases, not an official NESA glossary reproduction.
