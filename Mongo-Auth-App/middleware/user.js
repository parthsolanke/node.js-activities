const { User } = require('../db');
const zod = require('zod');
const jwt = require('jsonwebtoken');

const userSchema = zod.object({
    username: zod.string(),
    password: zod.string().min(6).max(20)
});

function userSchemaValidator(req, res, next) {
    // validating the schema
    try {
        userSchema.parse(req.body);
        next();
    } catch (err) {
        res.status(422).json({
            msg: "Invalid data"
        });
    }
}

async function userExists(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    // checking if the user exists in the database
    const user = await User.findOne({ username: username, password: password });
    if (user) {
        next();
    } else {
        res.status(401).json({
            msg: "Invalid credentials"
        });
    }

}

// Middleware for handling auth
async function userMiddleware(req, res, next) {
    const jwtToken = req.headers.authorization.split(" ")[1];

    // verifying the jwt token
    try {
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_TOKEN);
        const user = await User.findOne({ username: decoded.username });
        if (user) {
            req.username = decoded.username; // setting the username in the request object to pass it to the next middleware
            next();
        }
    } catch (err) {
        res.status(401).json({
            msg: "Invalid credentials"
        });
    }
}

module.exports = {
    userSchemaValidator,
    userExists,
    userMiddleware
};