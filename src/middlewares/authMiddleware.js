function authMiddleware(req, res, next) {
    if(!req.session.loggedUser)
    {
        res.redirect('/users/login');
    }
    next();
}

module.exports = authMiddleware;