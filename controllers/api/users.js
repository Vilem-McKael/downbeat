const User = require('../../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    signUp,
    login
}

async function signUp(req, res) {
    try {
        const user = await User.create(req.body);
        const token = createJWET(user);
        res.json(token);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function login(req, res) {
    try {
        console.log(req.body);
        const user = await User.findOne({email: req.body.email});
        const passwordsMatch = await bcrypt.compare(req.body.password, user.password);
        if (passwordsMatch) {
            const token = createJWT(user);
            res.json(token);
        } else {
            res.status(400).json(error);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

function createJWT(user) {
    return jwt.sign(
        {user},
        process.env.SECRET,
        { expiresIn: '24hr' }
    )
}