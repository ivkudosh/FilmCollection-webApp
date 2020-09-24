import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'

import {BLOCKED, NOT_BLOCKED, ADMIN, USER} from "../../constants"
import {useHistory} from "react-router-dom"
import {useAuth} from "../../hooks/use-auth"

const Table = () => {
    const columns = [
        {
            title: 'id',
            data: [1, 2, 3],
            flex: 1
        },
        {
            title: 'name',
            data: [1, 2, 3],
            flex: 4
        },
        {
            title: 'email',
            data: [1, 2, 3],
            flex: 1
        },
        {
            title: 'status',
            data: [1, 2, 3],
            flex: 1
        },
        {
            title: 'rank',
            data: [1, 2, 3],
            flex: 2
        },
    ]
    return (
        <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
            {columns.map(column => (
                <div style={{flex: column.flex}}>
                    <span>{column.title}</span>
                    {column.data.map(cell => (
                        <div>{cell}</div>
                    ))}
                </div>
            ))}
        </div>
    )
}

const UsersTable = ({users}) => {
    const [select, setSelect] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const {userId} = useAuth()

    useEffect(() => {
        setSelect(users.length === users.filter((user) => user.checked === true).length)
    }, [users])

    const checkHandler = (id) => (e) => {
        e.stopPropagation()
        dispatch(editUserCheckbox(id))
    }

    const checkAllHandler = () => {
        dispatch(editUserAllCheckbox())
        setSelect(sel => !sel)
    }

    const transition = (id) => () => {
        if (userId === id) {
            return history.push(`/collections`)
        }
        history.push(`/users/${id}`)
    }

    return (
        <table>
            <thead>
            <tr>
                <th className="main-checkbox">
                    <div style={{height: '20px'}}>
                        <label>
                            <input
                                type="checkbox"
                                className="filled-in checkbox-blue-grey"
                                checked={select}
                                onChange={checkAllHandler}/>
                            <span/>
                        </label>
                    </div>
                </th>
                <th>ID</th>
                <th>Name</th>
                <th>email</th>
                <th>Status</th>
                <th>Rank</th>
            </tr>
            </thead>

            <tbody>
            {users.map(({id, name, email, blocked, isAdmin, checked}) => {
                return (
                    <tr key={id} className="cursor-active" onClick={transition(id)}>
                        <td>
                            <div style={{height: '20px'}}>
                                <label onClick={(e) => {
                                    e.stopPropagation()
                                }}>
                                    <input
                                        type="checkbox"
                                        className="filled-in checkbox-blue-grey"
                                        checked={checked}
                                        onChange={checkHandler(id)}
                                    />
                                    <span/>
                                </label>
                            </div>
                        </td>
                        <td>{id}</td>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{blocked ? BLOCKED : NOT_BLOCKED}</td>
                        <td>{isAdmin ? ADMIN : USER}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default UsersTable
