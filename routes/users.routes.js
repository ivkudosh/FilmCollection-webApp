const {Router} = require('express')

const User = require('../models/User')
const Collection = require('../models/Collection')
const Item = require('../models/Item')
const auth = require('../middleware/auth.middleware')
const checkAdmin = require('../middleware/admin.middleware')
const usersForFront = require('../data-for-front/users-for-front')

const router = Router()

router.get('/', auth, checkAdmin, async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(usersForFront(users))
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.delete('/delete/:id', auth, checkAdmin, async (req, res) => {
    try {
        const {id} = req.params

        await User.deleteOne({_id: id})
        const collections = await Collection.find({owner: id})
        await Promise.all(collections.map((collection) => Item.remove({owner: collection.id})))
        await Collection.remove({owner: id})

        res.status(200).json({message: 'User successfully deleted'})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.post('/block/:id', auth, checkAdmin, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {blocked: true})
        res.status(200).json({message: 'User successfully changed'})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.post('/unblock/:id', auth, checkAdmin, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {blocked: false})
        res.status(200).json({message: 'User successfully changed'})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.post('/make-admin/:id', auth, checkAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user.isAdmin) {
            user.isAdmin = true
            await user.save()
            res.status(200).json({message: 'User is now admin'})
        } else {
            res.status(202).json({message: 'User is already admin'})
        }
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

module.exports = router
