const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const trackSchema = require('./track');

const trackSchema = new Schema({
    title: {type: String, required: true},
    contents: [Number],
    // sample: {type: Schema.Types.ObjectId, ref: 'Sample'},
}, {
    timestamps: true,
});

const projectSchema = new Schema({
    user: {type: Schema.Types.ObjectId, required: true},
    title: {type: String, required: true},
    tracks: [trackSchema],
    bpm: {type: Number, default: 120}
}, {
    timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);
