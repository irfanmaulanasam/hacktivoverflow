const token = require('../helpers/token');

module.exports = {
    tokencheck: function (req, res, next) {
        console.log(req.headers);
        
        if (!req.headers.token) {
            res.status(401).json({ msg: `please provide jwt token` })
        } else {
            token.verify(req.headers.token, process.env.JWT_SECRET, function (err, decoded) {
                if (err) {
                    console.log(err);
                    res.status(401).json({ msg: `jwt malformed`, err: err })
                } else {
                    req.decoded = decoded
                    next()
                }
            })
        }
    }
};
