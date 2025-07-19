const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const uploadController = require('../controller/uploadController.js');

router.get('/upload', uploadController.getUploadPage);
router.post('/capture', upload.single('image'), uploadController.handleImageUpload);
router.get('/images', uploadController.getImages);

module.exports = router;
