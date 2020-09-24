import React, {useCallback, useContext, useEffect, useMemo} from "react"

import {AuthContext} from "../../context/AuthContext"
import {fetchUsers} from "../../actionsCreator"
import {usersReducerSelector as selector} from "../../selectors"

import {
    headersItems,
    batchActions,
    overflowActions,
    initialRowsMapper,
    renderUserModals,
    selectUserRequest,
    OverflowActionInfoUserComponent
} from "./utilities"
import {useTableData} from "../../hooks/use-table-data"
import MainTable from "../../components/main-table"
import DynamicComponent from "../../components/dynamic-component"
import {transformActionKeyToTitle} from "../../utilities-functions"
import {useSelector} from "react-redux"

const UsersPage = () => {

    const {token, logout} = useContext(AuthContext)
    const {errorStatus} = useSelector(selector)

    useEffect(() => {
        if (errorStatus === 401) {
            logout()
        }
    }, [errorStatus])

    const memoizedAction = useMemo(() => {
        return fetchUsers(token)
    }, [token])

    const {
        tableProps,
        menuAction,
        setReFetch,
        onClose
    } = useTableData({
        action: memoizedAction,
        headersItems,
        selector,
        initialRowsMapper,
        batchActions,
        overflowActions
    })

    const onModalClose = useCallback(() => {
        setReFetch(i => !i)
        onClose()
    }, [setReFetch, onClose])

    return (
        <>
            <DynamicComponent
                component={renderUserModals[menuAction.action]}
                primaryRequest={selectUserRequest(menuAction.action)}
                operation={transformActionKeyToTitle(menuAction.action)}
                {...menuAction}
                onClose={onModalClose}
            />

            <MainTable
                tableTitle="Users"
                {...tableProps}
                OverflowActionInfoComponent={OverflowActionInfoUserComponent}
            />
        </>
    )
}

export default UsersPage

