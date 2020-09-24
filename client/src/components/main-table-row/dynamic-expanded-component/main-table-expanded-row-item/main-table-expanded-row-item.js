import React from "react"
import {TableExpandedRow} from "carbon-components-react"
import styles from "./main-table-expanded-row-item.module.css"

const MainTableExpandedRowItem = ({initialRow, colSpan}) => {
    return (
        <TableExpandedRow
            colSpan={colSpan}>
            <div className={styles.contentExpandedRow}>
                {initialRow.image && <img src={initialRow.image} className={styles.img}/>}
                <h3>Tags</h3>
                <div>{initialRow.tags.join(', ')}</div>
            </div>
        </TableExpandedRow>
    )
}

export default MainTableExpandedRowItem