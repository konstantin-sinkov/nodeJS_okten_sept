let users = require('../db/users');
let error = require('../db/error');

class SignInController {
    renderSignIn(req, res) {
        res.render('signIn');
    }
    
    userSignIn(req, res) {
        const {email, password} = req.body;
        const signedUser = users.find(user =>
            user.email === email &&
            user.password === password
        );
        
        if (signedUser) {
            res.redirect(`/users/${signedUser.id}`);
            return;
        }
        
        error = 'Wrong email or password!';
        res.redirect('errorPage');
    }
}

module.exports = new SignInController();