const express                       =   require('express');
const usersRepo                     =   require('../../repositories/users');
const { validationResult }          =   require('express-validator');
const signUpTemplate                =   require('../../views/admin/auth/signup');
const signInTemplate                =   require('../../views/admin/auth/signin');
const { requireEmail,
        requirePassword,
        passwordConfirmation,
        emailExists,
        passwordExists,
      }                             =   require('./validators');

const router = express.Router();


router.get('/signup', (req, res) => {
    res.send(signUpTemplate({ req }));
});

router.post('/signup', [
    requireEmail,
    requirePassword,
    passwordConfirmation,
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.send(signUpTemplate({ req, errors }));
    }

    const { email, password } = req.body;
    const user = await usersRepo.create({ email, password });

    req.session.userId = user.id;
    res.send('Account created!!!');
});

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('you are logged out');
});

router.get('/signin', (req, res) => {
    res.send(signInTemplate({}));
});

router.post('/signin', [
    emailExists,
    passwordExists,
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.send(signInTemplate({ errors }))
    }

    const { email } = req.body;
    const user = await usersRepo.getOneBy({ email });

    req.session.userId = user.id;
    res.send('You Are Sign In');

});

module.exports = router;
