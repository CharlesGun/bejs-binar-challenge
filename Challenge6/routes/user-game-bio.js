const express = require('express');
const router = express.Router();
const controller = require('../controllers');

// biodata
router.post('/create', controller.biodata.createBio);
router.get('/all', controller.biodata.getAll);
router.get('/detail/:id', controller.biodata.detailBio);
router.patch('/changeemail', controller.biodata.updateEmail);
router.delete('/delete/:id', controller.biodata.deleteBio);

module.exports = router;