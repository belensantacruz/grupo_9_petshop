function adminMiddleware(req, res, next) {
    if (req.session.loggedUser && !req.session.loggedUser.isadmin)
        res.redirect('/users/profile') ;
    if (!req.session.loggedUser)
        res.redirect('/');
    next();
}
module.exports = adminMiddleware;