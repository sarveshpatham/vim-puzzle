const STORAGE_KEY = "vim-puzzle:scores:v2";

const levelDefinitions = [
  {
    id: "paragraph-focus",
    title: "Paragraph Focus",
    brief: "Reach the target in a two-line paragraph.",
    category: "Start to goal",
    text: [
      "Morning builds start slow, then [S]steady hands turn small edits into reliable habits.",
      "Find the word that keeps [G]focus near the end of the paragraph.",
    ],
  },
  {
    id: "route-lookup",
    title: "Route Lookup",
    brief: "Move through JavaScript and land on the return branch.",
    category: "Start to goal",
    text: [
      "[S]const profileName = user.profile.name || \"guest\";",
      "const nextRoute = routes.find((route) => route.name === profileName);",
      "return nextRoute ? [G]nextRoute.path : \"/home\";",
    ],
  },
  {
    id: "matching-bracket",
    title: "Matching Bracket",
    brief: "Move to the opening parenthesis, then use % to jump to its match.",
    category: "Bracket match",
    text: [
      "return format[S]Name(user.profile.first, user.profile.last[G]);",
    ],
  },
  {
    id: "find-pipe",
    title: "Find Pipe",
    brief: "Use a find command to land on the pipe.",
    category: "Find target",
    text: [
      "build[S]Start -> lint -> test -> bundle [G]| deploy",
    ],
  },
  {
    id: "find-colon",
    title: "Find Colon",
    brief: "Reach the next colon in one find motion.",
    category: "Find target",
    text: [
      "route[S]Name = server.api.v1.users[G]:show",
    ],
  },
  {
    id: "find-closing-brace",
    title: "Find Brace",
    brief: "Find the closing brace on the current line.",
    category: "Find target",
    text: [
      "const user = [S]{ id: 42, active: true [G]}",
    ],
  },
  {
    id: "find-back-comma",
    title: "Back To Comma",
    brief: "Use a backward find to reach the comma.",
    category: "Find target",
    text: [
      "alpha, beta[G], gamma, delta[S]Tail",
    ],
  },
  {
    id: "find-second-slash",
    title: "Second Slash",
    brief: "Use a count with find to reach the second slash.",
    category: "Find target",
    text: [
      "src[S]Path / users [G]/ index",
    ],
  },
  {
    id: "find-before-equals",
    title: "Before Equals",
    brief: "Stop just before the equals sign.",
    category: "Find target",
    text: [
      "const result[S]Value[G] = computeTotal(items)",
    ],
  },
  {
    id: "find-after-previous-dot",
    title: "After Dot",
    brief: "Use T to land just after the previous dot.",
    category: "Find target",
    text: [
      "client.fetch.user.[G]profile[S]Cursor",
    ],
  },
  {
    id: "find-quote",
    title: "Find Quote",
    brief: "Jump to the next quote character.",
    category: "Find target",
    text: [
      "message[S]Text = renderAlert([G]\"warning\")",
    ],
  },
  {
    id: "find-hash",
    title: "Find Hash",
    brief: "Use a forward find to hit the hash mark.",
    category: "Find target",
    text: [
      "release[S]Tag version 1.8.0 [G]# stable",
    ],
  },
  {
    id: "find-third-dash",
    title: "Third Dash",
    brief: "Use a count with find to reach the third dash.",
    category: "Find target",
    text: [
      "logs[S]Trail - auth - billing [G]- cache",
    ],
  },
  {
    id: "reorder-release-buffer",
    title: "Reorder Buffer",
    brief: "Move the web deploy line to the top with line deletes and puts.",
    category: "Reorder buffer",
    mode: "reorder",
    text: [
      "[S]deploy database",
      "deploy api",
      "deploy web",
      "notify users",
    ],
    targetText: [
      "deploy web",
      "deploy database",
      "deploy api",
      "notify users",
    ],
    goalLabel: "Goal order: web, database, api, notify",
  },
  {
    id: "macro-bang-run",
    title: "Macro Run",
    brief: "Record a macro that changes each question mark into an exclamation point.",
    category: "Macro run",
    mode: "macro",
    text: [
      "[S]status alpha?",
      "status beta?",
      "status gamma?",
    ],
    targetText: [
      "status alpha!",
      "status beta!",
      "status gamma!",
    ],
    goalLabel: "Goal: change every ? to !",
  },
  {
    id: "css-goal",
    title: "CSS Goal",
    brief: "Navigate across selectors and declarations.",
    category: "Start to goal",
    text: [
      ".toolbar button[data-active=\"true\"] {",
      "  border-color: var(--accent);",
      "  [S]box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent), transparent 72%);",
      "}",
      ".board-cell[data-goal=\"true\"] {",
      "  outline: 2px solid [G]currentColor;",
      "}",
    ],
  },
  {
    id: "python-title",
    title: "Python Title",
    brief: "Cross indentation and reach a method call.",
    category: "Start to goal",
    text: [
      "def normalize_user(user):",
      "    [S]name = user.get(\"name\", \"guest\").strip()",
      "    if not name:",
      "        return \"guest\"",
      "    return name.[G]title()",
    ],
  },
  {
    id: "markdown-link",
    title: "Markdown Link",
    brief: "Thread through prose and link syntax.",
    category: "Start to goal",
    text: [
      "The release notes should start with [S]scope, risk, and the migration path.",
      "Update [the changelog](docs/releases/[G]latest.md) before tagging.",
    ],
  },
];

const commandDefinitions = {
  h: "move cursor left",
  j: "move cursor down",
  k: "move cursor up",
  l: "move cursor right",
  gj: "move cursor down (multi-line text)",
  gk: "move cursor up (multi-line text)",
  H: "move to top of screen",
  M: "move to middle of screen",
  L: "move to bottom of screen",
  w: "jump forwards to the start of a word",
  W: "jump forwards to the start of a word (words can contain punctuation)",
  b: "jump backwards to the start of a word",
  B: "jump backwards to the start of a word (words can contain punctuation)",
  e: "jump forwards to the end of a word",
  E: "jump forwards to the end of a word (words can contain punctuation)",
  ge: "jump backwards to the end of a word",
  gE: "jump backwards to the end of a word (words can contain punctuation)",
  "%": "move cursor to the matching character",
  "0": "jump to the start of the line",
  "^": "jump to the first non-blank character of the line",
  "$": "jump to the end of the line",
  g_: "jump to the last non-blank character of the line",
  gg: "go to the first line of the document",
  G: "go to the last line of the document",
  f: "jump to next occurrence of character x",
  t: "jump to before next occurrence of character x",
  F: "jump to the previous occurrence of character x",
  T: "jump to after previous occurrence of character x",
  ";": "repeat previous f, t, F or T movement",
  ",": "repeat previous f, t, F or T movement, backwards",
  "}": "jump to next paragraph (or function/block, when editing code)",
  "{": "jump to previous paragraph (or function/block, when editing code)",
  zz: "center cursor on screen",
  zt: "position cursor on top of the screen",
  zb: "position cursor on bottom of the screen",
  "/": "search for pattern",
  "?": "search backward for pattern",
  n: "repeat search in same direction",
  N: "repeat search in opposite direction",
  i: "insert before the cursor",
  I: "insert at the beginning of the line",
  a: "insert (append) after the cursor",
  A: "insert (append) at the end of the line",
  o: "append (open) a new line below the current line",
  O: "append (open) a new line above the current line",
  m: "set current position for mark A",
  "`": "jump to position of mark A",
  "'": "jump to the first non-blank character on the line of mark x",
  dd: "delete (cut) a line",
  p: "put (paste) the clipboard after cursor",
  P: "put (paste) before cursor",
  r: "replace a single character",
  x: "delete (cut) character",
  u: "undo",
  qa: "record macro a",
  q: "stop recording macro",
  "@a": "run macro a",
  "@@": "rerun last run macro",
  Esc: "exit insert mode or clear pending command",
};

