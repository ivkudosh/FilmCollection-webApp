const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')

module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
        if (!token) {
            return res.status(401).json({ message: 'No authorization.' })
        }

        const user = jwt.verify(token, config.get('jwtSecret'))
        const exists = await User.findOne({_id: user.userId})
        if (exists && !exists.blocked) {
            req.user = user
        } else {
            throw new Error('User is blocked.')
        }

        next()
    } catch (e) {
        res.status(401).json({ message: 'No authorization.' })
    }
}
