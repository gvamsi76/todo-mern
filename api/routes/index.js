
//  to handle the routes
const express = require('express');
const userRoute = require('./user');
const todoRoute = require('./todo');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: userRoute,
    },
    {
        path: '/todo',
        route: todoRoute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
module.exports = router;