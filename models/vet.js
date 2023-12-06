const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vetSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
        },
        webiste: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Vet', vetSchema);
