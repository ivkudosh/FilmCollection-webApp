const {Schema, model, Types} = require('mongoose')
const {LANGUAGE_ENGLISH} = require('../constants')

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    blocked: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    collections: [{type: Types.ObjectId, ref: 'Collection'}],
    language: {type: String, default: LANGUAGE_ENGLISH},
    idLikedItems: [{type: Types.ObjectId}]
})

module.exports = model('User', userSchema)
