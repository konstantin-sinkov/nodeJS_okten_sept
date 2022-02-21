const {Router} = require('express');
const users = require('../db/users');
const error = require('../db/error');

const signInRouter = Router();

signInRouter.get('/', (req, res) => {
    res.render('signIn.hbs');
})

signInRouter.post('/', ({body}, res) => {
    let signedUser = {};
    if (users.some(user =>
        user.email === body.email &&
        user.password === body.password
    )) {
        signedUser = users.find(user =>
            user.email === body.email &&
            user.password === body.password
        );
        res.redirect(`/users/${signedUser.id}`);
        return;
    }
    error = 'Wrong email or password!'
    res.redirect('errorPage');
})

module.exports = signInRouter;