const express = require('express');
const router = express.Router();

const articleRoutes = require('../controllers/article');

router.post('/', articleRoutes.createArticle)
    ;


async function userMiddleware (req, res, next) {
    try {
        const token = req.headers['Authorization'];

        const userId = util.getUserIdByToken(token);

        const user = util.extractUser(userId);
        req.user;
        next();
    } catch (error) {
        throw error;
    }
}

router
    .put('/:articleId', userMiddleware, articleRoutes.updateArticle)
    .delete('/:articleId', articleRoutes.deleteArticle)

module.exports = router;
