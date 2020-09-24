import React, {useState} from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import {Provider} from 'react-redux'

import Routes from '../src/routes'
import {useAuth} from "./hooks/use-auth"
import {AuthContext} from "./context/AuthContext"
import NavBar from './components/navbar/navbar'
import store from "./store"
import {useOpenAuthModal} from "./hooks/use-open-auth-modal"

const App = () => {
    const {token, login, logout, userId, userIsAdmin, idLikedItems, setIdLikedItems} = useAuth()
    const {openModal, setOpenModal} = useOpenAuthModal()
    const isAuthenticated = !!token

    const [searchItems, setSearchItems] = useState('')

    return (
        <Provider store={store}>
            <AuthContext.Provider value={{
                token, login, logout, userId, isAuthenticated,
                userIsAdmin, openModal, setOpenModal, searchItems,
                setSearchItems, idLikedItems, setIdLikedItems
            }}>
                <Router>
                    <NavBar/>
                    <div className="contentApp">
                        <Routes isAuthenticated={isAuthenticated} userIsAdmin={userIsAdmin}/>
                    </div>
                </Router>
            </AuthContext.Provider>
        </Provider>
    )
}

export default App
