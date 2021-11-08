const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article');

router
    .post('/', articleController.createArticle)
    .get('/', articleController.getArticles);
router
    .put('/:articleId', articleController.updateArticle)


module.exports = router;
