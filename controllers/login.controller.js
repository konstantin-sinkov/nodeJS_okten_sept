const users = require('../db/users');
const error = require('../db/error');

class LoginController {
    renderLogin(req, res) {
        res.render('login');
    }
    
    addLoggedUser({body}, res) {
        if (users.some(user => user.email === body.email)) {
            error = 'This email is already used!'
            res.redirect('errorPage');
            return;
        }
        users.push({...body, id: users.length > 0 ? users.length + 1 : 1});
        res.redirect('/users');
    }
}

module.exports = new LoginController();