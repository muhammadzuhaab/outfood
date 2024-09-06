import express from 'express'
import multer from 'multer'

import {
    getuser,
    loginAccount,
    registerAccount,
    usernameAvailability,
    updateUser,
    validatePassword,
    updateUsername,
    updatePassword,
    updateAccountType,
    profileImageUpload
} from '../../controllers/user/authController.js';

import {
    PasswordValidation,
    UdpateUserValidation,
    loginValidation,
    passwordUpdateValidation,
    registerValidation,
    usernameUpdateValidation,
    usernameValidation
} from '../../middleware/expressValidations.js';

import {
    userTokenValidation
} from '../../middleware/jwtVerification.js';

const routes = express.Router();
const upload = multer({ dest: '../../uploads/' });

routes.get('/getuser',userTokenValidation, getuser);
routes.post('/register',registerValidation, registerAccount);
routes.post('/login', loginValidation, loginAccount);
routes.post('/username-availability',usernameValidation, usernameAvailability);
routes.post('/update-user', [userTokenValidation, UdpateUserValidation], updateUser);
routes.post('/validate-password', [userTokenValidation, PasswordValidation], validatePassword);
routes.post('/update-username', [userTokenValidation, usernameUpdateValidation], updateUsername);
routes.post('/update-password', [userTokenValidation, passwordUpdateValidation], updatePassword);
routes.post('/update-account-type', userTokenValidation, updateAccountType);
routes.post('/upload-profile-image', [userTokenValidation, upload.single('image')], profileImageUpload);

export default routes