/*
@title: Sprig-Edit
@author: Colack
@tags: ['utility']
@img: ""
@addedOn: 2024-04-30

This is Sprig-Edit, a basic text editor for Sprig.

Characters: a-z A-Z ! . ? , (56 Characters)

Controls:
AD - Move Cursor
JL - Change Character
I - Place Character
K - Delete Character
S - Space
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
    MINOR: 2,
    PATCH: 1,
  },
  VERSION_NAME: "Reborn"
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

function changeCharacter() {
  if (currentCharacter >= 1 && currentCharacter <= 56) {
    if (currentCharacter <= 26) {
      currentHeldCharacter = String.fromCharCode(currentCharacter + 96);
    } else if (currentCharacter <= 52) {
      currentHeldCharacter = String.fromCharCode(currentCharacter + 64 - 26);
    } else {
      switch (currentCharacter) {
        case 53:
          currentHeldCharacter = "!";
          break;
        case 54:
          currentHeldCharacter = ".";
          break;
        case 55:
          currentHeldCharacter = "?";
          break;
        case 56:
          currentHeldCharacter = ",";
          break;
      }
    }
  }
}

function changeTextColor() {
  switch (currentColor) {
    case 0:
      textColor = color`3`;
      break;
    case 1:
      textColor = color`9`;
      break;
    case 2:
      textColor = color`6`;
      break;
    case 3:
      textColor = color`4`;
      break;
    case 4:
      textColor = color`7`;
      break;
    case 5:
      textColor = color`2`;
      break;
  }
}

function createScreens(screen) {
  clearText();
  switch (screen) {
    case 0: // Title Screen
      createMenuTitle(5, "Sprig Edit");

      addText(`v${SPRIG_EDIT.VERSION.MAJOR}.${SPRIG_EDIT.VERSION.MINOR}.${SPRIG_EDIT.VERSION.PATCH}`, { x: 7, y: 4, color: color`2`, });
      addText("Press S To", { x: 5, y: 7, color: color`2`, });
      addText("Start", { x: 8, y: 9, color: color`2`, });
      addText("Colack 2024", { x: 2, y: 15, color: color`2` });

      break;
    case 1: // Main Menu
      createMenuTitle(4, "Menu Options");

      addText("W - ChangeLog", { x: 2, y: 3, color: color`2` });
      addText("A - Credits", { x: 2, y: 4, color: color`2` });
      addText("S - Examples", { x: 2, y: 5, color: color`2` });
      addText("D - About", { x: 2, y: 6, color: color`2` });

      addText("I - New File", { x: 2, y: 8, color: color`2` });
      addText("J - Controls", { x: 2, y: 9, color: color`2` });
      addText("K - Guide", { x: 2, y: 10, color: color`2` });
      addText("L - Load File", { x: 2, y: 11, color: color`2` });

      break;
    case 2: // Editor
      loadMatrix();

      addText("Color", { x: 2, y: 15, color: textColor });
      addText(currentHeldCharacter, { x: 8, y: 15, color: color`2` });
      addText(`X${MATRIX_X}`, { x: 10, y: 15, color: color`2` });
      addText(`Y${MATRIX_Y}`, { x: 14, y: 15, color: color`2` });
      break;
    case 3: // Credits
      createMenuTitle(6, "Credits");
      addText("By: Jack S.", { x: 2, y: 3, color: color`2` });
      addText("Testers:", { x: 2, y: 5, color: color`2` });
      addText("- Joe", { x: 2, y: 6, color: color`2` });
      addText("- Nat", { x: 2, y: 7, color: color`2` });
      addText("- Trent", { x: 2, y: 8, color: color`2` });
      addText("- Jared", { x: 2, y: 9, color: color`2` });
      addText("- Phin", { x: 2, y: 10, color: color`2` });
      addText("Thanks for using", { x: 2, y: 14, color: color`2` });
      addText("Sprig Edit", { x: 5, y: 15, color: color`2` });

      break;
    case 4: // Changelog
      createMenuTitle(5, "Change Log");
      addText(`Sprig-Edit ${SPRIG_EDIT.VERSION.MAJOR}.${SPRIG_EDIT.VERSION.MINOR}.${SPRIG_EDIT.VERSION.PATCH}`, { x: 2, y: 2, color: color`2` });
      addText(`${SPRIG_EDIT.VERSION_NAME} Update`, { x: 2, y: 3, color: color`2` });
      addText("Added:", { x: 2, y: 5, color: color`2` });
      addText("- Examples", { x: 2, y: 6, color: color`2` });
      addText("- Saving", { x: 2, y: 7, color: color`2` });
      addText("- Loading", { x: 2, y: 8, color: color`2` });
      addText("- Upd. Menus", { x: 2, y: 9, color: color`2` });
      addText("- Sprig Guide", { x: 2, y: 10, color: color`2` });
      addText("- Fixed Controls", { x: 2, y: 11, color: color`2` });

      break;
    case 5: // Controls
      createMenuTitle(6, "Controls");

      addText("AD - Move Cursor", { x: 2, y: 2, color: color`2`, });
      addText("JL - Change Char", { x: 2, y: 3, color: color`2`, });
      addText("I  - Place Char", { x: 2, y: 4, color: color`2`, });
      addText("K  - Remove Char", { x: 2, y: 5, color: color`2`, });
      addText("S  - Space", { x: 2, y: 6, color: color`2`, });
      addText("W  -", { x: 2, y: 7, color: color`2`, });
      addText("C", { x: 7, y: 7, color: color`3`, });
      addText("o", { x: 8, y: 7, color: color`9`, });
      addText("l", { x: 9, y: 7, color: color`6`, });
      addText("o", { x: 10, y: 7, color: color`D`, });
      addText("r", { x: 11, y: 7, color: color`5`, });
      addText("s", { x: 12, y: 7, color: color`H`, });
      addText("To save, go to", { x: 2, y: 9, color: color`2` });
      addText("the last line", { x: 2, y: 10, color: color`2` });
      addText("and press S!", { x: 2, y: 11, color: color`2` });

      break;
    case 6: // Examples
      createMenuTitle(6, "Examples");

      addText("W - Example Text", { x: 2, y: 3, color: color`2` });
      addText("A - Hello World!", { x: 2, y: 4, color: color`2` });
      addText("S - Lorem ipsum", { x: 2, y: 5, color: color`2` });
      addText("D - Welcome", { x: 2, y: 6, color: color`2` });

      addText("I - Thanks", { x: 2, y: 8, color: color`2` });
      addText("J - Program", { x: 2, y: 9, color: color`2` });
      addText("K - Roses", { x: 2, y: 10, color: color`2` });
      addText("L - Princess", { x: 2, y: 11, color: color`2` });

      break;
    case 7: // About
      createMenuTitle(8, "About");

      addText("Sprig Edit, a si", { x: 2, y: 3, color: color`2` });
      addText("mple text editor", { x: 2, y: 4, color: color`2` });
      addText("for Sprig.", { x: 2, y: 5, color: color`2` });
      addText("It supports 56", { x: 2, y: 7, color: color`2` });
      addText("different charac", { x: 2, y: 8, color: color`2` });
      addText("ters, and color.", { x: 2, y: 9, color: color`2` });

      addText("You can find the", { x: 2, y: 11, color: color`2` });
      addText("code at github.c", { x: 2, y: 12, color: color`2` });
      addText("om/colack/sprig-", { x: 2, y: 13, color: color`2` });
      addText("edit!", { x: 2, y: 14, color: color`2` });
      break;
    case 8:
      createMenuTitle(6, "New File");

      addText("AD - Move Cursor", { x: 2, y: 2, color: color`2`, });
      addText("JL - Change Char", { x: 2, y: 3, color: color`2`, });
      addText("I  - Place Char", { x: 2, y: 4, color: color`2`, });
      addText("K  - Remove Char", { x: 2, y: 5, color: color`2`, });
      addText("S  - Space", { x: 2, y: 6, color: color`2`, });
      addText("W  -", { x: 2, y: 7, color: color`2`, });
      addText("C", { x: 7, y: 7, color: color`3`, });
      addText("o", { x: 8, y: 7, color: color`9`, });
      addText("l", { x: 9, y: 7, color: color`6`, });
      addText("o", { x: 10, y: 7, color: color`D`, });
      addText("r", { x: 11, y: 7, color: color`5`, });
      addText("s", { x: 12, y: 7, color: color`H`, });
      addText("To save, go to", { x: 2, y: 9, color: color`2` });
      addText("the last line", { x: 2, y: 10, color: color`2` });
      addText("and press S!", { x: 2, y: 11, color: color`2` });

      addText("Press any key", { x: 2, y: 13, color: color`2` });
      addText("to Start.", { x: 2, y: 14, color: color`2` });

      break;
    case 9:
      createMenuTitle(8, "Save");

      addText("W - Slot 1", { x: 2, y: 2, color:color`2`});
      addText("A - Slot 2", { x: 2, y: 3, color:color`2`});
      addText("S - Slot 3", { x: 2, y: 4, color:color`2`});
      addText("D - Slot 4", { x: 2, y: 5, color:color`2`});

      addText("I - Slot 5", { x: 2, y: 7, color:color`2`});
      addText("J - Slot 6", { x: 2, y: 8, color:color`2`});
      addText("K - Slot 7", { x: 2, y: 9, color:color`2`});
      addText("L - Slot 8", { x: 2, y: 10, color:color`2`});

      break;
    case 10:
      createMenuTitle(8, "Load");

      addText("W - Slot 1", { x: 2, y: 2, color:color`2`});
      addText("A - Slot 2", { x: 2, y: 3, color:color`2`});
      addText("S - Slot 3", { x: 2, y: 4, color:color`2`});
      addText("D - Slot 4", { x: 2, y: 5, color:color`2`});

      addText("I - Slot 5", { x: 2, y: 7, color:color`2`});
      addText("J - Slot 6", { x: 2, y: 8, color:color`2`});
      addText("K - Slot 7", { x: 2, y: 9, color:color`2`});
      addText("L - Slot 8", { x: 2, y: 10, color:color`2`});

      break;
  }
}

function createMenuTitle(x, text) {
  addText(text, { x: x, y: 0, color: color`2` });
  addText("----------------", { x: 2, y: 1, color: color`2`, });
}

function loadMatrix() {
  for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 16; x++) {
        if (x === MATRIX_X && y === MATRIX_Y) {
          addText("/", { x: x + 2, y, color: textColor });
        } else {
          addText(matrix[y][x], { x: x + 2, y, color: colorMatrix[y][x] });
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
          matrix = stringToMatrix(SAMPLES[1]);
          resetColorMatrix();
          currentScreen = 2;
          break;
        case 8:
          matrix = stringToMatrix(SAMPLES[0]);
          resetColorMatrix();
          currentScreen = 2;
          break;
        case 9:
          MATRIX_SAVES[0] = matrixToString(matrix);
          currentScreen = 1;
          break;
        case 10:
          matrix = stringToMatrix(MATRIX_SAVES[0]);
          resetColorMatrix();
          currentScreen = 2;
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
      }
      break;
    case "s":
      switch (currentScreen) {
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
        case 3:
        case 4:
        case 5:
        case 7:
          currentScreen = 1;
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
      }
      break;
    case "j":
      switch (currentScreen) {
        case 1:
          currentScreen = 5;
          break;
        case 2:
          if (currentCharacter == 1) {
            currentCharacter = 56;
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
      }
      break;
    case "k":
      switch (currentScreen) {
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
      }
      break;
    case "l":
      switch (currentScreen) {
        case 1:
          currentScreen = 10;
          break;
        case 2:
          if (currentCharacter == 56) {
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
      }
      break;
  }
}

function stringToMatrix(text) {
  const matrix = Array.from({ length: 15 }, () => Array(16).fill(' '));
  let row = 0;
  let col = 0;

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
}

function resetMatrixPositions() {
  MATRIX_X = 0;
  MATRIX_Y = 0;
}

function resetColorMatrix() {
  colorMatrix = Array.from({ length: 15 }, () => Array(16).fill(color`2`));
}

function matrixToString(matrix) {
    let result = "";
    for (let row of matrix) {
        result += row.join("") + "\n";
    }
    return result.trim(); // Trim to remove trailing newline at the end
}

function colorMatrixToArray(colorMatrix) {
  const array = [];
  for (let row of colorMatrix) {
    for (let col of row) {
      array.push(col);
    }
  }
  return array;
}


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
addText("Loading...", { x: 5, y: 8, color: color`2` });
setMap(levels[level]);
