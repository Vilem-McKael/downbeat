require('dotenv').config();
require('./config/database');

const Project = require('./models/project');
const Sample = require('./models/sample');
import kick1 from './src/assets/sounds/kick1.wav';

async function seedSamples() {

    await Sample.deleteMany({});
    const samples = await Sample.create([{
        name: 'kick1',
        category: 'kicks',
        audio: kick1
    }
    ])
}

seedSamples();