const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const trackSchema = require('./track');


const projectSchema = new Schema({
    user: {type: Schema.Types.ObjectId, required: true},
    title: {type: String, required: true},
    tracks: [trackSchema],
    bpm: {type: Number, default: 120}
}, {
    timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);
