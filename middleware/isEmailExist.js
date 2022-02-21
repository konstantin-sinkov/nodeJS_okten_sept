const users = require('../db/users');

const isEmailExist = (req, res, next) => {
    try {
        const {email} = req.body;
        console.log(email);
    
        if (!users.some(user => email === user.email)) {
            throw new Error('User with this email address not found!')
        }
    
        next();
    } catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
}

module.exports = isEmailExist;