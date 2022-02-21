const {Router} = require('express');
const users = require('../db/users');
const error = require('../db/error');

const loginRouter = Router();

loginRouter.get('/', (req, res) => {
    res.render('login');
})

loginRouter.post('/', ({body}, res) => {
    if (users.some(user => user.email === body.email)) {
        error = 'This email is already used!'
        res.redirect('errorPage');
        return;
    }
    users.push({...body, id: users.length > 0 ? users.length + 1 : 1});
    res.redirect('/users');
})

module.exports = loginRouter;

