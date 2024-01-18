const { stdout, stdin } = process;
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const encoding = 'utf-8';

fs.writeFile(filePath, '', (err) => {
  if (err) {
    stdout.write(err);
  }
});

stdout.write('Hello! File was created. Please, provide your input\n');

function customExit() {
  stdout.write('Thank you for your input. Goodbye!\n');
  process.exit();
}

stdin.setEncoding(encoding);
stdin.on('data', (data) => {
  if (data.trim() === 'exit') {
    customExit();
  } else {
    fs.appendFile(filePath, data, (err) => {
      if (err) {
        stdout.write(err);
      }
    });
  }
});

process.on('SIGINT', () => {
  customExit();
});
