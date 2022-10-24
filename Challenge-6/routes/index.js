const express = require('express');
const router = express.Router();
const auth = require('./auth');
const user = require('./user-game');
const bio = require('./user-game-bio');
const history = require('./user-game-history')

router.use('/user', auth);
router.use('/user', user);
router.use('/bio', bio);
router.use('/history', history);

module.exports = router;