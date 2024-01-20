const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const distFolderPath = path.join(__dirname, 'project-dist');

const stylesPath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');

const stylesBundlePath = path.join(distFolderPath, 'styles.css');
const assetsBundleFolderPath = path.join(distFolderPath, 'assets');

async function bundle() {
  await createDistFolder();
  await bundleCSS();
  await copyAssets();
  console.log('Bundle complete!');
}

bundle();

async function createDistFolder() {
  await fsPromises.rm(distFolderPath, { recursive: true, force: true });
  await fsPromises.mkdir(distFolderPath);
}

async function bundleCSS() {
  const files = await fsPromises.readdir(stylesPath, { withFileTypes: true });
  await copyPasteToBundle(files, stylesPath, stylesBundlePath);
  console.log('css bundle finished');
}

async function copyPasteToBundle(files, from, targetFile) {
  files.forEach((file) => {
    const filePath = path.join(from, file.name);
    fs.readFile(filePath, { encoding: 'utf-8' }, (readFileErr, data) => {
      if (readFileErr) {
        console.error(readFileErr);
        return;
      }
      fs.writeFile(targetFile, data, { flag: 'a' }, (writeFileErr) => {
        if (writeFileErr) {
          console.error(writeFileErr);
          return;
        }
      });
    });
  });
}

async function copyAssets() {
  await fsPromises.mkdir(assetsBundleFolderPath);

  const objects = await fsPromises.readdir(assetsPath, {
    recursive: true,
    withFileTypes: true,
  });
  const directories = objects.filter((obj) => obj.isDirectory());
  const files = objects.filter((obj) => obj.isFile());

  await createDirectories(directories);
  await copyFiles(files);

  console.log('assets bundle finished');
}

async function createDirectories(directories) {
  for (let directory of directories) {
    const dirPath = path.join(assetsBundleFolderPath, directory.name);
    fsPromises.mkdir(dirPath);
  }
}

async function copyFiles(files) {
  for (let file of files) {
    const filePath = path.join(file.path, file.name);
    const baseDir = path.parse(file.path).base;
    const targetFilePath = path.join(
      assetsBundleFolderPath,
      baseDir,
      file.name,
    );
    fsPromises.copyFile(filePath, targetFilePath);
  }
}