const proposedModes = [
  {
    title: "Visual Range",
    brief: "Select a specific span or exact number of lines with visual motions.",
  },
  {
    title: "Rename Symbol",
    brief: "Change every occurrence of a variable, function, or character name.",
  },
  {
    title: "Text Object Edit",
    brief: "Delete, change, or replace quoted text, brackets, tags, or arguments.",
  },
  {
    title: "Search Chase",
    brief: "Use /, ?, n, and N to reach repeated target text efficiently.",
  },
];

const dom = {
  homeButton: document.querySelector("#home-button"),
  homeView: document.querySelector("#home-view"),
  gameView: document.querySelector("#game-view"),
  levelGrid: document.querySelector("#level-grid"),
  proposalGrid: document.querySelector("#proposal-grid"),
  clearScoresButton: document.querySelector("#clear-scores-button"),
  backButton: document.querySelector("#back-button"),
  restartButton: document.querySelector("#restart-button"),
  levelTitle: document.querySelector("#level-title"),
  levelBrief: document.querySelector("#level-brief"),
  screenSubtitle: document.querySelector("#screen-subtitle"),
  timerCount: document.querySelector("#timer-count"),
  strokeCount: document.querySelector("#stroke-count"),
  scoreCount: document.querySelector("#score-count"),
  bestScore: document.querySelector("#best-score"),
  goalLabel: document.querySelector("#goal-label"),
  lastCommand: document.querySelector("#last-command"),
  textBoard: document.querySelector("#text-board"),
  statusLine: document.querySelector("#status-line"),
  commandBuffer: document.querySelector("#command-buffer"),
  commandDefinition: document.querySelector("#command-definition"),
  motionTooltip: document.querySelector("#motion-tooltip"),
  completeModal: document.querySelector("#complete-modal"),
  completeCopy: document.querySelector("#complete-copy"),
  nextLevelButton: document.querySelector("#next-level-button"),
  modalRestartButton: document.querySelector("#modal-restart-button"),
  modalHomeButton: document.querySelector("#modal-home-button"),
};

const levels = levelDefinitions.map(parseLevel);
let scores = loadScores();
let currentLevelIndex = 0;
let currentLevel = null;
let activeLines = [];
let cursor = { line: 0, col: 0 };
let editorMode = "normal";
let strokes = 0;
let command = emptyCommand();
let completed = false;
let lastFind = null;
let lastSearch = null;
let marks = {};
let lineRegister = [];
let macros = {};
let macroRecording = "";
let lastMacroRegister = "";
let replayingMacro = false;
let activeTooltipNode = null;
let levelStartTime = 0;
let elapsedMs = 0;
let timerId = 0;
let undoStack = [];

renderHome();
hydrateMotionTooltips();
showHome();

dom.homeButton.addEventListener("click", showHome);
dom.backButton.addEventListener("click", showHome);
dom.restartButton.addEventListener("click", restartLevel);
dom.modalRestartButton.addEventListener("click", () => {
  hideCompleteModal();
  restartLevel();
});
dom.modalHomeButton.addEventListener("click", () => {
  hideCompleteModal();
  showHome();
});
dom.nextLevelButton.addEventListener("click", () => {
  hideCompleteModal();
  startLevel((currentLevelIndex + 1) % levels.length);
});
dom.clearScoresButton.addEventListener("click", () => {
  scores = {};
  saveScores();
  renderHome();
  updateScoreStrip();
});
dom.textBoard.addEventListener("click", () => dom.textBoard.focus());
document.addEventListener("keydown", handleKeydown);

function parseLevel(definition) {
  const parsed = parseAnnotatedLines(definition.text);

  return {
    ...definition,
    lines: parsed.lines,
    targetLines: definition.targetText ? parseAnnotatedLines(definition.targetText).lines : null,
    start: parsed.start || { line: 0, col: 0 },
    goal: parsed.goal || {
      line: parsed.lines.length - 1,
      col: Math.max(0, parsed.lines[parsed.lines.length - 1].length - 1),
    },
  };
}

function parseAnnotatedLines(textLines) {
  let start = null;
  let goal = null;

  const lines = textLines.map((rawLine, lineIndex) => {
    let clean = "";

    for (let index = 0; index < rawLine.length; index += 1) {
      if (rawLine.startsWith("[S]", index)) {
        start = { line: lineIndex, col: clean.length };
        index += 2;
        continue;
      }

      if (rawLine.startsWith("[G]", index)) {
        goal = { line: lineIndex, col: clean.length };
        index += 2;
        continue;
      }

      clean += rawLine[index];
    }

    return clean;
  });

  return { lines, start, goal };
}

function renderHome() {
  dom.levelGrid.replaceChildren();
  levels.forEach((level, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "level-card";
    card.dataset.levelId = level.id;
    card.addEventListener("click", () => startLevel(index));

    const meta = document.createElement("span");
    meta.className = "level-meta";
    meta.textContent = level.category;

    const title = document.createElement("h3");
    title.textContent = level.title;

    const brief = document.createElement("p");
    brief.textContent = level.brief;

    const score = document.createElement("div");
    score.className = "card-score";

    const label = document.createElement("span");
    label.textContent = "Best";

    const best = document.createElement("strong");
    best.textContent = formatScore(scores[level.id]);

    score.append(label, best);
    card.append(meta, title, brief, score);
    dom.levelGrid.append(card);
  });

  dom.proposalGrid.replaceChildren();
  proposedModes.forEach((mode) => {
    const card = document.createElement("article");
    card.className = "proposal-card";

    const status = document.createElement("span");
    status.className = "proposal-status";
    status.textContent = "For approval";

    const title = document.createElement("h3");
    title.textContent = mode.title;

    const brief = document.createElement("p");
    brief.textContent = mode.brief;

    card.append(status, title, brief);
    dom.proposalGrid.append(card);
  });
}

