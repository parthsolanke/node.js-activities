const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb+srv://parthsolanke:" + process.env.MONGO_PW + "@cluster0.u7lcir4.mongodb.net/courses-app")
    .then(() => {
        console.log("Connected to Database");
    })
    .catch(err => {
        console.log("Error connecting to Database", err);
    });

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    }
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    purchasedCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ]
});

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    imageLink: {
        type: String,
        required: true
    },
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}