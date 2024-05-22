/*
@title: Sprig-Edit
@author: Colack
@tags: ['utility']
@img: ""
@addedOn: 2024-04-30

This is Sprig-Edit, a basic text editor for Sprig.

Controls:
AD - Move Cursor
JL - Change Char
I  - Place Char
K  - Remove Char
S  - Space
W  - Change Color
*/

/*
  Hi there! This is a development version of Sprig Edit! Meaning, it's not quite finished yet.
  There are prone to be a lot of bugs, and it's not quite as polished as I'd like it to be.

  If you want to use the current version of Sprig Edit, you can find it in the root directory of this repo, in the file sprig-edit.js.

  Thanks,
  - Colack
*/

const player = "p";

var matrix = Array.from({ length: 15 }, () => Array(16).fill(" "));
var colorMatrix = Array.from({ length: 15 }, () => Array(16).fill(" "));

var MATRIX_SAVES = [
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``
];

var MATRIX_COLOR = [
  Array.from({ length: 15 }, () => Array(16).fill(" ")),
  Array.from({ length: 15 }, () => Array(16).fill(" ")),
  Array.from({ length: 15 }, () => Array(16).fill(" ")),
  Array.from({ length: 15 }, () => Array(16).fill(" ")),
  Array.from({ length: 15 }, () => Array(16).fill(" ")),
  Array.from({ length: 15 }, () => Array(16).fill(" ")),
  Array.from({ length: 15 }, () => Array(16).fill(" ")),
  Array.from({ length: 15 }, () => Array(16).fill(" "))
];

const SAMPLES = [
  ``,
  `This is an exam\nple text. You ca\nn load it into S\nprig-Edit and st\nart editing righ\nt away.`,
  `Hello world! Thi\ns is a sample te\nxt. You can use\n it for testing.`,
  `Lorem ipsum dolo\nr sit amet, cons\nectetur adipisci\nng elit. Sed do\n eiusmod tempor\n incididunt ut l\nabore et dolore\n magna aliqua.`,
  `Welcome to Sprig\n-Edit! Create am\nazing texts with\n ease. Enjoy the\n creative proces\ns!`,
  `Thanks for using\n Sprig-Edit!`,
  `Programming is f\nun! Let's write\n some code. Spri\ng-Edit makes it\n easy.`,
  `Roses are red, V\niolets are blue.\n Sugar is sweet,\n And so are you.`,
  `Once upon a time\n, In a land far\n away, There liv\ned a princess, A\nnd she had much\n to say.`
]

const BACKGROUND_BLACK = "B";
const BACKGROUND_DGREY = "D";
const BACKGROUND_LGREY = "G";

const COLORS = [color`3`, color`9`, color`6`, color`4`, color`7`, color`2`];

const LOGO_1 = "1";
const LOGO_2 = "2";
const LOGO_3 = "3";
const LOGO_4 = "4";

const QUILL = "5";

var MATRIX_X = 0;
var MATRIX_Y = 0;

var currentColor = 0;
var currentCharacter = 1;
var currentHeldCharacter = "a";
var textColor = color`2`;

var currentScreen = 0;

const SPRIG_EDIT = {
  VERSION: {
    MAJOR: 0,
    MINOR: 3,
    PATCH: 0,
  },
  VERSION_NAME: "Whims"
};

