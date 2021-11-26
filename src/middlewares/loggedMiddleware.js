function loggedMiddleware (req, res, next) {
res.locals.isLogged = false;
//    if(req.session && req.session.loggedUser) {
//        res.locals.isLogged = true;
//    }

    next();
}

module.exports = loggedMiddleware;