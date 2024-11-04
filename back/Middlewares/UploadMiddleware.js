const multer = require('multer');
const path = require('node:path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = path.join(__dirname, '../uploads/profilePictures/');
    fs.mkdirSync(uploadPath, { recursive: true });
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;