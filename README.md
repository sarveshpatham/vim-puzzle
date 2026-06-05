# vim-puzzle

A small browser game for practicing Vim motions under a stroke budget.

The player starts on a highlighted character and tries to reach the goal character in the fewest keystrokes. Scores are saved per level in `localStorage`.

## Run

Open `index.html` in a browser, or serve the folder with `python -m http.server`. No build step is required.

## Current gameplay

- Level list with saved best score per level
- In-level stroke counter
- Per-level high score persistence
- Restart and level navigation
- Live command definition box that explains the last command or pending command
- Hover and keyboard-focus definitions for the motion set
- Bracket-match level that asks the player to move to `(` and use `%` to reach `)`
- 10 find-target levels built around `f`, `F`, `t`, `T`, and counts
- Reorder Buffer mode with `dd`, `p`, and `P`
- Macro Run mode with `qa`, `q`, `@a`, `@@`, `r`, and `x`
- Supported motions and commands: `h`, `j`, `k`, `l`, `w`, `W`, `b`, `B`, `e`, `E`, `ge`, `gE`, `0`, `^`, `$`, `%`, `gg`, `G`, `H`, `M`, `L`, `{`, `}`, `f`, `F`, `t`, `T`, `;`, `,`, `/`, `?`, `n`, `N`, `m`, backtick mark jump, apostrophe mark jump, `g_`, `gj`, `gk`, `zz`, `zt`, `zb`, `dd`, `p`, `P`, `r`, `x`, `qa`, `q`, `@a`, and `@@`
- Numeric counts before supported motions, including `3j`, `4w`, `2fa`, `3G`, `3gg`, and `2/pattern`

## Scoring

Scores are out of 100, and the saved high score is the highest score for each level.

The score formula is `100 - (keystrokes * time multiplier)`, clamped from 0 to 100. The timer starts when a level starts and stops when the level is solved.

- Less than 1 second: `0x` key penalty
- 1 to 3 seconds: `1x` key penalty
- More than 3 to 8 seconds: `1.5x` key penalty
- More than 8 to 15 seconds: `2x` key penalty
- More than 15 seconds: score is `0`

Example: 8 keystrokes in 2 seconds is `100 - (8 * 1) = 92`.

## Cheat sheet alignment

The current game is a Normal-mode cursor puzzle, so it intentionally matches the cursor movement, search, and mark-position parts of the referenced cheat sheets.

Definitions were checked against `C:\Users\sarpat02\Downloads\Vim Cheat Sheet.pdf` after text extraction with `pypdf`.

Implemented as direct matches:

- Character and line movement: `h`, `j`, `k`, `l`, `0`, `^`, `$`, `gg`, `G`, count jumps like `5G` and `5gg`
- Word movement: `w`, `W`, `b`, `B`, `e`, `E`, `ge`, `gE`
- Character find movement: `fx`, `tx`, `Fx`, `Tx`, `;`, `,`
- Buffer/screen-style movement: `H`, `M`, `L`, `gj`, `gk`, `zz`, `zt`, `zb`
- Paragraph and pair movement: `{`, `}`, `%`
- Marks: `ma`, backtick jump to mark, and apostrophe jump to mark
- Search movement: `/pattern`, `?pattern`, `n`, `N`
- Line and edit commands for puzzle modes: `dd`, `p`, `P`, `r`, `x`, `qa`, `q`, `@a`, `@@`

Implemented with app-specific limits:

- `gj` and `gk` behave like `j` and `k` because the puzzle board does not wrap long visual lines.
- `H`, `M`, and `L` jump to the top, middle, and bottom of the puzzle buffer, not the browser viewport.
- `zz`, `zt`, and `zb` are recognized as view commands but do not change puzzle position.
- `%` supports matching `()`, `{}`, `[]`, and `<>`.
- Search is literal text search with wrapping, not Vim regex.

Not part of this movement puzzle yet:

- Insert mode: `i`, `I`, `a`, `A`, `o`, `O`, `ea`, and insert-mode Ctrl commands
- Editing, cut, paste, visual, indent, macro, register, global, file, quickfix, and exiting commands outside the subset used by the Reorder Buffer and Macro Run modes
- Screen-scroll, declaration, and editor integrations such as `Ctrl+e`, `Ctrl+y`, `Ctrl+b`, `Ctrl+f`, `Ctrl+d`, `Ctrl+u`, `gd`, `gD`, `:vim`, `:cnext`, and jump/change-list navigation

## Proposed puzzle modes

These are included in the app as proposals only:

- Visual Range: select a specific span or exact number of lines with visual motions.
- Rename Symbol: change every occurrence of a variable, function, or character name.
- Text Object Edit: delete, change, or replace quoted text, brackets, tags, or arguments.
- Search Chase: use `/`, `?`, `n`, and `N` to reach repeated target text efficiently.
