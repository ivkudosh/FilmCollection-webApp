import {useData} from "../use-data"
import {useAction} from "../use-action"
import map from 'lodash/map'
import {useState} from "react"

const actionMapper = ({handleClick, menuActions}) => {
    return map(menuActions, (i) => map(i, (item) => ({...item, onClick: handleClick})))
}

export const useTableData = (
    {
        headersItems,
        action,
        selector,
        initialRowsMapper,
        batchActions,
        overflowActions,
        toolbarActions,
    }) => {

    const [reFetch, setReFetch] = useState(false)

    const {loading, data} = useData({action, selector, reFetch})

    const {action: menuAction, handleClick, onClose} = useAction()

    const [
        batchActionsMapped,
        overflowActionsMapped,
        toolbarActionsMapped,
    ] = actionMapper({
            handleClick,
            menuActions: [batchActions, overflowActions, toolbarActions]
        })

    return {
        tableProps: {
            headersItems,
            initialRows: initialRowsMapper(data),
            loading,
            batchActions: batchActionsMapped,
            overflowActions: overflowActionsMapped,
            toolbarActions: toolbarActionsMapped,
        },
        menuAction,
        setReFetch,
        onClose,
    }
}