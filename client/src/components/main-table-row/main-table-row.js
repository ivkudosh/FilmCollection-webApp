import React, {createRef} from "react"
import map from "lodash/map"
import isEmpty from "lodash/isEmpty"
import {
    OverflowMenu,
    OverflowMenuItem,
    TableCell,
    TableSelectRow,
    SkeletonText
} from "carbon-components-react"

import DynamicExpandComponent from "./dynamic-expand-component"
import DynamicExpandedComponent from "./dynamic-expanded-component"

const selectedRowsIds = (arr) => map(arr, ({id}) => id)

const MainTableRow = (
    {
        loading,
        row,
        initialRow,
        onExpand,
        rest,
        getSelectionProps,
        OverflowActionInfoComponent,
        overflowActions,
        selectedRows,
        headers,
        expandRows,
    }) => {

    const ref = createRef()

    return (
        <>
            <DynamicExpandComponent {...rest} onExpand={onExpand} expandRows={expandRows}>
                <TableSelectRow {...getSelectionProps({row})}/>
                {row.cells.map(cell => (
                    <TableCell key={cell.id}>
                        {loading ? <SkeletonText/> : cell.value}
                    </TableCell>
                ))}
                {!isEmpty(overflowActions) &&
                <TableCell className='overflowActionsContainer'>
                    {
                        !selectedRowsIds(selectedRows).find(id => id === row.id) &&
                        <OverflowMenu flipped>
                            {OverflowActionInfoComponent &&
                            <OverflowActionInfoComponent ref={ref} id={row.id}/>}
                            {map(overflowActions, ({name, key, onClick}) => (
                                <OverflowMenuItem key={key}
                                                  itemText={name}
                                                  onClick={() => onClick(key, [row])}
                                />
                            ))}
                        </OverflowMenu>
                    }
                </TableCell>}
            </DynamicExpandComponent>

            <DynamicExpandedComponent
                initialRow={initialRow}
                expandRows={expandRows}
                isExpanded={row.isExpanded}
                colSpan={!isEmpty(overflowActions) ? headers.length + 3 : headers.length + 2}
            />
        </>
    )
}

export default MainTableRow