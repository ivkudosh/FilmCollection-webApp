const {Router} = require('express')

const Collection = require('../models/Collection')
const auth = require('../middleware/auth.middleware')
const checkAdmin = require('../middleware/admin.middleware')
const collectionsForFront = require('../data-for-front/collections-for-front')
const usersForFront = require('../data-for-front/users-for-front')
const {getCollectionsAndUserByUserId, uniqueTags} = require('../utilities-functions')

const router = Router()

router.get('/', auth, async (req, res) => {
    try {
        const {userId} = req.user
        const {collections, user} = await getCollectionsAndUserByUserId(userId)
        res.status(200).json({collections: collectionsForFront(collections), user: usersForFront([user])[0]})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.get('/:id', auth, checkAdmin, async (req, res) => {
    try {
        const {id} = req.params
        const {collections, user} = await getCollectionsAndUserByUserId(id)
        res.status(200).json({collections: collectionsForFront(collections), user: usersForFront([user])[0]})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.post('/create', auth, async (req, res) => {
    try {
        const {title, description, theme, image, itemTitleDefault, itemTagsDefault} = req.body
        const collection = new Collection({
            owner: req.user.userId,
            title,
            theme,
            description,
            image: new Buffer(image),
            itemTitleDefault,
            itemTagsDefault: uniqueTags(itemTagsDefault)
        })
        await collection.save()
        res.status(201).json(...collectionsForFront([collection]))
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.post('/edit/:id', auth, async (req, res) => {
    try {
        const {title, description, theme, image, itemTitleDefault, itemTagsDefault} = req.body
        await Collection.updateOne({_id: req.params.id},
            {title, description, theme, image, itemTitleDefault, itemTagsDefault: uniqueTags(itemTagsDefault)})
        res.status(200).json({message: 'Collection changed'})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.post('/create/:id', auth, checkAdmin, async (req, res) => {
    try {
        const {title, description, theme, image, itemTitleDefault, itemTagsDefault} = req.body
        const collection = new Collection({
            owner: req.params.id,
            title,
            theme,
            description,
            image: new Buffer(image),
            itemTitleDefault,
            itemTagsDefault: uniqueTags(itemTagsDefault)
        })
        await collection.save()
        res.status(201).json(...collectionsForFront([collection]))
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.delete('/delete/:id', auth, async (req, res) => {
    try {
        await Collection.deleteOne({_id: req.params.id})
        res.status(200).json({message: 'Collection deleted'})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

module.exports = router