setLegend(
  [
    BACKGROUND_BLACK,
    bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`,
  ],
  [
    BACKGROUND_DGREY,
    bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`,
  ],
  [
    BACKGROUND_LGREY,
    bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`,
  ],
  [
    LOGO_1,
    bitmap`
................
................
................
.........222....
........20022...
........200022..
........20000222
........20200020
........20220000
........20220000
........20000000
........22000000
........22002000
........20020000
........20200700
........20202000`,
  ],
  [
    LOGO_2,
    bitmap`
................
........2222....
........20022...
......2220002...
......22000022..
......220002022.
222222200002202.
000000000002202.
000000000002202.
0000000000000022
0000000000000002
0000002220000002
0000002007000002
0000022077700002
0000022020070002
0000022070070002`,
  ],
  [
    LOGO_3,
    bitmap`
........20207000
........20207000
........20207000
........20207700
........20207700
........20000000
.........2088800
..........200222
.......222222000
.......200000220
.......202220000
.......200222200
.......220222000
........22022000
........22002000
.........2200000`,
  ],
  [
    LOGO_4,
    bitmap`
0000222070070002
0000222070070002
0000022070070002
0000022077700002
0000002077000202
0000000000022200
0000000888880000
2222222222200020
2222222220000220
0000000000602220
6666666666002220
6666666660002200
6666660600002202
0660006000000002
0660066000000022
006666000000022.`,
  ],
  [
    QUILL,
    bitmap`
...........00000
.........0066660
........0660660.
.......0660660..
......0660660...
.....06606660...
.....0606660....
.....006600.....
.....0000.......
....00..........
.00000000.......
..01L110........
..055550........
.05555550.......
.05555550.......
.00000000000000.`,
  ],
);

setSolids([]);

let level = 0;
const levels = [
  map`
5..............5
................
................
................
................
................
................
................
................
................
................
................
................
................
..............12
..............34`,
  map`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`
];

const changeCharacter = (currentCharacter) => {
  const charCode = currentCharacter;
  if (charCode >= CHAR_START && charCode <= CHAR_END) {
    if (charCode <= 26) {
      currentHeldCharacter = String.fromCharCode(charCode + 96);
    } else if (charCode <= 52) {
      currentHeldCharacter = String.fromCharCode(charCode + 64 - 26);
    } else {
      const specialChars = ["!", ".", "?", ",", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      currentHeldCharacter = specialChars[charCode - 53];
    }
  }
  console.log(currentCharacter, currentHeldCharacter);
};

const changeTextColor = () => {
  textColor = COLORS[currentColor];
};

const createScreens = (screen) => {
  clearText();
  switch (screen) {
    case 0:
      createMenuTitle(5, "Sprig Edit");
      createText(`v${SPRIG_EDIT.VERSION.MAJOR}.${SPRIG_EDIT.VERSION.MINOR}.${SPRIG_EDIT.VERSION.PATCH}`, 7, 4, color`2`);
      createText("Press S To", 5, 7, color`2`);
      createText("Start", 8, 9, color`2`);
      createText("Colack 2024", 2, 15, color`2`);
      break;
    case 1:
      createMenuTitle(4, "Menu Options");
      ["W - ChangeLog", "A - Credits", "S - Examples", "D - About", " ", "I - New File", "J - Controls", "K - Customize", "L - Load File"]
        .forEach((text, idx) => createText(text, 2, 3 + idx, color`2`));
      break;
    case 2:
      loadMatrix();
      createText("Color", 2, 15, textColor);
      createText(currentHeldCharacter, 8, 15, color`2`);
      createText(`X${MATRIX_X}`, 10, 15, color`2`);
      createText(`Y${MATRIX_Y}`, 14, 15, color`2`);
      break;
    case 3:
      createMenuTitle(6, "Credits");
      ["By Jack S.", "", "Testers:", "- Joe", "- Nat", "- Trent", "- Jared", "- Phin", "", "", "Thanks for using", "Sprig Edit"]
        .forEach((text, idx) => createText(text, 2, 3 + idx, color`2`));
      break;
    case 4:
      createMenuTitle(5, "Change Log");
      [`Sprig-Edit ${SPRIG_EDIT.VERSION.MAJOR}.${SPRIG_EDIT.VERSION.MINOR}.${SPRIG_EDIT.VERSION.PATCH}`, `${SPRIG_EDIT.VERSION_NAME} Update`, "Added:", "- TBD"]
        .forEach((text, idx) => createText(text, 2, 2 + idx, color`2`));
      break
    case 5:
      createMenuTitle(6, "Controls");
      createText("AD - Move Cursor", 2, 2, color`2`);
      createText("JL - Change Char", 2, 3, color`2`);
      createText("I  - Place Char ", 2, 4, color`2`);
      createText("K  - Remove Char", 2, 5, color`2`);
      createText("S  - Space      ", 2, 6, color`2`);
      createText("W  -", 2, 7, color`2`);
      createText("C", 7, 7, color`3`);
      createText("o", 8, 7, color`9`);
      createText("l", 9, 7, color`6`);
      createText("o", 10, 7, color`D`);
      createText("r", 11, 7, color`5`);
      createText("s", 12, 7, color`H`);
      createText("To save, go to", 2, 9, color`2`);
      createText("the last line", 2, 10, color`2`);
      createText("and press S!", 2, 11, color`2`);
      break;
    case 6:
      createMenuTitle(6, "Examples");
      ["W - Example Text", "A - Hello World", "S - Lorem ipsum", "D - Welcome", "I - Thanks", "J - Program", "K - Roses", "L - Princess"]
        .forEach((text, idx) => createText(text, 2, 3 + idx, color`2`));
      break;
    case 7:
      createMenuTitle(8, "About");
      ["Sprig Edit, a si", "mple text editor", "for Sprig.", "It supports 66", "different charac", "ters, and color.", "You can find the", "code at github.c", "om/colack/sprig-", "edit!"]
        .forEach((text, idx) => createText(text, 2, 3 + idx, color`2`));
      break;
    case 8:
      createMenuTitle(6, "New File");

      createText("AD - Move Cursor", 2, 2, color`2`);
      createText("JL - Change Char", 2, 3, color`2`);
      createText("I  - Place Char ", 2, 4, color`2`);
      createText("K  - Remove Char", 2, 5, color`2`);
      createText("S  - Space      ", 2, 6, color`2`);
      createText("W  -", 2, 7, color`2`);
      createText("C", 7, 7, color`3`);
      createText("o", 8, 7, color`9`);
      createText("l", 9, 7, color`6`);
      createText("o", 10, 7, color`D`);
      createText("r", 11, 7, color`5`);
      createText("s", 12, 7, color`H`);
      createText("To save, go to", 2, 9, color`2`);
      createText("the last line", 2, 10, color`2`);
      createText("and press S!", 2, 11, color`2`);
      createText("Press any key", 2, 13, color`2`);
      createText("to Start.", 2, 14, color`2`);
      break;
    case 9:
      createMenuTitle(8, "Save");
      ["W - Slot 1", "A - Slot 2", "S - Slot 3", "D - Slot 4", "I - Slot 5", "J - Slot 6", "K - Slot 7", "L - Slot 8"]
        .forEach((text, idx) => createText(text, 2, 2 + idx, color`2`));
      break;
    case 10:
      createMenuTitle(8, "Load");
      ["W - Slot 1", "A - Slot 2", "S - Slot 3", "D - Slot 4", "I - Slot 5", "J - Slot 6", "K - Slot 7", "L - Slot 8"]
        .forEach((text, idx) => createText(text, 2, 2 + idx, color`2`));
      break;
    case 11:
      createMenuTitle(6, "Customize");
      ["BkGr Color:", "W - Black", "A - Dark Grey", "S - Grey"]
        .forEach((text, idx) => createText(text, 2, 2 + idx, color`2`));
      break;
  }
};

const createMenuTitle = (x, text) => {
  createText(text, x, 0, color`2`);
  createText("(==============)", 2, 1, color`2`);
};

const loadMatrix = () => {
  for (let y = 0; y < 15; y++) {
    for (let x = 0; x < 16; x++) {
      if (x === MATRIX_X && y === MATRIX_Y) {
        let newX = x + 2;
        drawCursor(newX, y);
      } else {
        let newX = x + 2;
        createText(matrix[y][x], newX, y, colorMatrix[y][x]);
      }
    }
  }
}

function handleInput(input) {
  switch (input) {
    case "w":
      switch (currentScreen) {
        case 1:
          currentScreen = 4;
          break;
        case 2:
          if (currentColor == 5) {
            currentColor = 0;
          } else {
            currentColor++;
          }
          changeTextColor();
          break;
        case 6:
          
          resetColorMatrix();
          currentScreen = 2;
          break;
        case 8:
          matrix = stringToMatrix(SAMPLES[0]);
          resetColorMatrix();
          currentScreen = 2;
          break;
        case 9:
          saveFile(0);
          currentScreen = 1;
          break;
        case 10:
          loadFile(0);
          currentScreen = 2;
          break;
        case 11:
          setBackground(BACKGROUND_BLACK);
          currentScreen = 1;
          break;
      }
      break;
    case "a":
      switch (currentScreen) {
        case 1:
          currentScreen = 3;
        case 2:
          if (MATRIX_X == 0) {
            if (MATRIX_Y > 0) {
              MATRIX_Y--;
              MATRIX_X = 15;
            }
          } else {
            MATRIX_X--;
          }
          break;
        case 6:
          matrix = stringToMatrix(SAMPLES[2]);
          resetColorMatrix();
          currentScreen = 2;
          break;
        case 8:
          matrix = stringToMatrix(SAMPLES[0]);
          resetColorMatrix();
          currentScreen = 2;
          break;
        case 9:
          saveFile(1);
          currentScreen = 1;
          break;
        case 10:
          loadFile(1);
          currentScreen = 2;
          break;
        case 11:
          setBackground(BACKGROUND_DGREY);
          currentScreen = 1;
          break;
      }
      break;
    case "s":
      switch (currentScreen) {
        case 3:
        case 4:
        case 5:
        case 7:
        case 0:
          currentScreen = 1;
          setMap(levels[1]);
          break;
        case 1:
          currentScreen = 6;
          break;
        case 2:
          matrix[MATRIX_Y][MATRIX_X + 1] = " ";
          if (MATRIX_X < 15) {
            MATRIX_X += 2;
          } else if (MATRIX_Y < 14) {
            MATRIX_X = 0;
            MATRIX_Y++;
          } else if (MATRIX_X == 15 && MATRIX_Y == 14) {
            currentScreen = 9;
          } else if (MATRIX_X == 16 && MATRIX_Y == 14) {
            console.log("EASTER EGG ACTIVATED");
          }
          break;
        case 6:
          matrix = stringToMatrix(SAMPLES[3]);
          resetColorMatrix();
          currentScreen = 2;
          break;
        case 8:
          matrix = stringToMatrix(SAMPLES[0]);
          resetColorMatrix();
          currentScreen = 2;
          break;
        case 9:
          saveFile(2);
          currentScreen = 1;
          break;
        case 10:
          loadFile(2);
          currentScreen = 2;
          break;
        case 11:
          setBackground(BACKGROUND_LGREY);
          currentScreen = 1;
          break;
      }
      break;
    case "d":
      switch (currentScreen) {
        case 1:
          currentScreen = 7;
          break;
        case 2:
          if (MATRIX_X == 15 && MATRIX_Y < 14) {
            MATRIX_Y++;
            MATRIX_X = 0;
          } else if (MATRIX_X < 15) {
            MATRIX_X++;
          }
          break;
        case 6:
          matrix = stringToMatrix(SAMPLES[4]);
          resetColorMatrix();
          currentScreen = 2;
          break;
        case 8:
          matrix = stringToMatrix(SAMPLES[0]);
          resetColorMatrix();
          currentScreen = 2;
          break;
        case 9:
          saveFile(3);
          currentScreen = 1;
          break;
        case 10:
          loadFile(3);
          currentScreen = 2;
          break;
      }
      break;
    case "i":
      switch (currentScreen) {
        case 1:
          currentScreen = 8;
          break;
        case 2:
          matrix[MATRIX_Y][MATRIX_X] = currentHeldCharacter;
          colorMatrix[MATRIX_Y][MATRIX_X] = textColor;
          break;
        case 6:
          matrix = stringToMatrix(SAMPLES[5]);
          resetColorMatrix();
          currentScreen = 2;
          break;
        case 7:
          currentScreen = 8;
          break;
        case 8:
          matrix = stringToMatrix(SAMPLES[0]);
          resetColorMatrix();
          currentScreen = 2;
          break;
        case 9:
          saveFile(4);
          currentScreen = 1;
          break;
        case 10:
          loadFIle(4);
          currentScreen = 2;
          break;
      }
      break;
    case "j":
      switch (currentScreen) {
        case 1:
          currentScreen = 5;
          break;
        case 2:
          if (currentCharacter == 1) {
            currentCharacter = 66;
          } else {
            currentCharacter--;
          }
          changeCharacter();
          break;
        case 6:
          matrix = stringToMatrix(SAMPLES[6]);
          resetColorMatrix();
          currentScreen = 2;
          break;
        case 8:
          matrix = stringToMatrix(SAMPLES[0]);
          resetColorMatrix();
          currentScreen = 2;
          break;
        case 9:
          saveFile(5);
          currentScreen = 1;
          break;
        case 10:
          loadFile(5);
          currentScreen = 2;
          break;
      }
      break;
    case "k":
      switch (currentScreen) {
        case 1:
          currentScreen = 11;
        case 2:
          matrix[MATRIX_Y][MATRIX_X] = " ";
          break;
        case 6:
          matrix = stringToMatrix(SAMPLES[7]);
          resetColorMatrix();
          currentScreen = 2;
          break;
        case 8:
          matrix = stringToMatrix(SAMPLES[0]);
          resetColorMatrix();
          currentScreen = 2;
          break;
        case 9:
          saveFile(6);
          currentScreen = 1;
          break;
        case 10:
          loadFile(6);
          currentScreen = 2;
          break;
      }
      break;
    case "l":
      switch (currentScreen) {
        case 1:
          currentScreen = 10;
          break;
        case 2:
          if (currentCharacter == 66) {
            currentCharacter = 1;
          } else {
            currentCharacter++;
          }
          changeCharacter();
          break;
        case 6:
          matrix = stringToMatrix(SAMPLES[8]);
          resetColorMatrix();
          currentScreen = 2;
          break;
        case 8:
          matrix = stringToMatrix(SAMPLES[0]);
          resetColorMatrix();
          currentScreen = 2;
          break;
        case 9:
          saveFile(7);
          currentScreen = 1;
          break;
        case 10:
          loadFile(7);
          currentScreen = 2;
          break;
      }
      break;
  }
}

/*
const stringToMatrix = (text) => {
  const matrix = Array.from({ length: 15 }, () => Array(16).fill(' '));
  let row, col = 0;

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '\n') {
      row++;
      col = 0;
    } else {
      if (row < 15 && col < 16) {
        matrix[row][col] = text[i];
        col++;
      }
    }
  }

  return matrix;
};
*/

const drawCursor = (x, y) => {
  createText("/", x, y, color`2`);
};

const clearTiles = () => {
  for (let y = 0; y < 15; y++) {
    for (let x = 0; x < 16; x++) {
      createText(matrix[y][x], x, y, colorMatrix[y][x]);
    }
  }
}

const resetMatrixPositions = () => {
  MATRIX_X, MATRIX_Y = 0;
}

const resetColorMatrix = () => {
  colorMatrix = Array.from({ length: 15 }, () => Array(16).fill(color`2`));
}

const matrixToString = (matrix) => {
  let result = "";
  for (let row of matrix) {
    result += row.join("") + "\n";
  }
  return result.trim();
}

const matrixToColor = (colorMatrix) => {
  const array = [];
  for (let row of colorMatrix) {
    for (let col of row) {
      array.push(col);
    }
  }
  return array;
}

const saveFile = (num) => {
  MATRIX_SAVES[num] = matrixToString(matrix);
  MATRIX_COLOR[num] = matrixToColor(colorMatrix);
}

const loadFile = (num) => {
  matrix = stringToMatrix(MATRIX_SAVES[num]);
  colorMatrix = stringToMatrix(MATRIX_COLOR[num]);
}

const createText = (text, x, y, color) => {
  addText(text, { x: x, y: y, color: color });
};

onInput("w", () => { handleInput("w"); });
onInput("a", () => { handleInput("a"); });
onInput("s", () => { handleInput("s"); });
onInput("d", () => { handleInput("d"); });
onInput("i", () => { handleInput("i"); });
onInput("j", () => { handleInput("j"); });
onInput("k", () => { handleInput("k"); });
onInput("l", () => { handleInput("l"); });

setInterval(function() {
  createScreens(currentScreen);
}, 30);

setBackground(BACKGROUND_BLACK);
createText("Loading...", 5, 8, color`2`);
setMap(levels[level]);