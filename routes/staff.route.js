const express = require('express');
const router = express.Router();

// Connect Multer library to upload images
const multer = require('multer');
const upload = multer();
const uploadCloud = require("../middlewares/uploadCloud.middleware");

const controller = require("../controller/staff.controller");

router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create', upload.single('avatar'), uploadCloud.upload, controller.createPost);

module.exports = router;