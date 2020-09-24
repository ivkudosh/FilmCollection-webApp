import map from "lodash/fp/map"
import {Delete16, Blockchain16, } from '@carbon/icons-react'
import {useHistory} from "react-router"

import {BLOCKED, NOT_BLOCKED, ADMIN, USER} from '../../../constants'
import UserActionModal from "../../../components/modals/user-action-modal"
import {blockById, deleteById, makeAdminById, unblockById} from "../../../services"
import {OverflowMenuItem} from "carbon-components-react"
import React, {forwardRef} from "react"
import {useAuth} from "../../../hooks/use-auth"
import {AuthContext} from "../../../context/AuthContext"
import noop from "lodash/noop"

const headersItems = [
    {
        header: 'ID',
        key: 'id'
    },
    {
        header: 'Name',
        key: 'name'
    },
    {
        header: 'email',
        key: 'email'
    },
    {
        header: 'Status',
        key: 'status'
    },
    {
        header: 'Rank',
        key: 'rank'
    },
]

const batchActions = [
    {
        name: 'Block',
        key: 'block'
    },
    {
        name: 'Unblock',
        key: 'unblock'
    },
    {
        name: 'Delete',
        key: 'delete'
    },
    {
        name: 'Make admin',
        key: 'make_admin'
    },

]

const overflowActions = [
    {
        name: 'Block',
        key: 'block'
    },
    {
        name: 'Unblock',
        key: 'unblock'
    },
    {
        name: 'Delete',
        key: 'delete'
    },
    {
        name: 'Make admin',
        key: 'make_admin'
    },
]

const initialRowsMapper = map(({id, name, email, blocked, isAdmin}) => {
    return {
        id,
        name,
        email,
        status: blocked ? BLOCKED : NOT_BLOCKED,
        rank: isAdmin ? ADMIN : USER
    }
})

const renderUserModals = {
    block: UserActionModal,
    unblock: UserActionModal,
    delete: UserActionModal,
    make_admin: UserActionModal,
}

const selectUserRequest = (action) => {
    switch (action) {
        case 'block':
            return blockById
        case 'unblock':
            return unblockById
        case 'delete':
            return deleteById
        case 'make_admin':
            return makeAdminById
        default:
            return null
    }
}

const OverflowActionInfoUserComponent = forwardRef(({id}, ref) => {
    const history = useHistory()
    const {userId} = useAuth(AuthContext)

    const historyPush = (id) => () => {
        if (userId === id) {
            history.push('/collections')
        } else {
            history.push(`/users/${id}`)
        }
    }

    return (
        <OverflowMenuItem
            ref={ref}
            closeMenu={noop}
            key="Collections"
            itemText="Collections"
            onClick={historyPush(id)}
        />
    )
})


export {
    headersItems,
    batchActions,
    overflowActions,
    initialRowsMapper,
    renderUserModals,
    selectUserRequest,
    OverflowActionInfoUserComponent
}