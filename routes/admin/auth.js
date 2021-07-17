const express                       =   require('express');
const usersRepo                     =   require('../../repositories/users');
const { handleErrors }                          =   require('./middlewares');
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
    handleErrors(signUpTemplate)
], async (req, res) => {

    const { email, password } = req.body;
    const user = await usersRepo.create({ email, password });

    req.session.userId = user.id;
    res.redirect('/admin/products');
});

router.get('/signout', (req, res) => {
    req.session = null;
    res.redirect('/signin');
});

router.get('/signin', (req, res) => {
    res.send(signInTemplate({}));
});

router.post('/signin', [
    emailExists,
    passwordExists,
    handleErrors(signInTemplate),
], async (req, res) => {

    const { email } = req.body;
    const user = await usersRepo.getOneBy({ email });

    req.session.userId = user.id;
    res.redirect('/admin/products');

});

module.exports = router;
