const isLoginDataValid = (req, res, next) => {
    try {
        const { body } = req;
        
        //at least 1 value is false => throw error
        if (Object.keys(req.body).some(key => !body[key])) {
            throw new Error('Please check carefully! Some input was not filled!');
        }
        
        //will work if won't be any error
        next();
    }  catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
}

module.exports = isLoginDataValid;