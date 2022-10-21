const express = require('express');
const router = express.Router();
const controller = require('../controllers');
const mid = require('../helpers/middleware');

// user
router.get('/whoami', mid.isLogin, controller.userGame.whoami);
router.get('/all', controller.userGame.getAll);
router.get('/detail/:id', controller.userGame.detailUser);
router.patch('/changepass', mid.isLogin, controller.userGame.changePass);
router.delete('/delete/:id', mid.isLogin, controller.userGame.deleteUser);

module.exports = router;