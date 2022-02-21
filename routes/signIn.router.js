const {Router} = require('express');
const isEmailExist = require('../middleware/isEmailExist');


const {renderSignIn, userSignIn} = require('../controllers/signIn.controller');

const signInRouter = Router();

signInRouter.get('/', renderSignIn);
signInRouter.post('/', isEmailExist, userSignIn);

module.exports = signInRouter;