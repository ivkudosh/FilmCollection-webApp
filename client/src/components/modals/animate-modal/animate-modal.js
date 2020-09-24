import React, {useRef, useEffect, useState, useCallback} from 'react'

import {Modal} from "carbon-components-react"

import noop from 'lodash/noop'
import cond from 'lodash/cond'
import isFunction from 'lodash/isFunction'
import stubTrue from 'lodash/stubTrue'
import identity from 'lodash/identity'

export const ANIMATION_TIMER = 360

const call = (f, ...arg) => f(arg)

const render = cond([
    [isFunction, call],
    [stubTrue, identity]
])

const AnimateModal = (
    {
        onRequestSubmit,
        onRequestClose,
        onClose,
        children,
        component: ModalComponent,
        ...props
    }) => {
    const [open, setOpen] = useState(false)
    const timer = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            setOpen(true)
        })

        return () => {
            clearTimeout(timer.current)
        }
    }, [])

    const delayRequestClose = useCallback(() => {
        setOpen(false)
        timer.current = setTimeout(onClose, ANIMATION_TIMER)
    }, [onClose])

    const handleRequestSubmit = useCallback(
        () => {
            onRequestSubmit(delayRequestClose)
        },
        [onRequestSubmit, delayRequestClose],
    )

    const handleRequestClose = useCallback(
        () => {
            onRequestClose(delayRequestClose)
        },
        [onRequestClose, delayRequestClose],
    )

    return (
        <ModalComponent
            onRequestClose={delayRequestClose}
            onRequestSubmit={handleRequestSubmit}
            secondaryButtonText="Cancel"
            open={open}
            hasForm
            {...props}
        >
            {render(children, delayRequestClose)}
        </ModalComponent>
    )
}


AnimateModal.defaultProps = {
    component: Modal,
    onRequestClose: noop,
    onRequestSubmit: noop,
    onClose: noop,
}

export default AnimateModal