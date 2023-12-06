const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cat = require('../models/cat');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        googleId: {
            type: String,
        },
        email: String,
        avatar: String,
        role: {
            type: String,
            enum: ['Admin', 'Foster Carer'],
            default: 'Foster Carer',
        },
        status: {
            type: String,
            enum: ['Active', 'Inactive'],
        },
        cats: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Cat',
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);
