import {useDispatch} from "react-redux"
import {collectionsError, itemsError, itemsMainPageError, usersError} from "../../actionsCreator"
import {useCallback} from "react"

export const useResetAllErrors = () => {
    const dispatch = useDispatch()
    const resetAllErrors = useCallback(() => {
        dispatch(collectionsError({}))
        dispatch(itemsError({}))
        dispatch(itemsMainPageError({}))
        dispatch(usersError({}))
    }, [collectionsError, itemsError, itemsMainPageError, usersError, dispatch])

    return {
        resetAllErrors
    }
}