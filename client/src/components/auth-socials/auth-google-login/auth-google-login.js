import React, {useContext} from 'react'
import GoogleLogin from "react-google-login"

import {AuthContext} from "../../../context/AuthContext"
import {useHttp} from "../../../hooks/use-http"

import styles from "../auth-socials.module.css"
import {useResetAllErrors} from "../../../hooks/use-reset-all-errors"

const AuthGoogleLogin = () => {

    const {login} = useContext(AuthContext)
    const {request} = useHttp()
    const {resetAllErrors} = useResetAllErrors()

    const googleResponse = async (res) => {
        console.log(res);
        const {email={}, name={}, googleId={}} = res.profileObj ? res.profileObj : {}
        const authData = {
            email,
            name,
            password: googleId
        }
        const {
            token,
            userId,
            userIsAdmin,
            idLikedItems
        } = await request('/api/auth/social', 'POST', authData)
        resetAllErrors()
        login(token, userId, userIsAdmin, idLikedItems)
    }

    return (
        <GoogleLogin
            clientId="849062471994-oakfm94qoh576jrftfbttkq6tu0ou7bc.apps.googleusercontent.com"
            onSuccess={googleResponse}
            onFailure={googleResponse}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
                <img
                    className={styles.logoAuthGoogle}
                    alt="google"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                    onClick={renderProps.onClick}
                />
            )}
        />
    )
}

export default AuthGoogleLogin