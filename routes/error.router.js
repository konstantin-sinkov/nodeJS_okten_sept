const {Router} = require('express');
const error = require('../db/error');

const errorPageRouter = Router();

errorPageRouter.get('/', (req, res) => {
    res.render('errorPage', {error});
})

module.exports = errorPageRouter;