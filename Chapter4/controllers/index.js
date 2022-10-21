const auth = require('./auth')
const userGame = require('./user-game')
const biodata = require('./user-game-biodata')
const history = require('./user-game-history')

module.exports = {
    exception: (err, req, res, next) => {
        res.render('server-error', { error: err.message });
    },
    notFound: (req, res, next) => {
        res.render('not-found');
    },
    auth,
    userGame,
    biodata,
    history
};