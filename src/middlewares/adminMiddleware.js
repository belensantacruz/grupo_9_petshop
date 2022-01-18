function adminMiddleware(req, res, next) {
    if (req.session.loggedUser && !req.session.loggedUser.isadmin)
        res.redirect('/users/profile') ;
    else
        res.redirect('/');
    next();
}
module.exports = adminMiddleware;