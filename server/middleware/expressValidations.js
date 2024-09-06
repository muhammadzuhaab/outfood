import { body } from 'express-validator'

export const registerValidation = [
    body('SignupName').trim().notEmpty().withMessage('Name Field is required!'),

    body('SignupContact').trim().notEmpty().withMessage('Contact Field is required!'),
        

    body('SignupEmail').trim().notEmpty().withMessage('Email Field is required!')
        .isEmail().withMessage('Enter a valid email!'),

    body('SignupID').trim().isLength({ min: 6 }).withMessage('Username has minimum 6 character!'),

    body('SignupPassword').trim()
        .isLength({ min: 8 }).withMessage('Paassword has minimum 8 character!')
];

export const usernameUpdateValidation = [
    body('UpdatedUsername').trim().isLength({ min: 6 }).withMessage('Invalid Length!'),
];

export const usernameValidation = [
    body('SignupID').trim().isLength({ min: 6 }).withMessage('Invalid Length!'),
];

export const loginValidation = [
    body('LoginID').trim().isLength({ min: 6 }).withMessage('Username has minimum 6 character!'),

    body('LoginPassword').trim()
        .isLength({ min: 8 }).withMessage('Paassword has minimum 8 character!')
];

export const UdpateUserValidation = [

    body('ProfileEditName').trim().notEmpty().withMessage('Name Field is required!'),

    body('ProfileEditEmail').trim().notEmpty().withMessage('Email Field is required!')
        .isEmail().withMessage('Enter a valid email!'),

];

export const passwordUpdateValidation = [
    body('ValidatePassword').trim()
        .isLength({ min: 8 }).withMessage('Paassword has minimum 8 character!')
];
export const PasswordValidation = [
    body('ValidatePassword').trim()
        .isLength({ min: 8 }).withMessage('Paassword has minimum 8 character!')
];
