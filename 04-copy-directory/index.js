const fs = require('fs');
const path = require('path');

const filesCopyPath = path.join(__dirname, 'files-copy');
const filesPath = path.join(__dirname, 'files');

fs.access(filesCopyPath, (noAccess) => {
  if (noAccess) {
    addCopy();
    return;
  } else {
    fs.rm(filesCopyPath, {recursive: true}, (rmErr) => {
      if (rmErr) {
        console.error(rmErr);
        return;
      }
      addCopy();
      return;
    })
  }
})

function addCopy() {
  fs.mkdir(filesCopyPath, { recursive: true }, (mkdirErr) => {
    if (mkdirErr) {
      console.error(mkdirErr);
      return;
    }
    fs.readdir(filesPath, (readdirErr, files) => {
      if (readdirErr) {
        console.error(readdirErr);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join(filesPath, file);
        const dest = path.join(filesCopyPath, file);

        fs.copyFile(filePath, dest, (copyFileErr) => {
          if (copyFileErr) {
            console.error(copyFileErr);
            return;
          }
        });
      });
      console.log('Operation successful');
    });
  });
}


