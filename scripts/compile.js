import fs from 'fs';
import path from 'path';

const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, `../dist`);

fs.readdir(srcDir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const filteredFiles = files.filter((file) => file !== 'index.js');

  const content = filteredFiles.map((file) => {
    return fs.readFileSync(path.join(srcDir, file), 'utf8');
  });

  fs.writeFile(path.join(distDir, 'bundle.js'), content.join('\n'), (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Compilation completed successfully!');
  });
});