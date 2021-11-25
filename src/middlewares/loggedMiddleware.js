function loggedMiddleware (req, res, next) {
res.locals.isLogged = false;

next();
}

module.exports = loggedMiddleware;