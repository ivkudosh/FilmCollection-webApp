const initialState = {
    data: [],
    user: {},
    loading: false,
    errorStatus: null
}

const collectionsReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'FETCH_COLLECTIONS_REQUEST': {

            return {
                ...state,
                loading: true,
            }
        }

        case 'FETCH_COLLECTIONS_SUCCESS': {

            const {collections: data, user} = action.payload

            return {
                ...state,
                loading: false,
                data,
                user
            }
        }

        case 'FETCH_COLLECTIONS_FAILURE': {

            const {response = {}} = action.payload
            const {status = null} = response

            return {
                ...state,
                errorStatus: status,
                loading: false
            }
        }

        default:
            return state
    }
}

export default collectionsReducer
