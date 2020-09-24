import React, {useEffect} from 'react'
import noop from 'lodash/noop'


export const NotificationTimeout = ({children, onTimeout, delay}) => {
    useEffect(() => {
        const tmt = setTimeout(onTimeout, delay)
        return () => clearTimeout(tmt)
    }, [onTimeout, delay])

    return children

}

NotificationTimeout.defaultProps = {
    children: undefined,
    delay: 0,
    onTimeout: noop,
}
