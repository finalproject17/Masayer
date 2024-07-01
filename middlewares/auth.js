const jwt = require('jsonwebtoken');
const { promisify } = require('util');

async function auth(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Unauthorized. You must log in first." });
    }

    try {
        const decoded = await promisify(jwt.verify)(authorization, process.env.JWT_SECRET);
        req.id = decoded.data.id;
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
    next();
}
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
};

module.exports = { auth, authenticateToken };
