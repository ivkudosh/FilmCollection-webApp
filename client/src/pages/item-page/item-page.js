import React, {useContext, useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"

import Comments from "../../components/comments"
import {AuthContext} from "../../context/AuthContext"
import {fetchAddCommentItemById, fetchHiddenUpdateComments, fetchItemById} from "../../actionsCreator"
import {itemPageReducerSelector} from "../../selectors"
import {dateFormat} from "../../utilities-functions"
import Loader from "../../components/loader"
import {Button, TextArea} from "carbon-components-react"
import {SendAlt20} from '@carbon/icons-react'

import styles from './item-page.module.css'
import stylesHomePage from '../../components/item-home-page/item-home-page.module.css'

const ItemPage = ({itemId}) => {

    const dispatch = useDispatch()
    const {setOpenModal, logout, token} = useContext(AuthContext)
    const {data = {}, loading, errorStatus, loadingComments} = useSelector(itemPageReducerSelector)

    const [newComment, setNewComment] = useState('')
    const ref = useRef(null)

    const {
        title,
        description,
        dateCreation,
        image,
        tags = [],
        comments = []
    } = data

    useEffect(() => {
        const interval = setInterval(() => {
            if (!loadingComments && !loading) {
                dispatch(fetchHiddenUpdateComments(itemId))
            }
        }, 3000)
        return () => clearInterval(interval)
    }, [itemId, loadingComments, loading])

    useEffect(() => {
        if (errorStatus === 401) {
            logout()
            setOpenModal(true)
        } else {
            dispatch(fetchItemById(itemId))
        }
    }, [itemId, errorStatus, logout, setOpenModal])

    // const checkItemLikes = idLikedItems && idLikedItems.includes()

    const handleChangeMessage = (e) => {
        setNewComment(e.target.value)
    }

    const sendCommentButton =  (e) => {
        if (newComment) {
            dispatch(fetchAddCommentItemById(token, {comment: newComment}, itemId))
            setNewComment('')
        }
    }

    const onClickFocus = (userName) => () => {
        ref.current.focus()
        setNewComment(`${userName}, `)
    }

    if (loading) {
        return <Loader/>
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>{title}</div>
            <div className={styles.imgAndDateTags}>
                {image ?
                    <img src={image} className={styles.imgItemPage} alt={title}/> :
                    <div className={styles.fakeImgItemPage}>No picture</div>
                }
                <div className={styles.dateCreationAndTags}>
                    <div className={styles.dateCreation}>{dateFormat(dateCreation)}</div>
                    <div>
                        {tags.map((tag, idx) => {
                            return (
                                <div key={`tag${idx}`} className={stylesHomePage.tag}>
                                    {tag}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className={styles.description}>{description}</div>
            {comments.length !== 0 && <Comments onClickFocus={onClickFocus} comments={comments}/>}
            <div className={styles.textInputAndButton}>
                <div className={styles.textInput}>
                    <TextArea light
                              size="xl"
                              labelText={''}
                              placeholder="Enter your comment..."
                              value={newComment}
                              onChange={handleChangeMessage}
                              ref={ref}
                    />
                </div>
                <div className={styles.buttonSubmitComment}>
                    <Button renderIcon={SendAlt20} onClick={sendCommentButton}>Send</Button>
                </div>
            </div>
        </div>
    )
}

export default ItemPage