function hydrateMotionTooltips() {
  dom.textBoard.closest(".game-view").querySelectorAll(".motion-list kbd").forEach((keyNode) => {
    const key = keyNode.textContent;
    const definition = commandDefinitions[key] || describeCommand(key);

    keyNode.dataset.definition = definition;
    keyNode.tabIndex = 0;
    keyNode.setAttribute("aria-label", `${key}: ${definition}`);
    keyNode.addEventListener("pointerover", () => showMotionTooltip(keyNode));
    keyNode.addEventListener("pointermove", () => positionMotionTooltip(keyNode));
    keyNode.addEventListener("pointerout", hideMotionTooltip);
    keyNode.addEventListener("mouseenter", () => showMotionTooltip(keyNode));
    keyNode.addEventListener("mousemove", () => positionMotionTooltip(keyNode));
    keyNode.addEventListener("mouseleave", hideMotionTooltip);
    keyNode.addEventListener("focus", () => showMotionTooltip(keyNode));
    keyNode.addEventListener("focusin", () => showMotionTooltip(keyNode));
    keyNode.addEventListener("blur", hideMotionTooltip);
    keyNode.addEventListener("focusout", hideMotionTooltip);
  });

  window.addEventListener("resize", repositionActiveTooltip);
  window.addEventListener("scroll", repositionActiveTooltip, true);
}

function showMotionTooltip(keyNode) {
  activeTooltipNode = keyNode;
  dom.motionTooltip.textContent = keyNode.dataset.definition;
  dom.motionTooltip.hidden = false;
  keyNode.setAttribute("aria-describedby", "motion-tooltip");
  requestAnimationFrame(() => {
    positionMotionTooltip(keyNode);
    dom.motionTooltip.classList.add("is-visible");
  });
}

function hideMotionTooltip() {
  if (activeTooltipNode) {
    activeTooltipNode.removeAttribute("aria-describedby");
  }

  activeTooltipNode = null;
  dom.motionTooltip.classList.remove("is-visible");
  dom.motionTooltip.hidden = true;
}

function repositionActiveTooltip() {
  if (activeTooltipNode && !dom.motionTooltip.hidden) {
    positionMotionTooltip(activeTooltipNode);
  }
}

function positionMotionTooltip(keyNode) {
  if (!keyNode || dom.motionTooltip.hidden) return;

  const margin = 12;
  const gap = 10;
  const keyRect = keyNode.getBoundingClientRect();
  const tooltipRect = dom.motionTooltip.getBoundingClientRect();
  const maxLeft = Math.max(margin, window.innerWidth - tooltipRect.width - margin);
  let left = keyRect.left + keyRect.width / 2 - tooltipRect.width / 2;
  let top = keyRect.top - tooltipRect.height - gap;

  left = clamp(left, margin, maxLeft);

  if (top < margin) {
    top = keyRect.bottom + gap;
  }

  if (top + tooltipRect.height > window.innerHeight - margin) {
    top = Math.max(margin, window.innerHeight - tooltipRect.height - margin);
  }

  dom.motionTooltip.style.left = `${left}px`;
  dom.motionTooltip.style.top = `${top}px`;
}

function showHome() {
  resetTimer();
  dom.homeView.hidden = false;
  dom.gameView.hidden = true;
  hideCompleteModal();
  currentLevel = null;
  activeLines = [];
  dom.screenSubtitle.textContent = "Motion puzzles for terse edits.";
  dom.timerCount.textContent = "0.0s";
  dom.strokeCount.textContent = "0";
  dom.scoreCount.textContent = "--";
  dom.bestScore.textContent = "--";
  dom.commandBuffer.textContent = "--";
  dom.commandDefinition.textContent = "Press a supported motion.";
}

function startLevel(index) {
  currentLevelIndex = index;
  currentLevel = levels[index];
  activeLines = currentLevel.lines.slice();
  cursor = { ...currentLevel.start };
  editorMode = "normal";
  strokes = 0;
  completed = false;
  command = emptyCommand();
  lastFind = null;
  lastSearch = null;
  marks = {};
  lineRegister = [];
  macros = {};
  macroRecording = "";
  lastMacroRegister = "";
  replayingMacro = false;
  undoStack = [];
  dom.homeView.hidden = true;
  dom.gameView.hidden = false;
  dom.levelTitle.textContent = currentLevel.title;
  dom.levelBrief.textContent = currentLevel.brief;
  dom.screenSubtitle.textContent = currentLevel.category;
  dom.statusLine.textContent = "Ready";
  dom.lastCommand.textContent = "--";
  dom.goalLabel.textContent = formatGoal(currentLevel);
  resetTimer();
  updateCommandBuffer();
  updateScoreStrip();
  renderBoard();
  requestAnimationFrame(() => dom.textBoard.focus());
}

function restartLevel() {
  if (currentLevel) {
    startLevel(currentLevelIndex);
  }
}

function renderBoard() {
  if (!currentLevel) return;

  const fragment = document.createDocumentFragment();
  activeLines.forEach((line, lineIndex) => {
    const row = document.createElement("div");
    row.className = "board-line";

    const lineNumber = document.createElement("span");
    lineNumber.className = "line-number";
    lineNumber.textContent = String(lineIndex + 1);

    const code = document.createElement("code");
    code.className = "line-code";

    const chars = [...line];
    const renderedChars = chars.length ? chars : [" "];
    renderedChars.forEach((char, colIndex) => {
      const charNode = document.createElement("span");
      charNode.className = "board-char";
      charNode.textContent = char === " " ? String.fromCharCode(160) : char;

      if (samePosition(currentLevel.start, { line: lineIndex, col: colIndex })) {
        charNode.classList.add("is-start");
      }

      if (!currentLevel.targetLines && samePosition(currentLevel.goal, { line: lineIndex, col: colIndex })) {
        charNode.classList.add("is-goal");
      }

      if (samePosition(cursor, { line: lineIndex, col: colIndex })) {
        charNode.classList.add("is-cursor");
      }

      code.append(charNode);
    });

    if (editorMode === "insert" && line.length > 0 && cursor.line === lineIndex && cursor.col === line.length) {
      const cursorNode = document.createElement("span");
      cursorNode.className = "board-char is-cursor is-insert-end";
      cursorNode.textContent = String.fromCharCode(160);
      code.append(cursorNode);
    }

    row.append(lineNumber, code);
    fragment.append(row);
  });

  dom.textBoard.replaceChildren(fragment);
}

function handleKeydown(event) {
  if (dom.gameView.hidden || !dom.completeModal.hidden || completed) return;
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === "Tab") return;

  const key = event.key.length === 1 ? event.key : event.key;
  if (!isPlayableKey(key)) return;

  event.preventDefault();
  ensureTimerStarted();
  strokes += 1;
  const recordMacroKey = shouldRecordMacroKey(key);
  processKey(key);
  if (recordMacroKey) {
    macros[macroRecording].push(key);
  }
  updateScoreStrip();
  updateCommandBuffer();
  renderBoard();

  if (isLevelComplete()) {
    completeLevel();
  }
}

function isPlayableKey(key) {
  if (key === "Escape" || key === "Backspace" || key === "Enter") return true;
  return key.length === 1;
}

