import {
    getItemsByCollectionId
} from "../services"

const itemsRequested = () => {
    return {
        type: 'FETCH_ITEMS_REQUEST'
    }
}

const itemsLoaded = (newItems) => {
    return {
        type: 'FETCH_ITEMS_SUCCESS',
        payload: newItems
    }
}

const itemsError = (error) => {
    return {
        type: 'FETCH_ITEMS_FAILURE',
        payload: error
    }
}

const fetchItems = (token, collectionId) => (dispatch) => {
    dispatch(itemsRequested())
    getItemsByCollectionId(token, collectionId || '')
        .then(({data}) => {
            dispatch(itemsLoaded(data))
        })
        .catch((err) => {
                dispatch(itemsError(err))
            }
        )
}

export {
    itemsRequested,
    itemsLoaded,
    itemsError,
    fetchItems,
}
