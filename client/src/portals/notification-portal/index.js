import React, {createContext, useState, useCallback, useContext, memo} from 'react'
import uniqueId from 'lodash/uniqueId'
import defaultTo from 'lodash/defaultTo'

import {Notification} from './Notification'


const NOTIFICATION_DELAY = 3000

const NotificationsContext = createContext()

export function useNotification() {
    return useContext(NotificationsContext)
}

export const NotificationsProvider = memo(({children, className}) => {
    const [notifications, setNotifications] = useState([])


    const handleNotificationAdd = useCallback(({delay, ...data}) => {
        setNotifications(notifications => [
            ...notifications,
            {
                id: uniqueId('notification_'),
                delay: defaultTo(delay, NOTIFICATION_DELAY),
                ...data,
            },
        ])
    }, [])

    const removeNotification = useCallback(notification => {
        setNotifications(notifications => notifications.filter(n => notification !== n))
    }, [])

    return (
        <NotificationsContext.Provider value={handleNotificationAdd}>
            {children}
            <div style={{position: "fixed", backgroundColor: 'red', color: 'black', top: '100px', margin: '0 40%'}}>
                {notifications.map(notification => (
                    <Notification
                        key={notification.id}
                        notification={notification}
                        removeNotification={removeNotification}
                    />
                ))}
            </div>
        </NotificationsContext.Provider>
    )
})
