const initialState = {
    loading: false,
    errorStatus: null,
    data: []
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'FETCH_USERS_REQUEST': {

            return {
                ...state,
                loading: true,
            }
        }

        case 'FETCH_USERS_SUCCESS': {

            const data = action.payload

            return {
                ...state,
                loading: false,
                data
            }
        }

        case 'FETCH_USERS_FAILURE': {

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

export default usersReducer
