const { User, Course } = require('../db');
const { userSchemaValidator, userExists, userMiddleware } = require('../middleware/user.js');
const { Router } = require("express");
const jwt = require('jsonwebtoken');
const router = Router();

// User Routes
router.post('/signup', userSchemaValidator, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // checking if username already exists else add to database
    const userExists = await User.findOne({ username: username });
    if (userExists) {
        return res.status(400).json({
            msg: "Username already exists"
        });
    } else {
        try {
            await User.create({
                username: username,
                password: password
            });
            res.status(200).json({
                msg: "User created successfully"
            });

        } catch (err) {
            res.status(400).json({
                msg: "Error creating user"
            });
        }
    }
});

router.post('/signin', userSchemaValidator, userExists, (req, res) => {

    const token = jwt.sign({username: req.body.username}, process.env.JWT_SECRET_TOKEN);
    res.status(200).json({
        msg: "User signed in successfully",
        token: token
    });

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const username = req.username; // username is set in userMiddleware

    const result = await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    });

    if (result) {
        res.status(200).json({
            msg: "Course purchased successfully"
        });
    } else {
        res.status(400).json({
            msg: "Error purchasing course"
        });
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const username = req.username; // username is set in userMiddleware

    const user = await User.findOne({
        username: username
    });

    try {
        const courses = await Course.find({
            _id: {
                $in: user.purchasedCourses
            }
        });
        
        res.status(200).json({
            msg: "Purchased courses fetched successfully",
            courses: courses
        });
    } catch (err) {
        res.status(400).json({
            msg: "Error fetching purchased courses"
        });
    }
});

router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json({
            msg: "Courses fetched successfully",
            courses: courses
        });
    } catch (err) {
        res.status(400).json({
            msg: "Error fetching courses"
        });
    }
});

module.exports = router