function shouldRecordMacroKey(key) {
  return Boolean(macroRecording && !replayingMacro && !(key === "q" && !hasPendingCommand()));
}

function hasPendingCommand() {
  return Boolean(
    command.count ||
      command.prefix ||
      command.findMode ||
      command.markMode ||
      command.searchMode ||
      command.replaceMode
  );
}

function processKey(rawKey) {
  if (editorMode === "insert") {
    processInsertKey(rawKey);
    return;
  }

  if (command.searchMode) {
    processSearchInput(rawKey);
    return;
  }

  if (rawKey === "Escape" || rawKey === "Backspace") {
    command = emptyCommand();
    dom.statusLine.textContent = "Cleared";
    dom.lastCommand.textContent = rawKey === "Escape" ? "Esc" : "Backspace";
    return;
  }

  if (macroRecording && rawKey === "q" && !hasPendingCommand()) {
    dom.statusLine.textContent = `Stopped recording ${macroRecording}`;
    dom.lastCommand.textContent = "q";
    lastMacroRegister = macroRecording;
    macroRecording = "";
    return;
  }

  if (command.replaceMode) {
    replaceCharacter(rawKey);
    dom.lastCommand.textContent = `r${rawKey}`;
    command = emptyCommand();
    return;
  }

  if (command.markMode) {
    processMarkCommand(rawKey);
    command = emptyCommand();
    return;
  }

  if (command.findMode) {
    if (executeFind(command.findMode, rawKey, getCount(1))) {
      lastFind = { mode: command.findMode, char: rawKey };
    }
    dom.lastCommand.textContent = `${command.count}${command.findMode}${rawKey}` || rawKey;
    command = emptyCommand();
    return;
  }

  if (command.prefix === "g") {
    processGCommand(rawKey);
    command = emptyCommand();
    return;
  }

  if (command.prefix === "z") {
    processZCommand(rawKey);
    command = emptyCommand();
    return;
  }

  if (command.prefix === "d") {
    processDCommand(rawKey);
    command = emptyCommand();
    return;
  }

  if (command.prefix === "q") {
    processQCommand(rawKey);
    command = emptyCommand();
    return;
  }

  if (command.prefix === "@") {
    processAtCommand(rawKey);
    command = emptyCommand();
    return;
  }

  if (isDigit(rawKey)) {
    if (rawKey === "0" && command.count === "") {
      moveToLineStart();
      dom.lastCommand.textContent = "0";
      command = emptyCommand();
      return;
    }

    command.count += rawKey;
    dom.statusLine.textContent = `Count ${command.count}`;
    return;
  }

  const key = rawKey;
  const count = getCount(1);

  if (key === "g" || key === "z" || key === "d" || key === "q" || key === "@") {
    command.prefix = key;
    dom.statusLine.textContent = `Pending ${key}`;
    return;
  }

  if (key === "f" || key === "F" || key === "t" || key === "T") {
    command.findMode = key;
    dom.statusLine.textContent = `Pending ${key}`;
    return;
  }

  if (key === "m") {
    command.markMode = "set";
    dom.statusLine.textContent = "Pending mark";
    return;
  }

  if (key === "`" || key === "'") {
    command.markMode = key === "`" ? "jumpExact" : "jumpLine";
    dom.statusLine.textContent = "Pending mark";
    return;
  }

  if (key === "/" || key === "?") {
    command.searchMode = key;
    command.searchInput = "";
    dom.statusLine.textContent = `Pending ${key}`;
    return;
  }

  if (key === "h") {
    moveHorizontal(-count);
  } else if (key === "l") {
    moveHorizontal(count);
  } else if (key === "j") {
    moveVertical(count);
  } else if (key === "k") {
    moveVertical(-count);
  } else if (key === "w") {
    repeat(count, () => moveWordForward(isWordChar));
  } else if (key === "W") {
    repeat(count, () => moveWordForward(isBigWordChar));
  } else if (key === "b") {
    repeat(count, () => moveWordBackward(isWordChar));
  } else if (key === "B") {
    repeat(count, () => moveWordBackward(isBigWordChar));
  } else if (key === "e") {
    repeat(count, () => moveWordEnd(isWordChar));
  } else if (key === "E") {
    repeat(count, () => moveWordEnd(isBigWordChar));
  } else if (key === "$") {
    moveToLineEnd(count);
  } else if (key === "^") {
    moveToFirstNonBlank();
  } else if (key === "%") {
    if (!moveToMatchingPair()) {
      finishCommand(key);
      return;
    }
  } else if (key === "G") {
    executeLineJump(getCount(null), false);
  } else if (key === "H") {
    moveToScreenLine("top");
  } else if (key === "M") {
    moveToScreenLine("middle");
  } else if (key === "L") {
    moveToScreenLine("bottom");
  } else if (key === "}") {
    moveParagraph(1, count);
  } else if (key === "{") {
    moveParagraph(-1, count);
  } else if (key === ";") {
    if (!repeatLastFind(false, count)) {
      finishCommand(key);
      return;
    }
  } else if (key === ",") {
    if (!repeatLastFind(true, count)) {
      finishCommand(key);
      return;
    }
  } else if (key === "n") {
    if (!repeatLastSearch(false, count)) {
      finishCommand(key);
      return;
    }
  } else if (key === "N") {
    if (!repeatLastSearch(true, count)) {
      finishCommand(key);
      return;
    }
  } else if (key === "i") {
    enterInsertMode("before");
    return;
  } else if (key === "a") {
    enterInsertMode("after");
    return;
  } else if (key === "I") {
    enterInsertMode("line-start");
    return;
  } else if (key === "A") {
    enterInsertMode("line-end");
    return;
  } else if (key === "o") {
    openInsertLine(true);
    return;
  } else if (key === "O") {
    openInsertLine(false);
    return;
  } else if (key === "u") {
    undoLastChange();
  } else if (key === "p") {
    pasteLines(true);
  } else if (key === "P") {
    pasteLines(false);
  } else if (key === "r") {
    command.replaceMode = true;
    dom.statusLine.textContent = "Pending replacement";
    return;
  } else if (key === "x") {
    deleteCharacter(count);
  } else {
    dom.statusLine.textContent = "No motion";
    dom.lastCommand.textContent = key;
    command = emptyCommand();
    return;
  }

  if (key !== "p" && key !== "P" && key !== "x" && key !== "u") {
    dom.statusLine.textContent = "Moved";
  }
  dom.lastCommand.textContent = `${command.count}${key}`;
  command = emptyCommand();
}

function finishCommand(key) {
  dom.lastCommand.textContent = `${command.count}${key}`;
  command = emptyCommand();
}

