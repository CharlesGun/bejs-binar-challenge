const express = require('express');
const router = express.Router();
const controller = require('../controllers');

// history
router.post('/create', controller.history.createRecord);
router.get('/all', controller.history.getAll);
router.get('/detail/:id', controller.history.detailRecord);
router.patch('/changehistory/:id', controller.history.updateRecord);
router.delete('/delete/:id', controller.history.deleteRecord);

module.exports = router;