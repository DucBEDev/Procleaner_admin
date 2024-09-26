const express = require('express');
const router = express.Router();

const controller = require("../controller/costFactor.controller");

router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create', controller.createPost);
router.get('/edit/:id', controller.edit);
router.patch('/edit/:id', controller.editPatch);
router.delete('/delete/:id', controller.deleteItem);
router.patch("/change-status/:status/:id", controller.changeStatus);

module.exports = router;