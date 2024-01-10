## Create course selling website backend using NodeJS, ExpressJS and MongoDB

### Description

Admins are allowed to sign up, create courses.
Users are allowed to sign up, view courses, purchase courses.
This in the real world would translate to an app like udemy.

This one doesn't use authentication the right way.
This is the reason why this assignment doesn't have a sign in route.
Input validation not done, ideally should use library like zod to do it and try to put all awaits in try catch blocks easier to debug.

- GET /users/purchasedCourses
  Description: Lists all the courses purchased by the user.
  Input: Headers: { 'username': 'username', 'password': 'password' }
  Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }