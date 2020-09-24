import React from "react"

import styles from './comments.module.css'
import {
    StructuredListBody,
    StructuredListCell,
    StructuredListHead,
    StructuredListRow,
    StructuredListWrapper
} from "carbon-components-react"

const Comments = ({comments, onClickFocus}) => {

    return (
        <StructuredListWrapper className={styles.comments}>
            <StructuredListHead>
                <StructuredListRow>
                    <StructuredListCell head noWrap={false}>
                        Comments
                    </StructuredListCell>
                </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
                {comments.map(({comment, userName, _id}) => {
                    return (
                        <StructuredListRow className={styles.row} key={_id} onClick={onClickFocus(userName)}>
                            <StructuredListCell>
                                <div className={styles.nameCommentator}>
                                    {userName}
                                </div>
                                {comment}
                            </StructuredListCell>
                        </StructuredListRow>
                    )
                })}
            </StructuredListBody>
        </StructuredListWrapper>
    )
}

export default Comments