const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        min: 2, max: 80
    },
    lastName: {
        type: String,
        required: true,
        min: 2, max: 80
    },
    email: {
        type: String,
        required: true,
        min: 2, max: 80
    },
    age: {
        type: Number,
        min: 0, max: 130
    },
    updateCounter: {
        type: Number,
        min: 0,
        default: 0
    }
}, {
    timestamps: true
});

UserSchema.methods.fullName = function() {
    return `${this.firstName} ${this.lastName}`;
}

UserSchema.pre('save', (next) => {
    this.updateCounter++;
    // this.save();
    next()
})

module.exports = mongoose.model('User', UserSchema);
