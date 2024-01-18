const fs = require('fs');
const path = require('path');

const filesCopyPath = path.join(__dirname, 'files-copy');
const filesPath = path.join(__dirname, 'files');

fs.mkdir(filesCopyPath, { recursive: true }, (mkdirErr) => {
  if (mkdirErr) {
    console.log(mkdirErr);
    return;
  }
  fs.readdir(filesPath, (readdirErr, files) => {
    if (readdirErr) {
      console.log(readdirErr);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(filesPath, file);
      const dest = path.join(filesCopyPath, file);

      fs.copyFile(filePath, dest, (copyFileErr) => {
        if (copyFileErr) {
          console.log(copyFileErr);
          return;
        }
      });
    });
    console.log('Operation successful');
  });
});
