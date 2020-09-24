module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        if (req.user.userIsAdmin) {
            return next()
        } else {
            throw new Error('User is not admin')
        }
    } catch (e) {
        res.status(400).json({message: e.message})
    }
}