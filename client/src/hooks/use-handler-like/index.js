import {useCallback, useContext, useState} from "react"
import {useDispatch} from "react-redux"
import {AuthContext} from "../../context/AuthContext"

export const useHandlerLike = (
    {
        likedItem,
        countLikes: defaultCountLikes,
        itemLikes: defaultItemLikes,
        styleLikeOn,
        styleLikeOff,
        actionForError
    }) => {

    const dispatch = useDispatch()
    const {setOpenModal, setIdLikedItems} = useContext(AuthContext)

    const [isNowRequest, setIsNowRequest] = useState(false)
    const [resCountLikes, setResCountLikes] = useState(defaultCountLikes)
    const [classLike, setClassLike] = useState(defaultItemLikes ? styleLikeOn : styleLikeOff)

    const requestLiked = useCallback(async (...args) => {
        setIsNowRequest(true)
        likedItem(...args)
            .then(() => {
                if (classLike === styleLikeOn) {
                    setClassLike(styleLikeOff)
                    setResCountLikes(count => count - 1)
                    setIdLikedItems(likes => {
                        const itemId = args[1]
                        const idxCurrentLike = likes.findIndex(likeId => itemId === likeId)
                        return [
                            ...likes.slice(0, idxCurrentLike),
                            ...likes.slice(idxCurrentLike + 1)
                        ]
                    })
                } else if (classLike === styleLikeOff) {
                    setClassLike(styleLikeOn)
                    setResCountLikes(count => count + 1)
                    setIdLikedItems(likes => {
                        const itemId = args[1]
                        return [
                            ...likes,
                            itemId
                        ]
                    })
                }

                setIsNowRequest(false)
            })
            .catch((err) => {
                setIsNowRequest(false)

                if (err.response.status === 401) {
                    setOpenModal(true)
                }
                dispatch(actionForError(err))
            })
    }, [classLike, styleLikeOn, styleLikeOff, likedItem])

    return {
        resCountLikes,
        requestLiked,
        classLike,
        isNowRequest
    }
}