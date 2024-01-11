const { Admin, Course } = require('../db');
const { adminSchemaValidator, adminExists, adminMiddleware } = require('../middleware/admin.js');
const { Router } = require("express");
const jwt = require('jsonwebtoken');
const router = Router();

// Admin Routes
router.post('/signup', adminSchemaValidator, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // checking if username already exists else add to database
    const userExists = await Admin.findOne({ username: username });
    if (userExists) {
        return res.status(400).json({
            msg: "Username already exists"
        });
    } else {
        try {
            await Admin.create({
                username: username,
                password: password
            });
            res.status(200).json({
                msg: "Admin created successfully"
            });

        } catch (err) {
            res.status(400).json({
                msg: "Error creating admin"
            });
        }
    }
});


router.post('/signin', adminSchemaValidator, adminExists, (req, res) => {

    const token = jwt.sign({username: req.body.username}, process.env.JWT_SECRET_TOKEN);
    res.status(200).json({
        msg: "Admin signed in successfully",
        token: token
    });

});

router.post('/courses', adminMiddleware, async (req, res) => {

    try {
        await Course.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            imageLink: req.body.imageLink
        });

        res.status(200).json({
            msg: "Course added successfully"
        });

    } catch (err) {
        res.status(400).json({
            msg: "Error adding course"
        });
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    
        try {
            const courses = await Course.find();
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

module.exports = router;