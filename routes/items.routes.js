const {Router} = require('express')
const {Types} = require('mongoose')
const auth = require('../middleware/auth.middleware')
const Item = require('../models/Item')
const Collection = require('../models/Collection')
const User = require('../models/User')
const itemsForFront = require('../data-for-front/items-for-front')
const collectionsForFront = require('../data-for-front/collections-for-front')
const {uniqueTags} = require('../utilities-functions')

const router = Router()

router.get('/searched', async (req, res) => {
    try {
        const {search} = req.query
        let items = []
        if (search) {
            await Item.syncIndexes()
            items = await Item.find({$text: {$search: search}})
        } else {
            items = await Item.find()
        }
        res.status(200).json({items: itemsForFront(items)})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.get('/searched/:itemId', async (req, res) => {
    try {
        const item = await Item.findOne({_id: req.params.itemId})
        res.status(200).json(itemsForFront([item])[0])
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.get('/searched/comments/:itemId', async (req, res) => {
    try {
        const item = await Item.findOne({_id: req.params.itemId})
        res.status(200).json(item.comments)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.get('/:idCollection', auth, async (req, res) => {
    try {
        const {idCollection} = req.params
        const items = await Item.find({owner: idCollection})
        const collection = await Collection.findOne({_id: idCollection})
        res.status(200).json({
            items: itemsForFront(items),
            collection: collectionsForFront([collection])[0]
        })
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.post('/create/:idCollection', auth, async (req, res) => {
    try {
        const {idCollection} = req.params
        const {title, description, image, tags} = req.body
        const collection = await Collection.findById(idCollection)

        const item = new Item({
            owner: idCollection,
            title,
            image: Buffer.from(image),
            description,
            tags: uniqueTags([...collection.itemTagsDefault, ...tags])
        })
        await item.save()
        res.status(201).json(itemsForFront([item])[0])

    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.post('/edit/:id', auth, async (req, res) => {
    try {
        const {title, description, image, tags} = req.body
        const item = await Item.updateOne({_id: req.params.id},
            {title, description, image: new Buffer(image), tags: uniqueTags(tags)})
        res.status(200).json(item)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.delete('/delete/:id', auth, async (req, res) => {
    try {
        await Item.deleteOne({_id: req.params.id})
        res.status(200).json({message: 'Item successfully deleted'})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.post('/create-comment/:idItem', auth, async (req, res) => {
    try {
        const {comment} = req.body
        const item = await Item.findOne({_id: req.params.idItem})
        const {name} = await User.findOne({_id: req.user.userId})
        item.comments.push({userName: name, comment})
        await item.save()
        res.status(201).json(item.comments)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

router.post('/liked/:itemId', auth, async (req, res) => {
    try {
        const {itemId} = req.params
        const item = await Item.findOne({_id: itemId})
        const user = await User.findOne({_id: req.user.userId})

        const idxAlreadyLike = user.idLikedItems
            .findIndex((id) => id.toString() === itemId)
        if (idxAlreadyLike !== -1) {
            item.countLikes--
            user.idLikedItems.splice(idxAlreadyLike, 1)
        } else {
            item.countLikes++
            user.idLikedItems.push(Types.ObjectId(itemId))
        }
        await item.save()
        await user.save()

        res.status(200).json({message: 'User successfully liked item'})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

module.exports = router
