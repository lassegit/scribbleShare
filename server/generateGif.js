const path = require('path');
const { exec } = require('child_process');

function generateGif(folderName) {
  const imageFolder = path.join(__dirname, `/public/${folderName}`);
  const command = 'convert -delay 50 -loop 0 *.png animated.gif';

  return new Promise((resolve, reject) => {
    exec(command, { cwd: imageFolder }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(stdout);
    });
  });
}

module.exports = generateGif;
