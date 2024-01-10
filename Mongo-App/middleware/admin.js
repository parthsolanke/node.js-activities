const { Admin } = require('../db/index');

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // checking if the user exists in the database
    const username = req.headers.username;
    const password = req.headers.password;

    const does_exist = await Admin.findOne({
        username: username,
        password: password
    });

    if (does_exist) {
        console.log("Middleware passed, admin authorized");
        next();
    } else {
        res.status(401).json({
            msg: "Unauthorized"
        });
    }
}

module.exports = adminMiddleware;