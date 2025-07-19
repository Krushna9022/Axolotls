const path = require('path');
const fs = require('fs');

exports.getUploadPage = (req, res) => {
  res.render('upload');
};

exports.handleImageUpload = (req, res) => {
  if (!req.file) return res.status(400).send('No image uploaded');
  res.status(200).send('Image uploaded successfully');
};

exports.getImages = (req, res) => {
  const imagesDir = path.join(__dirname, '../../public/uploads');
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).send('Failed to read images directory.');
    }
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    res.render('images', { images: imageFiles });
  });
};
