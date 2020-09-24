import React from "react"
import {TableExpandedRow} from "carbon-components-react"
import styles from "./main-table-expanded-row-user.module.css"

const MainTableExpandedRowUser = ({initialRow, colSpan}) => {
    return (
        <TableExpandedRow
            colSpan={colSpan}>
            <div className={styles.contentExpandedRow}>

            </div>
        </TableExpandedRow>
    )
}

export default MainTableExpandedRowUser