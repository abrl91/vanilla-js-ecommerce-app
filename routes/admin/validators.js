const { check }     = require('express-validator');
const usersRepo     = require('../../repositories/users');

module.exports = {
    requireTitle: check('title')
        .trim()
        .isLength({ min: 2, max: 40 })
        .withMessage('title must be between 2 - 40 characters'),

    requirePrice: check('price')
        .trim()
        .toFloat()
        .isFloat({ min: 1 })
        .withMessage('price must be a number grater then 1'),

    requireEmail: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .custom(async (email) => {
            const existingUser = await usersRepo.getOneBy({ email });
            if (existingUser) {
                throw new Error('Email in use');
            }
        }),

    requirePassword: check('password')
        .trim()
        .isLength({ min: 8, max: 32 })
        .withMessage('Must be between 8 and 32 characters'),

    passwordConfirmation: check('passwordConfirmation')
        .trim()
        .isLength({ min: 8, max: 32 })
        .custom((passwordConfirmation, { req }) => {
            if (req.body.password !== passwordConfirmation) {
                throw new Error('Passwords must match');
            } else {
                return true;
            }
        }),

    emailExists: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must provide a valid email')
        .custom(async (email) => {
            const user = await usersRepo.getOneBy({ email });
            if (!user) throw new Error('Email not found');
        }),

    passwordExists: check('password').trim()
        .custom(async (password, { req }) => {
            const user = await usersRepo.getOneBy({ email: req.body.email })
            if (!user) throw new Error('User not found');
            const validPassword = await usersRepo.comparePasswords(
                user.password,
                password
            );
            if (!validPassword) throw new Error('Invalid Password');
        }),
}