function processSearchInput(key) {
  if (key === "Escape") {
    dom.statusLine.textContent = "Cleared";
    dom.lastCommand.textContent = command.searchMode;
    command = emptyCommand();
    return;
  }

  if (key === "Backspace") {
    command.searchInput = command.searchInput.slice(0, -1);
    dom.statusLine.textContent = `Pending ${command.searchMode}`;
    return;
  }

  if (key === "Enter") {
    const query = command.searchInput;
    const mode = command.searchMode;

    if (query) {
      const direction = mode === "/" ? 1 : -1;
      if (executeSearch(query, direction, getCount(1))) {
        lastSearch = { query, direction };
      }
    } else {
      dom.statusLine.textContent = "No search";
    }

    dom.lastCommand.textContent = `${command.count}${mode}${query}`;
    command = emptyCommand();
    return;
  }

  if (key.length === 1) {
    command.searchInput += key;
    dom.statusLine.textContent = `Pending ${command.searchMode}`;
  }
}

function processMarkCommand(key) {
  if (key.length !== 1) {
    dom.statusLine.textContent = "No mark";
    return;
  }

  if (command.markMode === "set") {
    marks[key] = { ...cursor };
    dom.statusLine.textContent = `Marked ${key}`;
    dom.lastCommand.textContent = `m${key}`;
    return;
  }

  const mark = marks[key];
  if (!mark) {
    dom.statusLine.textContent = "Mark missing";
    dom.lastCommand.textContent = `${command.markMode === "jumpExact" ? "`" : "'"}${key}`;
    return;
  }

  cursor = { ...mark };

  if (command.markMode === "jumpLine") {
    moveToFirstNonBlank();
  }

  dom.statusLine.textContent = "Moved";
  dom.lastCommand.textContent = `${command.markMode === "jumpExact" ? "`" : "'"}${key}`;
}

function processGCommand(key) {
  const count = getCount(null);

  if (key === "g") {
    executeLineJump(count, true);
  } else if (key === "j") {
    moveVertical(getCount(1));
  } else if (key === "k") {
    moveVertical(-getCount(1));
  } else if (key === "e") {
    repeat(getCount(1), () => moveWordBackwardEnd(isWordChar));
  } else if (key === "E") {
    repeat(getCount(1), () => moveWordBackwardEnd(isBigWordChar));
  } else if (key === "_") {
    moveToLastNonBlank(getCount(1));
  } else if (key === "d" || key === "D") {
    dom.statusLine.textContent = "Needs code index";
  } else {
    dom.statusLine.textContent = "No motion";
  }

  dom.lastCommand.textContent = `${command.count}g${key}`;
}

function processZCommand(key) {
  if (key === "z" || key === "t" || key === "b") {
    dom.statusLine.textContent = "View adjusted";
  } else {
    dom.statusLine.textContent = "No motion";
  }

  dom.lastCommand.textContent = `${command.count}z${key}`;
}

function enterInsertMode(position) {
  saveUndoState();
  const line = currentLine();

  if (position === "after") {
    cursor.col = Math.min(line.length, cursor.col + 1);
  } else if (position === "line-start") {
    cursor.col = 0;
  } else if (position === "line-end") {
    cursor.col = line.length;
  } else {
    cursor.col = clamp(cursor.col, 0, line.length);
  }

  editorMode = "insert";
  dom.statusLine.textContent = "Insert";
  dom.lastCommand.textContent = positionToInsertCommand(position);
  command = emptyCommand();
}

function openInsertLine(below) {
  saveUndoState();
  const insertAt = below ? cursor.line + 1 : cursor.line;
  activeLines.splice(insertAt, 0, "");
  cursor.line = insertAt;
  cursor.col = 0;
  editorMode = "insert";
  dom.statusLine.textContent = "Insert";
  dom.lastCommand.textContent = below ? "o" : "O";
  command = emptyCommand();
}

function positionToInsertCommand(position) {
  if (position === "after") return "a";
  if (position === "line-start") return "I";
  if (position === "line-end") return "A";
  return "i";
}

function processInsertKey(key) {
  if (key === "Escape") {
    exitInsertMode();
    return;
  }

  if (key === "Backspace") {
    backspaceInsert();
    dom.lastCommand.textContent = "Backspace";
    return;
  }

  if (key === "Enter") {
    splitInsertLine();
    dom.lastCommand.textContent = "Enter";
    return;
  }

  if (key.length !== 1) return;

  const line = currentLine();
  activeLines[cursor.line] = `${line.slice(0, cursor.col)}${key}${line.slice(cursor.col)}`;
  cursor.col += 1;
  dom.statusLine.textContent = "Insert";
  dom.lastCommand.textContent = key;
}

function exitInsertMode() {
  editorMode = "normal";
  const line = currentLine();
  cursor.col = line.length === 0 ? 0 : clamp(cursor.col - 1, 0, line.length - 1);
  dom.statusLine.textContent = "Normal";
  dom.lastCommand.textContent = "Esc";
  command = emptyCommand();
}

function backspaceInsert() {
  if (cursor.col > 0) {
    const line = currentLine();
    activeLines[cursor.line] = `${line.slice(0, cursor.col - 1)}${line.slice(cursor.col)}`;
    cursor.col -= 1;
    dom.statusLine.textContent = "Insert";
    return;
  }

  if (cursor.line === 0) {
    dom.statusLine.textContent = "Insert";
    return;
  }

  const current = currentLine();
  const previous = activeLines[cursor.line - 1];
  cursor.col = previous.length;
  activeLines[cursor.line - 1] = `${previous}${current}`;
  activeLines.splice(cursor.line, 1);
  cursor.line -= 1;
  dom.statusLine.textContent = "Insert";
}

function splitInsertLine() {
  const line = currentLine();
  const before = line.slice(0, cursor.col);
  const after = line.slice(cursor.col);
  activeLines[cursor.line] = before;
  activeLines.splice(cursor.line + 1, 0, after);
  cursor.line += 1;
  cursor.col = 0;
  dom.statusLine.textContent = "Insert";
}

function saveUndoState() {
  undoStack.push({
    lines: activeLines.slice(),
    cursor: { ...cursor },
  });

  if (undoStack.length > 100) {
    undoStack.shift();
  }
}

function undoLastChange() {
  const snapshot = undoStack.pop();

  if (!snapshot) {
    dom.statusLine.textContent = "Nothing to undo";
    dom.lastCommand.textContent = "u";
    return;
  }

  activeLines = snapshot.lines.slice();
  cursor = { ...snapshot.cursor };
  editorMode = "normal";
  command = emptyCommand();
  dom.statusLine.textContent = "Undone";
  dom.lastCommand.textContent = "u";
}

function processDCommand(key) {
  if (key === "d") {
    deleteLines(getCount(1));
    dom.lastCommand.textContent = `${command.count}dd`;
  } else {
    dom.statusLine.textContent = "No motion";
    dom.lastCommand.textContent = `${command.count}d${key}`;
  }
}

function processQCommand(key) {
  if (!/^[A-Za-z]$/.test(key)) {
    dom.statusLine.textContent = "No register";
    dom.lastCommand.textContent = `q${key}`;
    return;
  }

  macroRecording = key;
  macros[key] = [];
  dom.statusLine.textContent = `Recording ${key}`;
  dom.lastCommand.textContent = `q${key}`;
}

