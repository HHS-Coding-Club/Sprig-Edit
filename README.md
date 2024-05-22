# Sprig-Edit

This is Sprig Edit, a simple text editor for the Sprig, a handheld console created by Hack Club. It is written in JavaScript, and uses common design patterns to create a simple, yet powerful text editor.

## Features

- **Simple Interface**: Sprig Edit has a simple interface, with a single text area for editing text.
- **Save and Load**: Sprig Edit can save and load files.
- **Customizable**: Sprig Edit's background color can be customized with 3 different shades.
- **Controls**: Since the Sprig has only 8 buttons, Sprig Edit uses a combination of buttons to provide a full set of controls.

### Controls

AD - Move Cursor
JL - Change Character
I  - Place Character
K  - Remove Character
S  - Space
W  - Change Color

### Development

The current completed version of Sprig Edit will always be the `./sprig-edit.js` file. The `./src` directory contains the source code for the editor, which is split into multiple files for better organization.

To build the editor, run `npm run build`. This will compile the source code into a single file, which can be used on the Sprig.

### Feature Requests

Since Sprig-Edit is still in development, and is rapidly changing, feature requests are welcome. If you have a feature request, please open an issue on this repository.

### License

Sprig Edit is licensed under the Apache 2.0 License. You can view the license in the `./LICENSE` file.

### Credits

Sprig Edit was created by @Colack, with help from many others. The Sprig is a project by Hack Club, and the Sprig Edit project is not affiliated with Hack Club.

Introducing Sprig-Edit, a simple text editor for Sprig. Sprig-Edit supports 56 different characters, and also supports color. It uses a 16x15 grid to create words and sentences.

Sprig-Edit is still in development, and will be updated for the seeable future.

## Upcoming Features

Sprig-Edit has several features that are either currently in development or are planned to be included in the final release. 

- [X] File Saving
- [X] File Loading
- [X] Matrix X/Y reset
- [X] Customizable background colors
- [x] addText replaced with createText
- [X] Editor rendering put into its own function
- [ ] New version of quill pixel art
- [X] Numbers in editor
- [X] Editor displays X0 Y0 instead of just 0 0

Features will be added to this list and checked when they are finished.