const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'project-dist');
const stylesPath = path.join(__dirname, 'styles');
const bundlePath = path.join(distPath, 'bundle.css');

fs.access(bundlePath, (noAccess) => {
  if (noAccess) {
    createBundle();
    console.log('bundle created');
  } else {
    fs.unlink(bundlePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error(unlinkErr);
        return;
      }
      createBundle();
      console.log('new bundle created');
    });
  }
});

function createBundle() {
  fs.readdir(stylesPath, { withFileTypes: true }, (readdirErr, files) => {
    if (readdirErr) {
      console.error(readdirErr);
      return;
    }

    const relevantFiles = files.filter((file) => {
      const filePath = path.join(stylesPath, file.name);
      if (file.isFile() && path.extname(filePath) === '.css') {
        return file;
      }
    });

    relevantFiles.forEach((file) => {
      const filePath = path.join(stylesPath, file.name);
      const bundlePath = path.join(distPath, 'bundle.css');

      fs.readFile(filePath, { encoding: 'utf-8' }, (readFileErr, data) => {
        if (readFileErr) {
          console.error(readFileErr);
        }

        fs.writeFile(bundlePath, data, { flag: 'a' }, (writeFileErr) => {
          if (writeFileErr) {
            console.error(writeFileErr);
          }
        });
      });
    });
  });
}