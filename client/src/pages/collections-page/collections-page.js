import React, {useCallback, useContext, useEffect, useMemo} from "react"
import {useSelector} from "react-redux"

import {AuthContext} from "../../context/AuthContext"
import {collectionsReducerSelector as selector} from "../../selectors"
import {fetchCollections} from "../../actionsCreator"
import {useTableData} from "../../hooks/use-table-data"
import {
    batchActions,
    headersItems,
    initialRowsMapper, OverflowActionInfoCollectionComponent,
    overflowActions,
    renderCollectionModal, selectCollectionRequest,
    toolbarActions
} from "./utulities"
import MainTable from "../../components/main-table"
import DynamicComponent from "../../components/dynamic-component"
import {transformActionKeyToTitle} from "../../utilities-functions"

const CollectionSPage = ({userId}) => {
    const {token, logout} = useContext(AuthContext)
    const {errorStatus, user} = useSelector(selector)

    useEffect(() => {
        if (errorStatus === 401) {
            logout()
        }
    }, [errorStatus])

    const memoizedAction = useMemo(() => {
        return fetchCollections(token, userId)
    }, [token, userId])

    const {
        tableProps,
        menuAction,
        setReFetch,
        onClose,
    } = useTableData({
        action: memoizedAction,
        headersItems,
        selector,
        initialRowsMapper,
        batchActions,
        overflowActions,
        toolbarActions,
    })

    const onModalClose = useCallback(() => {
        setReFetch(i => !i)
        onClose()
    }, [setReFetch, onClose])

    return (
        <>
            <DynamicComponent
                component={renderCollectionModal[menuAction.action]}
                primaryRequest={selectCollectionRequest(menuAction.action)}
                operation={transformActionKeyToTitle(menuAction.action)}
                {...menuAction}
                onClose={onModalClose}
                userId={userId}
            />

            <MainTable
                tableTitle={userId ? `${user.name}'s collections`: 'My collections'}
                {...tableProps}
                OverflowActionInfoComponent={OverflowActionInfoCollectionComponent}
                expandRows="collections"
            />
        </>
    )

}

export default CollectionSPage