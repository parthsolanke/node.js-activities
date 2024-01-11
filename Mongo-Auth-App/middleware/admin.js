const { Admin } = require('../db');
const zod = require('zod');
const jwt = require('jsonwebtoken');

const adminSchema = zod.object({
    username: zod.string(),
    password: zod.string().min(6).max(20)
});

function adminSchemaValidator(req, res, next) {
    // validating the schema
    try {
        adminSchema.parse(req.body);
        next();
    } catch (err) {
        res.status(422).json({
            msg: "Invalid data"
        });
    }
}

async function adminExists(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    // checking if the user exists in the database
    const user = await Admin.findOne({ username: username, password: password });
    if (user) {
        next();
    } else {
        res.status(401).json({
            msg: "Invalid credentials"
        });
    }
}

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    const jwtToken = req.headers.authorization.split(" ")[1];

    // verifying the jwt token
    try {
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_TOKEN);
        const user = await Admin.findOne({ username: decoded.username });
        if (user) {
            next();
        }
    } catch (err) {
        res.status(401).json({
            msg: "Invalid credentials"
        });
    }
}

module.exports = {
    adminSchemaValidator,
    adminExists,
    adminMiddleware
}
