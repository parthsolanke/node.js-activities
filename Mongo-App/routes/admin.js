const { Router } = require("express"); // this is the same as: const express = require('express'); const Router = express.Router;
const { Admin, Course } = require("../db/index");
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // checking if username already exists else add to database
    const user_exists = await Admin.findOne({ username: username });
    if (user_exists) {
        return res.status(400).json({
            msg: "Username already exists"
        });
    } else {
        const db_entry = await Admin.create({
            username: username,
            password: password
        });

        if (db_entry) {
            res.status(200).json({
                msg: "Admin created successfully"
            });
        } else {
            res.status(400).json({
                msg: "Error creating admin"
            });
        }
    }

});

router.post('/courses', adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    // adding new coures to database as admin requests
    const db_entry = await Course.create({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink
    });

    if (db_entry) {
        res.status(200).json({
            msg: "Course added successfully",
            courseId: db_entry._id
        });
    } else {
        res.status(400).json({
            msg: "Error adding course"
        });
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const allCourses = await Course.find({});
    res.status(200).json({
        courses: allCourses
    });
});

module.exports = router;