import React from "react"
import {TableExpandedRow} from "carbon-components-react"

import styles from "./main-table-expanded-row-collection.module.css"

const MainTableExpandedRowCollection = ({initialRow, colSpan}) => {
    return (
        <TableExpandedRow
            colSpan={colSpan}>
            <div className={styles.contentExpandedRow}>
                {initialRow.image && <img src={initialRow.image} className={styles.img}/>}
                <h3>Default tags for items</h3>
                <div>{initialRow.itemTagsDefault.join(', ')}</div>
            </div>
        </TableExpandedRow>
    )
}

export default MainTableExpandedRowCollection