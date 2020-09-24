const initialState = {
    data: [],
    loading: false,
    errorStatus: null
}

const itemsHomePageReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'FETCH_ITEMS_HOME_PAGE_REQUEST': {

            return {
                ...state,
                loading: true,
            }
        }

        case 'FETCH_ITEMS_HOME_PAGE_SUCCESS': {

            const {items: data} = action.payload

            return {
                ...state,
                loading: false,
                data,
            }
        }

        case 'FETCH_ITEMS_HOME_PAGE_FAILURE': {

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

export default itemsHomePageReducer
