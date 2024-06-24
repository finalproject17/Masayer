const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    var { authorization } = req.headers
    if (authorization) {
        jwt.verify(authorization, process.env.SECRET, function (err, decoded) {
            if (err) {
                res.status(401).json({ message: err.message });
            }
            if (decoded) {
                
                req.userName = decoded.userName;
                req.userId = decoded.userId;
                
                //req.roleId = decoded.roleId;
                next();
            }
            else {
                res.status(401).end();
            }
        })
    }
    else {
        res.status(401).end("Not Authenticated User");
    }
}

module.exports = { auth };