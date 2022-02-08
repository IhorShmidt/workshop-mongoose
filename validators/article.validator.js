const Joi = require('joi');


module.exports = {
    validateArticleCreation
}

async function validateArticleCreation(payload) {
    try {
        const schema = Joi.object({
            title: Joi.string()
                .min(2)
                .max(500)
                .required().error(new Error('Invalid article title')),
            description: Joi.string().allow('').optional()
        })
        const value = await schema.validateAsync(payload);
        console.log('-----success----------');
        console.log('value', value);
        console.log('---------------');
        return value;

    } catch (error) {
        console.log('------validateArticleCreation---------');
        console.log('error', error);
        console.log('---------------');
        throw error;
    }
}
