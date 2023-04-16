const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const track = trackSchema;


const sampleSchema = new Schema({

    name: {type: String, required: true},
    category: String,
    audio: null
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

const sound = require(`${this.name}.wav`);

sampleSchema.virtual('audio').get(function() {
    return sound;
})

module.exports = mongoose.model('Sample', sampleSchema);