function processAtCommand(key) {
  if (key === "@") {
    if (!lastMacroRegister) {
      dom.statusLine.textContent = "No macro";
      dom.lastCommand.textContent = "@@";
      return;
    }

    command = emptyCommand();
    runMacro(lastMacroRegister);
    dom.lastCommand.textContent = "@@";
    return;
  }

  if (!macros[key] || macros[key].length === 0) {
    dom.statusLine.textContent = "No macro";
    dom.lastCommand.textContent = `@${key}`;
    return;
  }

  command = emptyCommand();
  runMacro(key);
  dom.lastCommand.textContent = `@${key}`;
}

function runMacro(register) {
  const keys = macros[register];

  if (!keys || keys.length === 0) {
    dom.statusLine.textContent = "No macro";
    return;
  }

  lastMacroRegister = register;
  replayingMacro = true;
  keys.forEach((key) => {
    if (!completed) {
      processKey(key);
    }
  });
  replayingMacro = false;
  dom.statusLine.textContent = `Ran macro ${register}`;
}

function deleteLines(count) {
  if (activeLines.length === 0) return;

  saveUndoState();
  const deleteCount = clamp(count, 1, activeLines.length - cursor.line);
  lineRegister = activeLines.splice(cursor.line, deleteCount);

  if (activeLines.length === 0) {
    activeLines.push("");
  }

  cursor.line = clamp(cursor.line, 0, activeLines.length - 1);
  cursor.col = clamp(cursor.col, 0, Math.max(0, currentLine().length - 1));
  dom.statusLine.textContent = "Deleted line";
}

function pasteLines(afterCursor) {
  if (lineRegister.length === 0) {
    dom.statusLine.textContent = "Register empty";
    return;
  }

  saveUndoState();
  const insertAt = afterCursor ? cursor.line + 1 : cursor.line;
  activeLines.splice(insertAt, 0, ...lineRegister);
  cursor.line = insertAt;
  cursor.col = clamp(cursor.col, 0, Math.max(0, currentLine().length - 1));
  dom.statusLine.textContent = "Pasted";
}

function replaceCharacter(char) {
  if (char.length !== 1) {
    dom.statusLine.textContent = "No replacement";
    return;
  }

  const line = currentLine();

  if (!line) {
    dom.statusLine.textContent = "No character";
    return;
  }

  saveUndoState();
  activeLines[cursor.line] = `${line.slice(0, cursor.col)}${char}${line.slice(cursor.col + 1)}`;
  dom.statusLine.textContent = "Replaced";
}

function deleteCharacter(count) {
  const line = currentLine();

  if (!line) {
    dom.statusLine.textContent = "No character";
    return;
  }

  saveUndoState();
  const deleteCount = clamp(count, 1, line.length - cursor.col);
  activeLines[cursor.line] = `${line.slice(0, cursor.col)}${line.slice(cursor.col + deleteCount)}`;
  cursor.col = clamp(cursor.col, 0, Math.max(0, currentLine().length - 1));
  dom.statusLine.textContent = "Deleted character";
}

function moveHorizontal(delta) {
  const line = currentLine();
  cursor.col = clamp(cursor.col + delta, 0, Math.max(0, line.length - 1));
}

function moveVertical(delta) {
  const nextLine = clamp(cursor.line + delta, 0, activeLines.length - 1);
  cursor.line = nextLine;
  cursor.col = clamp(cursor.col, 0, Math.max(0, currentLine().length - 1));
}

function moveToLineStart() {
  cursor.col = 0;
  dom.statusLine.textContent = "Moved";
}

function moveToFirstNonBlank() {
  const line = currentLine();
  const index = line.search(/\S/);
  cursor.col = index === -1 ? 0 : index;
}

function moveToLineEnd(count) {
  if (count > 1) {
    cursor.line = clamp(cursor.line + count - 1, 0, activeLines.length - 1);
  }
  cursor.col = Math.max(0, currentLine().length - 1);
}

function moveToLastNonBlank(count) {
  if (count > 1) {
    cursor.line = clamp(cursor.line + count - 1, 0, activeLines.length - 1);
  }

  const match = currentLine().match(/\S\s*$/);
  cursor.col = match ? match.index : 0;
}

function executeLineJump(lineNumber, top) {
  if (lineNumber === null) {
    cursor.line = top ? 0 : activeLines.length - 1;
  } else {
    cursor.line = clamp(lineNumber - 1, 0, activeLines.length - 1);
  }
  cursor.col = clamp(cursor.col, 0, Math.max(0, currentLine().length - 1));
  dom.statusLine.textContent = "Moved";
}

function executeFind(mode, char, count) {
  const line = currentLine();
  const direction = mode === "f" || mode === "t" ? 1 : -1;
  let index = cursor.col;
  let found = -1;

  for (let step = 0; step < count; step += 1) {
    index += direction;
    found = -1;

    while (index >= 0 && index < line.length) {
      if (line[index] === char) {
        found = index;
        break;
      }
      index += direction;
    }

    if (found === -1) break;
    index = found;
  }

  if (found === -1) {
    dom.statusLine.textContent = "Not found";
    return false;
  }

  if (mode === "t") {
    found = Math.max(cursor.col, found - 1);
  } else if (mode === "T") {
    found = Math.min(cursor.col, found + 1);
  }

  cursor.col = clamp(found, 0, Math.max(0, line.length - 1));
  dom.statusLine.textContent = "Moved";
  return true;
}

function repeatLastFind(reverse, count) {
  if (!lastFind) {
    dom.statusLine.textContent = "No find";
    return false;
  }

  const mode = reverse ? oppositeFindMode(lastFind.mode) : lastFind.mode;
  return executeFind(mode, lastFind.char, count);
}

function repeatLastSearch(reverse, count) {
  if (!lastSearch) {
    dom.statusLine.textContent = "No search";
    return false;
  }

  const direction = reverse ? -lastSearch.direction : lastSearch.direction;
  return executeSearch(lastSearch.query, direction, count);
}

function executeSearch(query, direction, count) {
  const flat = getFlatText();
  const currentIndex = getFlatIndex(flat, cursor);
  let searchFrom = currentIndex;
  let foundIndex = -1;

  for (let step = 0; step < count; step += 1) {
    foundIndex = findQueryIndex(flat.text, query, searchFrom, direction);
    if (foundIndex === -1) break;
    searchFrom = foundIndex;
  }

  if (foundIndex === -1) {
    dom.statusLine.textContent = "Not found";
    return false;
  }

  moveToFlatIndex(flat, foundIndex, direction === -1 ? "backward" : "forward");
  dom.statusLine.textContent = "Moved";
  return true;
}

function findQueryIndex(text, query, startIndex, direction) {
  if (direction > 0) {
    const afterCursor = text.indexOf(query, startIndex + 1);
    return afterCursor === -1 ? text.indexOf(query, 0) : afterCursor;
  }

  const beforeCursor = text.lastIndexOf(query, startIndex - 1);
  return beforeCursor === -1 ? text.lastIndexOf(query) : beforeCursor;
}

