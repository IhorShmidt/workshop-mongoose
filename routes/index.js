const userRoutes = require('./user.route');
const articleRoutes = require('./article.route');
const express = require('express');
const {badRequest} = require("../config/errorHelper");
const router = express.Router();



router.use('/user',
    // authMiddleware,
    // isProMiddleware,

    userRoutes);
router.use('/article', articleRoutes);

module.exports = router;
