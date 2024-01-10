const { User } = require("../db/index");

async function userMiddleware(req, res, next) {
    // checking if the user exists in the database
    const username = req.headers.username;
    const password = req.headers.password;

    const does_exist = await User.findOne({
        username: username,
        password: password
    });

    if (does_exist) {
        console.log("Middleware passed, user authorized");
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
}

module.exports = userMiddleware;