import React, {useCallback, useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {useHistory} from 'react-router'
import flow from 'lodash/flow'
import property from 'lodash/property'

import {AuthContext} from "../../context/AuthContext"

import styles from './narbar.module.css'
import {TextInput} from "carbon-components-react"

import './navbar.css'
import NavBarAuth from "./navbar-auth"

const Navbar = () => {

    const {
        isAuthenticated,
        userIsAdmin,
        setOpenModal,
        searchItems,
        setSearchItems
    } = useContext(AuthContext)
    const history = useHistory()

    const loginHandler = (e) => {
        setOpenModal(true)
    }

    const setVal = useCallback(flow([
        property('target.value'),
        setSearchItems,
    ]), [setSearchItems])

    return (
        <div className={styles.navbar}>
            <div className={styles.blockSearch}>
                <TextInput className={styles.inputSearchPanel}
                           placeholder="Search"
                           labelText=''
                           id="search"
                           value={searchItems}
                           onChange={setVal}
                           onKeyPress={(e) => {
                               if (e.key === 'Enter') {
                                   history.push(`/home?search=${searchItems.split(' ').join('+')}`)
                               }
                           }}
                />
            </div>
            <div className={styles.mainNavLinks}>
                <NavLink to="/home" className={styles.navLink}>Home</NavLink>
                {userIsAdmin && <NavLink to="/users" className={styles.navLink}>Users</NavLink>}
                {isAuthenticated ?
                    <NavLink to="/collections" className={styles.navLink}>My collections</NavLink> :
                    <NavLink to="/" onClick={loginHandler} className={styles.navLink}>
                        My collections
                    </NavLink>
                }
                <NavBarAuth className={styles.secondaryAuthNavLinks}/>
            </div>
            <NavBarAuth className={styles.authNavLinks}/>
        </div>
    )
}

export default Navbar
