'use strict';

const Article = require("../models/article");
const utilError = require("../config/errorHelper");
module.exports = {
    createArticle
}

async function createArticle(payload) {
    try {
        const existingArticle = await Article.findOne({title: payload.title});
        if (existingArticle) {
            throw utilError.badRequest('Article exists');
        }
        const book = new Article(newArticle);
        await book.save();
    } catch (error) {
        throw error;
    }
}


// module.exports = class Article {
//     async createArticle() {
//         const existingArticle = await Article.findOne({title: body.title});
//         if (existingArticle) {
//             throw utilError.badRequest('Article exists');
//         }
//         const book = new Article(newArticle);
//         await book.save();
//     }
// }
