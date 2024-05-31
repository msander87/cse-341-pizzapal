const passport = require('passport');

const router = require('express').Router();
router.use(
    // #swagger.ignore = true
    '/',
    require('./swagger'));

router.use('/user', require('./user'));
router.use('/order', require('./order'));
router.use('/menu', require('./menu'));

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        isAuthenticated: req.session.user ? true : false
    });
});

router.get(
    // #swagger.ignore = true
    '/login',
    passport.authenticate('github'),
    (req, res) => {});

router.get(
    // #swagger.ignore = true
    '/logout',
    function (req, res, next) {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    });

module.exports = router;