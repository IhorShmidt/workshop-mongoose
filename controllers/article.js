'use strict';

const _ = require('lodash');
const utilError = require("../config/errorHelper");
const Article = require('../models/article')

module.exports = {
    createArticle,
    updateArticle,
    deleteArticle
};

async function createArticle(req, res, next) {

    const fields = [
        'title',
        'description',
        'owner',
    ];

    const body = req.body;
    const newArticle = _.pick(body, fields);

    try {
        const existingArticle = await Article.findOne({title: body.title})
        if (existingArticle) {
            throw utilError.badRequest('Article exists');
        }
        const article = new Article(newArticle);
        await article.save();
        return res.status(200).json(article);
    } catch (err) {
        console.log(err);
        next(err);
    }

}


async function updateArticle(req, res, next) {
    const articleId = req.params.articleId;
    const body = req.body;

    try {
        const existingArticle = await Article.findOne({_id: articleId});
        if (!existingArticle) {
            throw utilError.badRequest('Article not exists');
        }

        if (body.title) {
            existingArticle.title = body.title;
        }
        if (body.description || body.description === '') {
            existingArticle.description = body.description;
        }

        await existingArticle.save();

        // await Article.findByIdAndUpdate(articleId, {})

        return res.status(200).json(existingArticle);
    } catch (err) {
        console.log(err);
        next(err);
    }
}


async function deleteArticle(req, res, next) {

    const articleId = req.params.articleId;

    try {

        const result = await Article.findByIdAndDelete(articleId)
        // const existingArticle = await Article.findById({_id: articleId}) // null

        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

