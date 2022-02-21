const { Router } = require('express');
const userRouter = require('./user.router');
const loginRouter = require('./login.router');
const signInRouter = require('./signIn.router');
const errorPageRouter = require('./error.router');

const routes = Router();

//apply userRouter to all routes which starts with '/users'
routes.use('/users', userRouter);
routes.use('/login', loginRouter);
routes.use('/signIn', signInRouter);
routes.use('/errorPage', errorPageRouter);
routes.use((req, res) => {
    res.render('notFound');
})

module.exports = routes;