const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const {badRequest} = require("../config/errorHelper");


const authMiddleware =  async (req, res, next) => {
    try {
        const token = req.params.token;
        const userId = await validateToken(token)

        const user = await User.findById(userId)
        req.user = user;
        next()
    } catch (error) {
        next(error)
    }
}
const isProMiddleware = (req, res, next) => {
    const user = req.user;
    if (user.planType === 'free') {
        throw badRequest('it is a pro feature')
    }
    next()
}

router.post('/',
    authMiddleware,
    isProMiddleware,
    userController.createUser);

module.exports = router;
