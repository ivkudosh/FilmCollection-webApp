import {
    getSearchedItems,
    getItemById, addCommentByItemId
} from "../services"

const itemsMainPageRequested = () => {
    return {
        type: 'FETCH_ITEMS_HOME_PAGE_REQUEST'
    }
}

const itemsMainPageLoaded = (newItems) => {
    return {
        type: 'FETCH_ITEMS_HOME_PAGE_SUCCESS',
        payload: newItems
    }
}

const itemsMainPageError = (error) => {
    return {
        type: 'FETCH_ITEMS_HOME_PAGE_FAILURE',
        payload: error
    }
}

const fetchSearchedItemsMainPage = (options) => (dispatch) => {
    dispatch(itemsMainPageRequested())
    getSearchedItems(options)
        .then(({data}) => {
            dispatch(itemsMainPageLoaded(data))
        })
        .catch((err) => {
                dispatch(itemsMainPageError(err))
            }
        )
}

export {
    itemsMainPageRequested,
    itemsMainPageLoaded,
    itemsMainPageError,
    fetchSearchedItemsMainPage
}
