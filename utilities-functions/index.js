const User = require('../models/User')
const Collection = require('../models/Collection')

const getCollectionsAndUserByUserId = async (id) => {
    const collections = await Collection.find({owner: id})
    const user = await User.findOne({_id: id})
    return {
        collections,
        user,
    }
}

const uniqueTags = (tags) => {
    const setTags = new Set(tags)
    setTags.delete(' ')
    setTags.delete('')
    return Array.from(setTags)
}

module.exports = {
    getCollectionsAndUserByUserId,
    uniqueTags
}