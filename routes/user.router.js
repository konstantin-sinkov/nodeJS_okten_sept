const {Router} = require('express');
const users = require('../db/users');

const userRouter = Router();

userRouter.get('/', ({query}, res) => {
    if (!query.age && !query.city) {
        res.render('users', {users});
        return;
    }
    let filteredUsers = [];
    filteredUsers = users.filter(user =>
        user.age === query.age &&
        user.city === query.city
    );
    res.render('users', {users: filteredUsers});
})

userRouter.get('/:id', ({params}, res) => {
    const {id} = params; //catch the id in req.params which we type in url
    res.render('user', {user: users[+id - 1]});
})

userRouter.post(':id', ({params}, res) => {
    const {id} = params;
    users = users.splice(id - 2, 1);
    res.redirect('/users');
})

module.exports = userRouter;

