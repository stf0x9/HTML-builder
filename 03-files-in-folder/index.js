const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, objects) => {
  if (err) {
    stdout.write(err);
  }

  objects.forEach((object) => {
    const objectPath = path.join(folderPath, object.name);

    fs.stat(objectPath, (statErr, stats) => {
      if (statErr) {
        stdout.write(err);
      }
      if (stats.isFile()) {
        const fileInfo = path.parse(objectPath);
        const statsSize = stats.size;

        const fileName = fileInfo.name;
        const fileExt = fileInfo.ext.slice(1);
        const fileSizeKB = `${(statsSize / 1024).toFixed(2)}kb`;

        const outputStr = `${fileName} - ${fileExt} - ${fileSizeKB}\n`;

        stdout.write(outputStr);
      }
    });
  });
});
