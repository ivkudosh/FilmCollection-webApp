const initialState = {
    data: {},
    loading: false,
    loadingComments: false,
    errorStatus: null
}

const itemPageReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'FETCH_ITEM_PAGE_REQUEST': {

            return {
                ...state,
                loading: true,
            }
        }

        case 'FETCH_ITEM_PAGE_SUCCESS': {

            const data = action.payload

            return {
                ...state,
                loading: false,
                data
            }
        }

        case 'FETCH_ITEM_PAGE_FAILURE': {

            const {response = {}} = action.payload
            const {status = null} = response

            return {
                ...state,
                errorStatus: status,
                loading: false
            }
        }

        case 'FETCH_COMMENTS_ITEM_PAGE_REQUEST': {

            return {
                ...state,
                loadingComments: true,
            }
        }

        case 'FETCH_COMMENTS_ITEM_PAGE_SUCCESS': {

            const comments = action.payload

            return {
                ...state,
                data: {
                    ...state.data,
                    comments
                },
                loadingComments: false,
            }
        }

        default:
            return state
    }
}

export default itemPageReducer
