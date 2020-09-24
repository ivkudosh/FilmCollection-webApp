import {addCommentByItemId, getCommentsItemById, getItemById} from "../services"

const itemPageRequested = () => {
    return {
        type: 'FETCH_ITEM_PAGE_REQUEST'
    }
}

const itemPageLoaded = (newItems) => {
    return {
        type: 'FETCH_ITEM_PAGE_SUCCESS',
        payload: newItems
    }
}

const itemPageError = (error) => {
    return {
        type: 'FETCH_ITEM_PAGE_FAILURE',
        payload: error
    }
}

const commentsItemPageRequested = () => {
    return {
        type: 'FETCH_COMMENTS_ITEM_PAGE_REQUEST'
    }
}

const commentsItemPageLoaded = (newComments) => {
    return {
        type: 'FETCH_COMMENTS_ITEM_PAGE_SUCCESS',
        payload: newComments
    }
}

const fetchItemById = (itemId) => (dispatch) => {
    dispatch(itemPageRequested())
    getItemById(itemId)
        .then(({data}) => {
            dispatch(itemPageLoaded(data))
        })
        .catch((err) => {
                dispatch(itemPageError(err))
            }
        )
}

const fetchAddCommentItemById = (token, form, itemId) => (dispatch) => {
    addCommentByItemId(token, form, itemId)
        .then(({data}) => {
            dispatch(commentsItemPageLoaded(data))
        })
        .catch((err) => {
                dispatch(itemPageError(err))
            }
        )
}

const fetchHiddenUpdateComments = (itemId) => (dispatch) => {
    dispatch(commentsItemPageRequested())
    getCommentsItemById(itemId)
        .then(({data}) => {
            dispatch(commentsItemPageLoaded(data))
        })
        .catch((err) => {
                dispatch(itemPageError(err))
            }
        )
}

export {
    fetchItemById,
    fetchAddCommentItemById,
    fetchHiddenUpdateComments,
}