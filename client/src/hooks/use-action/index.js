import {useCallback, useState} from "react"

export const useAction = () => {
    const [action, setAction] = useState({})

    const handleClick = useCallback((actionKey, selectedRows) => {
        setAction({action: actionKey, items: selectedRows})
    }, [setAction])

    const onClose = useCallback(() => {
        setAction({})
    }, [setAction])

    return {
        action,
        handleClick,
        onClose,
    }
}