function oppositeFindMode(mode) {
  if (mode === "f") return "F";
  if (mode === "F") return "f";
  if (mode === "t") return "T";
  return "t";
}

function moveWordForward(wordTester) {
  const flat = getFlatText();
  let index = getFlatIndex(flat, cursor) + 1;

  if (wordTester(flat.text[index - 1])) {
    while (index < flat.text.length && wordTester(flat.text[index])) index += 1;
  }

  while (index < flat.text.length && !wordTester(flat.text[index])) index += 1;
  moveToFlatIndex(flat, index, "forward");
}

function moveWordBackward(wordTester) {
  const flat = getFlatText();
  let index = getFlatIndex(flat, cursor) - 1;

  while (index > 0 && !wordTester(flat.text[index])) index -= 1;
  while (index > 0 && wordTester(flat.text[index - 1])) index -= 1;
  moveToFlatIndex(flat, index, "backward");
}

function moveWordEnd(wordTester) {
  const flat = getFlatText();
  let index = getFlatIndex(flat, cursor);

  if (wordTester(flat.text[index]) && wordTester(flat.text[index + 1])) {
    while (index < flat.text.length && wordTester(flat.text[index])) index += 1;
    index -= 1;
  } else {
    index += 1;
    while (index < flat.text.length && !wordTester(flat.text[index])) index += 1;
    while (index < flat.text.length - 1 && wordTester(flat.text[index + 1])) index += 1;
  }

  moveToFlatIndex(flat, index, "forward");
}

function moveWordBackwardEnd(wordTester) {
  const flat = getFlatText();
  const currentIndex = getFlatIndex(flat, cursor);
  let index = currentIndex - 1;

  if (wordTester(flat.text[currentIndex])) {
    while (index >= 0 && wordTester(flat.text[index])) index -= 1;
  }

  while (index >= 0 && !wordTester(flat.text[index])) index -= 1;

  moveToFlatIndex(flat, index, "backward");
}

function moveToScreenLine(target) {
  if (target === "top") {
    cursor.line = 0;
  } else if (target === "middle") {
    cursor.line = Math.floor((activeLines.length - 1) / 2);
  } else {
    cursor.line = activeLines.length - 1;
  }

  cursor.col = clamp(cursor.col, 0, Math.max(0, currentLine().length - 1));
}

function moveParagraph(direction, count) {
  for (let step = 0; step < count; step += 1) {
    if (direction > 0) {
      cursor.line = findNextParagraphLine(cursor.line);
    } else {
      cursor.line = findPreviousParagraphLine(cursor.line);
    }
  }

  cursor.col = clamp(cursor.col, 0, Math.max(0, currentLine().length - 1));
}

function findNextParagraphLine(lineIndex) {
  let next = lineIndex + 1;

  while (next < activeLines.length && activeLines[next].trim() !== "") next += 1;
  while (next < activeLines.length && activeLines[next].trim() === "") next += 1;

  return clamp(next, 0, activeLines.length - 1);
}

function findPreviousParagraphLine(lineIndex) {
  let previous = lineIndex - 1;

  while (previous > 0 && activeLines[previous].trim() === "") previous -= 1;
  while (previous > 0 && activeLines[previous - 1].trim() !== "") previous -= 1;

  return clamp(previous, 0, activeLines.length - 1);
}

function moveToMatchingPair() {
  const pair = findPairUnderOrAfterCursor();

  if (!pair) {
    dom.statusLine.textContent = "No match";
    return false;
  }

  const flat = getFlatText();
  const startIndex = getFlatIndex(flat, pair.position);
  const direction = pair.direction;
  let depth = 0;

  for (let index = startIndex; index >= 0 && index < flat.text.length; index += direction) {
    const char = flat.text[index];

    if (char === pair.open) depth += 1;
    if (char === pair.close) depth -= 1;

    if (depth === 0) {
      const position = flat.positions[index];
      if (position) {
        cursor = { ...position };
        return true;
      }
    }
  }

  dom.statusLine.textContent = "No match";
  return false;
}

function findPairUnderOrAfterCursor() {
  const line = currentLine();
  const pairs = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">",
  };
  const reversePairs = Object.fromEntries(Object.entries(pairs).map(([open, close]) => [close, open]));

  for (let col = cursor.col; col < line.length; col += 1) {
    const char = line[col];

    if (pairs[char]) {
      return {
        position: { line: cursor.line, col },
        open: char,
        close: pairs[char],
        direction: 1,
      };
    }

    if (reversePairs[char]) {
      return {
        position: { line: cursor.line, col },
        open: reversePairs[char],
        close: char,
        direction: -1,
      };
    }
  }

  return null;
}

function getFlatText() {
  const chars = [];
  const positions = [];

  activeLines.forEach((line, lineIndex) => {
    [...line].forEach((char, colIndex) => {
      chars.push(char);
      positions.push({ line: lineIndex, col: colIndex });
    });

    if (lineIndex < activeLines.length - 1) {
      chars.push("\n");
      positions.push(null);
    }
  });

  return { text: chars.join(""), positions };
}

function getFlatIndex(flat, position) {
  const index = flat.positions.findIndex((candidate) => samePosition(candidate, position));
  return index === -1 ? 0 : index;
}

function moveToFlatIndex(flat, index, direction) {
  let nextIndex = clamp(index, 0, flat.positions.length - 1);

  while (nextIndex >= 0 && nextIndex < flat.positions.length && !flat.positions[nextIndex]) {
    nextIndex += direction === "backward" ? -1 : 1;
  }

  if (!flat.positions[nextIndex]) return;
  cursor = { ...flat.positions[nextIndex] };
}

function completeLevel() {
  stopTimer();
  completed = true;
  const result = calculateScore(strokes, elapsedMs);
  const previousBest = scores[currentLevel.id];
  const isNewBest = previousBest === undefined || result.score > previousBest;

  if (isNewBest) {
    scores[currentLevel.id] = result.score;
    saveScores();
  }

  const scoreDetail = result.timedOut
    ? `Solved in ${formatTime(elapsedMs)} with ${strokes} keystrokes. Time exceeded 15 seconds, so score is ${result.score}/100.`
    : `Solved in ${formatTime(elapsedMs)} with ${strokes} keystrokes. Score: ${result.score}/100 (${result.multiplier}x key penalty).`;

  dom.completeCopy.textContent = isNewBest
    ? `${scoreDetail} New high score saved.`
    : `${scoreDetail} Current best is ${previousBest}.`;
  dom.nextLevelButton.textContent = currentLevelIndex === levels.length - 1 ? "First Level" : "Next Level";
  dom.completeModal.hidden = false;
  renderHome();
  updateScoreStrip();
}

function hideCompleteModal() {
  dom.completeModal.hidden = true;
}

function startTimer() {
  stopTimer();
  levelStartTime = Date.now();
  elapsedMs = 0;
  timerId = window.setInterval(updateScoreStrip, 100);
}

function resetTimer() {
  stopTimer();
  levelStartTime = 0;
  elapsedMs = 0;
}

