import React from "react"

import {
    DataTable,
    Button,
    SearchSkeleton,
} from 'carbon-components-react'

import {Add16} from "@carbon/icons-react"

import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

import styles from './main-table.module.css'
import './main-table.css'
import MainTableRow from "../main-table-row"

const {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableHeader,
    TableToolbar,
    TableToolbarSearch,
    TableToolbarContent,
    TableBatchActions,
    TableBatchAction,
    TableSelectAll,
} = DataTable

const MainTable = (
    {
        headersItems,
        initialRows,
        loading,
        batchActions,
        overflowActions,
        OverflowActionInfoComponent,
        toolbarActions,
        tableTitle,
        expandRows
    }) => {

    return (
        <DataTable
            rows={[...initialRows]}
            headers={headersItems}
            render={({
                         rows,
                         headers,
                         getHeaderProps,
                         getSelectionProps,
                         getBatchActionProps,
                         onInputChange,
                         selectedRows,
                         getRowProps,
                         expandAll,
                     }) => (
                <TableContainer
                    title={<div className={styles.titleHeader}><span className={styles.textHeader}>{tableTitle}</span>
                    </div>}>
                    <TableToolbar>
                        {selectedRows.length !== 0 && <TableBatchActions {...getBatchActionProps()} >
                            {map(batchActions, ({name, key, onClick}) => (
                                <TableBatchAction
                                    renderIcon={null}
                                    key={key}
                                    onClick={() => onClick(key, selectedRows)}
                                >
                                    {name}
                                </TableBatchAction>
                            ))}
                        </TableBatchActions>}
                        <TableToolbarContent>
                            {loading ? <SearchSkeleton className={styles.searchSkeletonToolbar}/> :
                                <>
                                    {map(toolbarActions, ({name, key, onClick}) => {
                                        return (
                                            <Button
                                                key={key}
                                                onClick={() => onClick(key)}
                                                size='default'
                                                kind="primary"
                                                renderIcon={Add16}
                                            >
                                                {name}
                                            </Button>
                                        )
                                    })}
                                    <TableToolbarSearch
                                        persistent
                                        onChange={onInputChange}/>
                                </>
                            }
                        </TableToolbarContent>
                    </TableToolbar>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {expandRows && <TableHeader key="expandHeader" onClick={expandAll}>Expand</TableHeader>}
                                <TableSelectAll {...getSelectionProps()} />
                                {headers.map(({header}) => (
                                    <TableHeader key={header} {...getHeaderProps({header})}>
                                        {header}
                                    </TableHeader>
                                ))}
                                {!isEmpty(overflowActions) && <TableHeader key="overflowHeader"/>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, idx) => {
                                const {onExpand, ...rest} = getRowProps({row})
                                return (
                                    <MainTableRow
                                        loading={loading}
                                        expandRows={expandRows}
                                        key={row.id}
                                        initialRow={initialRows[idx]}
                                        row={row}
                                        onExpand={onExpand}
                                        rest={rest}
                                        selectedRows={selectedRows}
                                        getSelectionProps={getSelectionProps}
                                        overflowActions={overflowActions}
                                        OverflowActionInfoComponent={OverflowActionInfoComponent}
                                        headers={headers}
                                    />
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        />
    )
}

MainTable.defaultProps = {
    batchActions: []
}

export default MainTable