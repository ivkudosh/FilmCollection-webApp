import React, {useCallback} from 'react'
import {InlineNotification} from 'carbon-components-react'

export const useMessage = () => {

    return useCallback((text, kind = 'warning') => {

        const message =
            <InlineNotification statusIconDescription={'Hello'} title={text} kind={kind}/>

        if (window.M && text) {
            window.M.toast({html: message})
        }
    }, [])
}
