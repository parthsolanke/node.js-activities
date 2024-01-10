const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // checking if username already exists else add to database
    const user_exists = await User.findOne({ username: username });
    if (user_exists) {
        return res.status(400).json({
            msg: "Username already exists"
        });
    } else {
        const db_entry = await User.create({
            username: username,
            password: password
        });

        if (db_entry) {
            res.status(200).json({
                msg: "User created successfully"
            });
        } else {
            res.status(400).json({
                msg: "Error creating user"
            });
        }
    }
});

router.get('/courses', async (req, res) => {
    const allCourses = await Course.find({});
    res.status(200).json({
        courses: allCourses
    });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const username = req.headers.username;

    const result = await User.updateOne({
        username: username
    }, {
        "$push": { // the $push operator appends a specified value to an array
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
    const username = req.headers.username;

    const user = await User.findOne({
        username: username
    });

    const purchasedCourses = await Course.find({
        _id: {
            "$in": user.purchasedCourses // $in selects the documents where the value of a field equals any value in the specified array
        }
    });

    res.status(200).json({
        purchasedCourses: purchasedCourses
    });
});

module.exports = router