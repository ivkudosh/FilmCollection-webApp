import {TableExpandRow, TableRow} from "carbon-components-react"
import React from "react"

const DynamicExpandComponent = ({expandRows, children, ...props}) => {
    return (
        (
            expandRows ?
                <TableExpandRow {...props}>
                    {children}
                </TableExpandRow> :
                <TableRow>
                    {children}
                </TableRow>
        )
    )
}

export default DynamicExpandComponent