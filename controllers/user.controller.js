let users = require('../db/users');

class UserController {
    
    renderUsers({query}, res) {
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
    }
    
    renderUserById({params}, res) {
        const {id} = params; //catch the id in req.params which we type in url
        res.render('user', {user: users[+id - 1]});
    }
    
    deleteUserById({params}, res) {
        const {id} = params;
        users = users.splice(id - 2, 1);
        res.redirect('/users');
    }
}

module.exports = new UserController();