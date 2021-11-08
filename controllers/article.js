'use strict';

const _ = require('lodash');
const utilError = require("../config/errorHelper");
const Article = require('../models/article')

module.exports = {
    createArticle
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
        const book = new Article(newArticle);
        await book.save();
        return res.status(200).json(book);
    } catch (err) {
        console.log(err);
        next(err);
    }

}

