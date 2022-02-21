const {Router} = require('express');
const {renderUsers, renderUserById, deleteUserById} = require('../controllers/user.controller');

const userRouter = Router();

userRouter.get('/', renderUsers);
userRouter.get('/:id', renderUserById);
userRouter.post('/:id', deleteUserById);

module.exports = userRouter;

