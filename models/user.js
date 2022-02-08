const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    planType: {
        type: String,
        enum: ['free', 'pro'],
        default: 'free'

    },
    email: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
