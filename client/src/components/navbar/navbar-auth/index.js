import React, {useContext} from "react"

import styles from "../narbar.module.css"
import {NavLink, useHistory} from "react-router-dom"
import {AuthContext} from "../../../context/AuthContext"


const NavBarAuth = ({className}) => {

    const {isAuthenticated, setOpenModal, logout} = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = async () => {
        await logout()
        history.push('/home')
    }

    const loginHandler = (e) => {
        setOpenModal(true)
    }

    return (
        <div className={className}>
            {isAuthenticated ?
                <NavLink to="/" className={styles.navLink} onClick={logoutHandler}>Log out</NavLink> :
                <NavLink to="/" onClick={loginHandler} className={styles.navLink}>
                    Log in
                </NavLink>
            }
        </div>
    )
}

export default NavBarAuth