import React, {useCallback, useContext} from 'react'
import {useHistory} from "react-router"

import {imgHeart} from "../../image-svg"
import {likedItem} from "../../services"
import {AuthContext} from "../../context/AuthContext"

import styles from "./item-home-page.module.css"
import {useHandlerLike} from "../../hooks/use-handler-like"
import {itemsMainPageError} from "../../actionsCreator"

const ItemHomePage = ({item, limitTags}) => {

    const {token} = useContext(AuthContext)

    const {id, title, image, countLikes, tags, comments, itemLikes} = item

    let tagsAfterLimit = []
    if (limitTags) {
        tagsAfterLimit = tags.slice(0, limitTags)
    }

    const {
        requestLiked,
        resCountLikes,
        classLike,
        isNowRequest
    } = useHandlerLike({
        likedItem,
        countLikes,
        itemLikes,
        styleLikeOn: styles.likeOnItemHomePage,
        styleLikeOff: styles.likeOffItemHomePage,
        actionForError: itemsMainPageError
    })

    const history = useHistory()
    const historyPush = useCallback((itemId) => {
        return () => history.push(`/items/${itemId}`)
    }, [history])

    const userLikedItem = useCallback(async () => {
        if (!isNowRequest) {
            await requestLiked(token, id)
        }
    }, [token, id, requestLiked, isNowRequest])

    return (
        <div className={styles.card}>
            {
                image ?
                    <img onClick={historyPush(id)}
                         className={styles.imgItemHomePage}
                         src={image}
                         alt={title}/> :
                    <div onClick={historyPush(id)}
                         className={styles.fakeImgItemHomePage}
                    >
                        No picture
                    </div>
            }
            <div className={styles.cardTitleAndLikes}>
                <div className={styles.cardTitle}>
                    <strong>{title}</strong>
                </div>
                <div className={styles.countLikesAndHeart}>
                    <div>{resCountLikes}</div>
                    <img onClick={userLikedItem}
                         className={classLike}
                         src={imgHeart}
                         alt={title}
                    />
                </div>
            </div>
            <div className={styles.lengthComments}>Comments: {comments.length}</div>
            {tagsAfterLimit.map((tag, idx) => {
                return (
                    <div key={`tag${idx}`} className={styles.tag}>
                        {tag}
                    </div>
                )
            })}
        </div>
    )
}

export default ItemHomePage