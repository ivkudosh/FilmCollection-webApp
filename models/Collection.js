const {Schema, model, Types} = require('mongoose')

const CollectionSchema = new Schema({
    owner: {type: Types.ObjectId, ref: 'User'},
    title: {type: String, required: true},
    description: {type: String},
    theme: {type: String, required: true},
    image: {type: Buffer},
    itemTitleDefault: {type: String},
    itemTagsDefault: [{type: String}],
    items: [{type: Types.ObjectId, ref: 'Item'}],
})

module.exports = model('Collection', CollectionSchema)
