import {createContext} from 'react'
import noop from 'lodash/noop'

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
    openModal: null,
    setOpenModal: noop,
    searchItems: '',
    setSearchItems: noop,
    idLikedItems: null
})
