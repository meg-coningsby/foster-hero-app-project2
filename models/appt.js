const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('../models/user');
const Vet = require('../models/vet');
const Cat = require('../models/cat');

const apptSchema = new Schema(
    {
        cat: {
            type: Schema.Types.ObjectId,
            ref: 'Cat',
        },
        vet: {
            type: Schema.Types.ObjectId,
            ref: 'Vet',
        },
        date: {
            type: Date,
        },
        reason: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Appt', apptSchema);
