const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
    sample: {type: String, required: true}, // samplecategory_samplename
    contents: [Number]
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
