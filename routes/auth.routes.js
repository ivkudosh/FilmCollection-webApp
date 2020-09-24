const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')

const router = Router()

const createUser = async (email, name, password, language) => {
    const hashPassword = await bcrypt.hash(password, 12)

    return new User({
        email,
        name,
        password: hashPassword,
        language
    })
}

const createToken = (user, jwtSecret) => {
    return jwt.sign(
        {
            userId: user.id,
            userIsAdmin: user.isAdmin
        },
        config.get(jwtSecret)
    )
}

router.post(
    '/register',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'The minimum password length is 6 characters.').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Incorrect data during registration',
                    errors: errors.array()
                })
            }

            const {
                email,
                password,
                name,
                language
            } = req.body

            const candidate = await User.findOne({email})

            if (candidate) {
                res.status(400).json({message: 'This user already exists'})
            }

            const user = await createUser(email, name, password, language)
            await user.save()
            res.status(201).json({message: 'User created'})

        } catch (e) {
            res.status(500).json({message: 'Something went wrong, try again'})
        }
    }
)

router.post(
    '/login',
    [
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login details'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: 'User is not found'})
            }

            if (user.blocked) {
                return res.status(400).json({message: 'This user is blocked'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Invalid password, try again'})
            }

            const token = createToken(user, 'jwtSecret')

            res.status(200).json({
                token,
                userId: user.id,
                userIsAdmin: user.isAdmin,
                idLikedItems: user.idLikedItems
            })

        } catch (e) {
            res.status(500).json({message: 'Something went wrong, try again'})
        }
    }
)

router.post('/social', async (req, res) => {
    try {
        const {email, name, password} = req.body
        const user = await User.findOne({email})

        if (!user) {
            const user = await createUser(email, name, password)
            await user.save()

            const token = jwt.sign(
                {
                    userId: user.id,
                    userIsAdmin: user.isAdmin
                },
                config.get('jwtSecret')
            )

            res.status(201).json({token, userId: user.id, userIsAdmin: user.isAdmin})
        } else {
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Invalid password, try again'})
            }

            const token = createToken(user, 'jwtSecret')

            res.status(200).json({
                token,
                userId: user.id,
                idLikedItems: user.idLikedItems,
                userIsAdmin: user.isAdmin,
            })
        }
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

module.exports = router