function ensureTimerStarted() {
  if (!levelStartTime) {
    startTimer();
  }
}

function stopTimer() {
  if (timerId) {
    window.clearInterval(timerId);
    timerId = 0;
  }
}

function calculateScore(keystrokes, timeMs) {
  const seconds = timeMs / 1000;

  if (seconds > 15) {
    return { score: 0, multiplier: 0, timedOut: true };
  }

  const multiplier = getTimeMultiplier(seconds);
  const score = clamp(Math.round(100 - keystrokes * multiplier), 0, 100);

  return { score, multiplier, timedOut: false };
}

function getTimeMultiplier(seconds) {
  if (seconds < 1) return 0;
  if (seconds <= 3) return 1;
  if (seconds <= 8) return 1.5;
  return 2;
}

function formatTime(timeMs) {
  return `${(timeMs / 1000).toFixed(1)}s`;
}

function isLevelComplete() {
  if (currentLevel.targetLines) {
    return linesEqual(activeLines, currentLevel.targetLines);
  }

  return samePosition(cursor, currentLevel.goal);
}

function linesEqual(left, right) {
  return left.length === right.length && left.every((line, index) => line === right[index]);
}

function updateScoreStrip() {
  if (currentLevel && !completed && levelStartTime) {
    elapsedMs = Date.now() - levelStartTime;
  }

  const result = currentLevel ? calculateScore(strokes, elapsedMs) : null;
  dom.timerCount.textContent = currentLevel ? formatTime(elapsedMs) : "0.0s";
  dom.strokeCount.textContent = String(strokes);
  dom.scoreCount.textContent = result ? String(result.score) : "--";
  dom.bestScore.textContent = currentLevel ? formatScore(scores[currentLevel.id]) : "--";
}

function updateCommandBuffer() {
  if (editorMode === "insert") {
    dom.commandBuffer.textContent = "-- INSERT --";
    dom.commandDefinition.textContent = "type text into the buffer; Esc returns to normal mode";
  } else if (command.searchMode) {
    dom.commandBuffer.textContent = `${command.count}${command.searchMode}${command.searchInput}`;
    dom.commandDefinition.textContent = describeCommand(`${command.count}${command.searchMode}${command.searchInput || "pattern"}`);
  } else if (command.replaceMode) {
    dom.commandBuffer.textContent = `${command.count}r`;
    dom.commandDefinition.textContent = describeCommand("r");
  } else if (command.markMode) {
    const prefix = command.markMode === "set" ? "m" : command.markMode === "jumpExact" ? "`" : "'";
    dom.commandBuffer.textContent = `${command.count}${prefix}`;
    dom.commandDefinition.textContent = describeCommand(prefix);
  } else if (command.findMode) {
    dom.commandBuffer.textContent = `${command.count}${command.findMode}?`;
    dom.commandDefinition.textContent = describeCommand(command.findMode);
  } else if (command.prefix) {
    dom.commandBuffer.textContent = `${command.count}${command.prefix}`;
    dom.commandDefinition.textContent = describeCommand(command.prefix);
  } else if (command.count) {
    dom.commandBuffer.textContent = command.count;
    dom.commandDefinition.textContent = "count prefix for the next command";
  } else {
    const lastCommand = dom.lastCommand.textContent || "--";
    dom.commandBuffer.textContent = lastCommand;
    dom.commandDefinition.textContent = describeCommand(lastCommand);
  }
}

function describeCommand(commandText) {
  if (!commandText || commandText === "--") return "Press a supported motion.";
  if (commandText === "Esc") return commandDefinitions.Esc;
  if (commandText === "Backspace") return "delete before cursor in insert mode, or clear the pending command";

  const countMatch = commandText.match(/^(\d+)(.+)$/);
  const count = countMatch ? countMatch[1] : "";
  const commandWithoutCount = countMatch ? countMatch[2] : commandText;

  if (/^\d+$/.test(commandText)) return "count prefix for the next command";

  if (count && (commandWithoutCount === "G" || commandWithoutCount === "gg")) {
    return `go to line ${count}`;
  }

  if (commandDefinitions[commandWithoutCount]) {
    return withCount(commandDefinitions[commandWithoutCount], count);
  }

  const findMatch = commandWithoutCount.match(/^([fFtT])(.+)$/);
  if (findMatch) {
    return describeFindCommand(findMatch[1], findMatch[2], count);
  }

  const searchMatch = commandWithoutCount.match(/^([/?])(.+)$/);
  if (searchMatch) {
    const direction = searchMatch[1] === "/" ? "forward" : "backward";
    return `search ${direction} for ${searchMatch[2]}`;
  }

  const markSetMatch = commandWithoutCount.match(/^m(.)$/);
  if (markSetMatch) {
    return `set current position for mark ${markSetMatch[1]}`;
  }

  const markJumpMatch = commandWithoutCount.match(/^([`'])(.)$/);
  if (markJumpMatch) {
    return markJumpMatch[1] === "`"
      ? `jump to position of mark ${markJumpMatch[2]}`
      : `jump to the first non-blank character on the line of mark ${markJumpMatch[2]}`;
  }

  return "No definition for this command in the current puzzle mode.";
}

function describeFindCommand(mode, char, count) {
  const definitions = {
    f: `jump to next occurrence of character ${char}`,
    t: `jump to before next occurrence of character ${char}`,
    F: `jump to previous occurrence of character ${char}`,
    T: `jump to after previous occurrence of character ${char}`,
  };

  return withCount(definitions[mode], count);
}

function withCount(definition, count) {
  return count ? `${definition} (${count} times)` : definition;
}

function currentLine() {
  return activeLines[cursor.line] || "";
}

function formatGoal(level) {
  if (level.goalLabel) return level.goalLabel;

  const char = activeLines[level.goal.line][level.goal.col];
  const label = char === " " ? "space" : char;
  return `${label} at ${level.goal.line + 1}:${level.goal.col + 1}`;
}

function formatScore(score) {
  return score === undefined ? "--" : String(score);
}

function emptyCommand() {
  return {
    count: "",
    prefix: "",
    findMode: "",
    markMode: "",
    replaceMode: false,
    searchMode: "",
    searchInput: "",
  };
}

function getCount(defaultValue) {
  if (command.count === "") return defaultValue;
  const parsed = Number.parseInt(command.count, 10);
  return Number.isFinite(parsed) ? parsed : defaultValue;
}

function isDigit(value) {
  return /^[0-9]$/.test(value);
}

function isWordChar(value) {
  return typeof value === "string" && /^[A-Za-z0-9_]$/.test(value);
}

function isBigWordChar(value) {
  return typeof value === "string" && value !== "\n" && /\S/.test(value);
}

function samePosition(a, b) {
  return Boolean(a && b && a.line === b.line && a.col === b.col);
}

function repeat(count, action) {
  for (let index = 0; index < count; index += 1) {
    action();
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function loadScores() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveScores() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch {
    dom.statusLine.textContent = "Scores unavailable";
  }
}
