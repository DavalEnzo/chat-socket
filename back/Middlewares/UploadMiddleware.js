const multer = require('multer');
const path = require("node:path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../uploads/profilePictures"));
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

//   const upload = multer({ storage :storage }); OR
const upload = multer({ storage });

module.exports = upload;