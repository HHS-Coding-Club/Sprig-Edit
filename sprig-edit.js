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
    PATCH: 4,
  },
  VERSION_NAME: "Phantom"
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
................`,                    // Text Editor
]

function setCharacter() {

}

setMap(levels[level])

setPushables({
  [ player ]: []
})


afterInput(() => {
  
})
