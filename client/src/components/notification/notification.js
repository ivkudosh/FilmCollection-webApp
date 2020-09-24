import React, {useEffect, useState} from "react"
import {InlineNotification} from "carbon-components-react"

import styles from './notification.module.css'

const Notification = ({text, kind, delay}) => {

    const [isOpen, setOpen] = useState(true)

    useEffect(() => {
        setTimeout(() => setOpen(false), delay)
    })

    return (
        <>
            {isOpen &&
            <InlineNotification
                className={styles.notification}
                kind={kind}
                title={text}
                statusIconDescription={kind}
            />}
        </>
    )
}

Notification.defaultProps = {
    kind: 'warning',
    delay: 2000,
}

export default Notification