const express = require('express');
const bodyParser = require('body-parser');
const Buffer = require('buffer').Buffer;
const fs = require('fs');
const path = require('path');
const generateGif = require('./generateGif');

const app = express();
const port = 3000;

app.use('/public', express.static('./server/public'));

app.use(bodyParser.json({ limit: '50mb' }));

app.post('/generate-gif', (req, res) => {
  console.log('Received request on /generate-gif');

  const base64Images = req.body.images;
  const date = new Date();
  const folderName = date.getTime();
  const folderPath = path.join(__dirname, `/public/${folderName}`);

  if (!base64Images || base64Images.length === 0) {
    res.status(400).send('No images provided');
    return;
  }

  fs.mkdirSync(folderPath);

  base64Images.forEach((base64Image, index) => {
    const imageBuffer = Buffer.from(base64Image, 'base64');
    const zeroPaddedIndex = index.toString().padStart(2, '0');

    try {
      const imagePath = `${folderPath}/${zeroPaddedIndex}.png`;
      fs.writeFileSync(imagePath, imageBuffer);
    } catch (err) {
      console.log(err);
      res.status(500).send('Error saving image');
      return;
    }
  });

  generateGif(folderName)
    .then(() => {
      res.json({
        gif: `http://localhost:3000/public/${folderName}/animated.gif`,
        images: Array.from(Array(base64Images.length).keys()).map(
          i =>
            `http://localhost:3000/public/${folderName}/${i
              .toString()
              .padStart(2, '0')}.png`,
        ),
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
