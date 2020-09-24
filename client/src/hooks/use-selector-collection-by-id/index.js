import {useSelector} from "react-redux"
import {collectionsReducerSelector} from "../../selectors"
import {THEME_GAMES} from "../../constants"

export const useSelectorCollectionById = (id) => {
    const {data} = useSelector(collectionsReducerSelector)
    if (!id) {
        return {
            title: '',
            description: '',
            theme: THEME_GAMES,
            image: '',
            itemTitleDefault: '',
            itemTagsDefault: [],
        }
    }
    return data.find(i => i.id === id)
}