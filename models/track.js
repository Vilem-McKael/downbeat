const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sampleSchema = './sample';


const trackSchema = new Schema({

    title: {type: String, required: true},
    sample: [sampleSchema],
    bpm: {type: Number, default: 120}
}, {
    timestamps: true,
});

module.exports = trackSchema;
