import {combineReducers} from "redux"

import usersReducer from './users-reducer'
import collectionsReducer from "./collections-reducer"
import itemsReducer from "./items-reducer"
import itemsHomePageReducer from "./items-home-page-reducer"
import itemPageReducer from "./item-page-reducer"

export default combineReducers({
    usersReducer,
    collectionsReducer,
    itemsReducer,
    itemsHomePageReducer,
    itemPageReducer
})
