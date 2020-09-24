import map from "lodash/fp/map"


const initialRowsMapper = map(({id, title, description, dateCreation, likes, image, tags, comments}) => {
    return {
        id,
        title,
        description,
        theme,
        image,
        itemTitleDefault,
        itemTagsDefault
    }
})