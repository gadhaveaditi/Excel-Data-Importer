
const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../controllers/fileController.js');
const router = express.Router();
const cors = require('cors');
router.use(cors());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage, limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB limit


router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;
