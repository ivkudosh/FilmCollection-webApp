import {useSelector} from "react-redux"
import {itemsReducerSelector} from "../../selectors"

export const useSelectorItemById = (id) => {
    const {data} = useSelector(itemsReducerSelector)
    if (!id) {
        return {
            title: '',
            description: '',
            tags: [],
            image: '',
        }
    }
    return data.find(i => i.id === id)
}