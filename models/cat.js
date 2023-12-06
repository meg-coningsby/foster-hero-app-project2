const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('../models/user');
const Vet = require('../models/vet');
const Appt = require('../models/appt');

const noteSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        userName: String,
        userAvatar: String,
    },
    {
        timestamps: true,
    }
);

const catSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        carer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        intake: {
            type: Date,
        },
        gender: {
            type: String,
            enum: ['Female', 'Male'],
            required: true,
        },
        birthDate: {
            type: Date,
            required: true,
        },
        colour: {
            type: String,
            required: true,
        },
        healthStatus: {
            type: String,
            enum: ['Healthy', 'Recovering', 'Unwell'],
            required: true,
        },
        microchip: {
            type: Number,
            min: 100000000,
            max: 999999999999999,
            unique: true,
        },
        vaccinated: {
            type: Boolean,
            default: false,
        },
        desexed: {
            type: Boolean,
            default: false,
        },
        adopted: {
            type: Boolean,
            default: false,
        },
        adoptDate: {
            type: Date,
        },
        appts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Appt',
            },
        ],
        notes: [noteSchema],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Cat', catSchema);
