const {Schema, model, Types} = require('mongoose')

const schemaItem = new Schema({
    owner: {type: Types.ObjectId, required: true},
    title: {type: String, required: true},
    description: {type: String},
    image: {type: Buffer, contentType: 'image/png'},
    tags: [{type: String}],
    countLikes: {type: Number, default: 0},
    dateCreation: {type: Date, default: Date.now},
    comments: [
        {
            userName: {type: String},
            comment: {type: String}
        }
    ]
})

schemaItem.index({"$**": 'text'})

module.exports = model('Item', schemaItem)
