const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: String,
    description: String,
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
},
    {
    timestamps: true
});



module.exports = mongoose.model('Article', ArticleSchema);
