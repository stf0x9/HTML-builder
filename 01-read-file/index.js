const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'text.txt');
const rs = fs.createReadStream(filePath, { encoding: 'utf-8' });

rs.on('data', (chunk) => {
  process.stdout.write(chunk);
});

rs.on('error', (err) => {
  process.stdout.write(err);
});
