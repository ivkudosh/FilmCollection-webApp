const collectionsForFront = (collections) => {
    return collections.map(({_id, title, description, theme, image, itemTitleDefault, itemTagsDefault}) => {
        const imageToString = image ? image.toString() : image
        return {
            id: _id,
            title,
            description,
            theme,
            image: imageToString,
            itemTitleDefault,
            itemTagsDefault
        }
    })
}

module.exports = collectionsForFront