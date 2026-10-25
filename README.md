# Public Finance — The Story of Government Money

Story-based UPSC notes (GS3 Economy) as a static, no-build website.

Features: colour-coded chapters, rendered formulas, read-progress tracker, 25 flashcards, live deficit calculator, interactive PYQ quiz, dark mode, print-friendly.

## Run
Open `index.html`, or run `python3 -m http.server` and visit http://localhost:8000.
Deploy free with GitHub Pages (Settings → Pages → branch `main`, root).

## Layout
- `index.html` — page and notes (generated from the original content)
- `css/style.css` — theme and chapter colours
- `js/app.js` — tabs, progress, flashcards, calculator, quiz
- `js/quiz-data.js` — PYQ data

Progress is stored in your browser (localStorage). Figures are historical snapshots from the source notes.
