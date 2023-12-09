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
            default:
                'https://github.com/meg-coningsby/foster-hero-app-project2/blob/main/public/images/no-cat-image.png?raw=true',
        },
        carer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        intake: {
            type: Date,
        },
        gender: {
            type: String,
            enum: ['Female', 'Male'],
        },
        birthDate: {
            type: Date,
        },
        colour: {
            type: String,
        },
        healthStatus: {
            type: String,
            enum: ['Healthy', 'Recovering', 'Unwell'],
        },
        microchipNumber: {
            type: Number,
        },
        vaccinated: {
            type: Boolean,
            default: false,
        },
        desexed: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ['In Care', 'Up for Adoption', 'Adopted'],
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
