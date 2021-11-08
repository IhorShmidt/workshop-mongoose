'use strict';

const _ = require('lodash');
const utilError = require('../config/errorHelper');
const Article = require('../models/article');

module.exports = {
  createArticle,
  updateArticle,
  getArticles
};

async function createArticle(req, res, next) {
  const fields = ['title', 'description', 'owner'];

  const body = req.body;
  const newArticle = _.pick(body, fields);

  try {
    const existingArticle = await Article.findOne({title: body.title});
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
    if (body.description) {
      existingArticle.description = body.description;
    }

    await existingArticle.save();
    return res.status(200).json(existingArticle);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function getArticles(req, res, next) {
  try {
    const {
      query: {skip = 0, limit = 10, search = '', sort: sortFromClient}
    } = req;
    const sort = util.sort(sortFromClient);
    const filter = {$regex: new RegExp(util.escapeRegExpChars(search), 'i')};
    const query = {$or: [{title: filter}, {description: filter}]};
    const result = await Article.find(query)
        .populate('owner')
        .sort(sort)
        .skip(skip)
        .limit(limit);

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
