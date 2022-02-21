const {Router} = require('express');
const {renderLogin, addLoggedUser} = require('../controllers/login.controller');
const isLoginDataValid = require('../middleware/isLoginDataValid');

const loginRouter = Router();

loginRouter.get('/', renderLogin);
loginRouter.post('/', isLoginDataValid, addLoggedUser);

module.exports = loginRouter;

