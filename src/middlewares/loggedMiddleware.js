const db = require('../database/models')

function loggedMiddleware (req, res, next) {
    res.locals.isLogged = false;
    
    let emailInCookie = req.cookies.userEmail;
    if(emailInCookie)
    {
        db.User.findOne({
            where: {
                email: emailInCookie
            }
        }).then((resultado) => {
            let userFromCookie = resultado;
            if(userFromCookie){
                req.session.loggedUser = userFromCookie.dataValues;
            }
            if(req.session.loggedUser){
                res.locals.isLogged = true;
                res.locals.loggedUser = req.session.loggedUser;
            }
        });
    }
    next();
}

module.exports = loggedMiddleware;