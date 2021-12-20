function guestMiddleware(req, res, next) {
    if(req.session.loggedUser)
        res.redirect('/users/profile');
    next();
}
module.exports = guestMiddleware;