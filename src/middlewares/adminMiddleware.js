function adminMiddleware(req, res, next) {
    if (req.session.loggedUser && !req.session.loggedUser.isadmin)
        res.redirect('/users/profile') ;
    next();
}
module.exports = adminMiddleware;