import React, {memo, useCallback} from 'react'
import {InlineNotification} from 'carbon-components-react'
import {NotificationTimeout} from './NotificationTimout'

import {useCurrState} from "../../hooks/use-curr-state"

export const Notification = memo(({notification, removeNotification}) => {
    const getRef = useCurrState({notification, removeNotification})
    const handleRemove = useCallback(() => {
        const {removeNotification, notification} = getRef()

        removeNotification(notification)
    }, [getRef])

    return (
        <NotificationTimeout delay={notification.delay} onTimeout={handleRemove}>
            <InlineNotification
                {...notification}
                className={notification.className}
                onCloseButtonClick={handleRemove}
            />
        </NotificationTimeout>
    )
})
