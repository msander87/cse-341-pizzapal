const mongodb = require("../data/database");

const authorize = async (req, res, next) => {
    const access = await mongodb
        .getDatabase()
        .db()
        .collection("user")
        .findOne({ oauth_id: req.session.user.id });
    
    return access.type;
}

module.exports = authorize;