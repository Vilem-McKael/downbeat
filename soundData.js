import kick1 from './src/assets/sounds/kick1.wav'


const allSounds = {
    'kick1': kick1,
}

export default function getSound(soundTitle) {
    return allSounds[soundTitle];
}

module.exports = {
    getSound
}