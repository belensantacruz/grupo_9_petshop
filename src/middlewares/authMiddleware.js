function authMiddleware(req, res, next) {
    if(!req.session.loggedUser)
    {
        res.redirect('/users/login');
        res.locals.isLogged = false;
    }
    else
    {
        res.locals.isLogged = true;
        res.locals.loggedUser = req.session.loggedUser;
    }
    next();
}

module.exports = authMiddleware;