import React, {useContext} from "react"
import {useDispatch, useSelector} from "react-redux"

import axiosRequest from "../../services"
import {fetchUsers} from "../../actionsCreator"
import {AuthContext} from "../../context/AuthContext"
import {storageName} from "../../hooks/use-auth"
import {useMessage} from "../../hooks/use-message"

const Toolbar = () => {

    const {token, logout} = useContext(AuthContext)
    const {usersReducer: {users}} = useSelector(state => state)
    const dispatch = useDispatch()
    const message = useMessage()

    const block = async () => {
        try {
            const usersChecked = users.filter((user) => user.checked)

            if (usersChecked.length !== 0) {

                const usersUnblocked = usersChecked.filter((user) => !user.blocked)

                if (usersUnblocked.length !== 0) {

                    const currentUserId = JSON.parse(localStorage.getItem(storageName)).userId
                    const currentUser = usersChecked.find((user) => user.id === currentUserId)

                    await Promise.all(usersChecked.map((user) => {
                        return axiosRequest.blockById(user.id, token)
                    }))

                    if (currentUser) {
                        message('Your account is blocked.')
                        return logout()
                    }

                    dispatch(fetchUsers(token))
                } else {
                    usersChecked.length === 1 ?
                        message('User is already blocked.') :
                        message('Users are already blocked.')
                }
            }
        } catch (e) {
            message('Your account is blocked or deleted.')
            logout()
        }
    }

    const remove = async () => {
        try {
            const usersChecked = users.filter((user) => user.checked)

            if (usersChecked.length !== 0) {
                const currentUserId = JSON.parse(localStorage.getItem(storageName)).userId
                const currentUser = usersChecked.find((user) => user.id === currentUserId)

                await Promise.all(usersChecked.map((user) => {
                    return axiosRequest.deleteById(user.id, token)
                }))

                if (currentUser) {
                    message('Your account is deleted.')
                    return logout()
                }

                dispatch(fetchUsers(token))
            }
        } catch (e) {
            message('Your account is blocked or deleted.')
            logout()
        }
    }

    const unblock = async () => {
        try {
            const usersChecked = users.filter((user) => user.checked)

            if (usersChecked.length !== 0) {

                const usersBlocked = usersChecked.filter((user) => user.blocked)

                if (usersBlocked.length !== 0) {
                    await Promise.all(usersChecked.map((user) => {
                        return axiosRequest.unblockById(user.id, token)
                    }))

                    dispatch(fetchUsers(token))
                } else {
                    usersChecked.length === 1 ?
                        message('User is not blocked.') :
                        message('Users are not blocked.')
                }
            }
        } catch (e) {
            message('Your account is blocked or deleted.')
            logout()
        }
    }

    const makeAdmin = async () => {
        try {
            const usersChecked = users.filter((user) => user.checked)

            if (usersChecked.length !== 0) {

                const usersBlocked = usersChecked.filter((user) => !user.isAdmin)

                if (usersBlocked.length !== 0) {
                    await Promise.all(usersChecked.map((user) => {
                        return axiosRequest.makeAdminById(user.id, token)
                    }))

                    dispatch(fetchUsers(token))
                } else {
                    usersChecked.length === 1 ?
                        message('User is already admin.') :
                        message('Users is already admin.')
                }
            }
        } catch (e) {
            message('Your account is blocked or deleted.')
            logout()
        }
    }

    return (
        <div className="toolbar-buttons">
            <button className="waves-effect blue darken-3 btn" onClick={block}>Block</button>
            <button className="waves-effect blue darken-3 btn" onClick={unblock}>Unblock</button>
            <button className="waves-effect blue darken-3 btn" onClick={remove}>Delete</button>
            <button className="waves-effect blue darken-3 btn" onClick={makeAdmin}>Make admin</button>
        </div>
    )
}

export default Toolbar
