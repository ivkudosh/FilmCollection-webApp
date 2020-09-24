import React, {useCallback, useContext, useState} from "react"

import {AuthContext} from "../../../context/AuthContext"
import {loginRequest, registerRequest} from '../../../services'
import AnimateModal from "../animate-modal"
import AuthVkLogin from "../../auth-socials/auth-vk-login"
import AuthGoogleLogin from "../../auth-socials/auth-google-login"
import ContentModalLogin from "./utilities/content-modal-login"
import ContentModalReg from "./utilities/content-modal-reg"
import {LANGUAGE_ENGLISH} from "../../../constants"
import {useLoadingRequest} from "../../../hooks/use-disabled-primary-button"
import {useResetAllErrors} from "../../../hooks/use-reset-all-errors"

import styles from './auth-modal.module.css'


const invalidDataLogin = (email, password) => {
    return !(email && email.includes('@') && password.length >= 6)
}

const invalidDataReg = (email, name, password) => {
    return !(!invalidDataLogin(email, password) && name)
}

const AuthModal = () => {

    const {login, setOpenModal} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [invalidName, setInvalidName] = useState('')
    const [language, setLanguage] = useState(LANGUAGE_ENGLISH)
    const [invalidEmail, setInvalidEmail] = useState('')
    const [password, setPassword] = useState('')
    const [invalidPassword, setInvalidPassword] = useState('')

    const [authModal, setAuthModal] = useState(true)

    const {
        loadingRequest: loadingLogin,
        requestWithLoading: loginWithLoading,
        setLoadingRequest: setLoginWithLoading
    } = useLoadingRequest(loginRequest)
    const {
        loadingRequest: loadingReg,
        requestWithLoading: regWithLoading,
        setLoadingRequest: setRegWithLoading
    } = useLoadingRequest(registerRequest)

    const {resetAllErrors} = useResetAllErrors()

    const handleEmail = (e) => {
        const {value} = e.target
        setEmail(value)
        if (value && value.includes('@')) {
            setInvalidEmail('')
        } else {
            setInvalidEmail('Invalid email. Example: example@gmail.com')
        }
    }

    const handleName = (e) => {
        const {value} = e.target
        setName(value)
        if (value) {
            setInvalidName('')
        } else {
            setInvalidName('Invalid name')
        }
    }

    const handleLanguage = (e) => {
        const {value} = e.target
        setLanguage(value)
    }

    const handlePassword = (e) => {
        const {value} = e.target
        setPassword(value)
        if (value.length >= 6) {
            setInvalidPassword('')
        } else {
            setInvalidPassword('Password must be more than 6 characters')
        }
    }

    const handleErrorAuth = useCallback((e) => {
        if (e.response.status === 400) {
            const {message} = e.response.data
            message.includes('password') ?
                setInvalidPassword(message) :
                setInvalidEmail(message)
            resetAllErrors()
        }
    }, [])

    const loginHandler = async (closeModal) => {
        if (!invalidDataLogin(email, password)) {
            try {
                const {
                    data: {
                        token,
                        userId,
                        userIsAdmin,
                        idLikedItems
                    }
                } = await loginWithLoading({email, password})
                login(token, userId, userIsAdmin, idLikedItems)
                resetAllErrors()
                closeModal()
            } catch (e) {
                handleErrorAuth(e)
                setLoginWithLoading(false)
            }
        }
    }

    const regHandler = async (closeModal) => {
        if (!invalidDataReg(email, name, password)) {
            try {
                await regWithLoading({email, name, password, language})
                closeModal()
            } catch (e) {
                handleErrorAuth(e)
                setRegWithLoading(false)
            }
        }
    }

    const toggleContentModal = (e) => {
        e.preventDefault()
        setAuthModal(s => !s)
    }

    const memoizedCloseModal = useCallback(() => {
        setOpenModal(false)
    }, [setOpenModal])

    const isPrimaryButtonDisabled = () => {
        return loadingLogin ||
            loadingReg ||
            (authModal ?
                invalidDataLogin(email, password) :
                invalidDataReg(email, name, password))
    }

    return (
        <AnimateModal
            modalHeading={authModal ? 'Log in to your account' : 'Create your account'}
            primaryButtonText={authModal ? "Log in" : 'Sign Up'}
            primaryButtonDisabled={isPrimaryButtonDisabled()}
            onRequestSubmit={authModal ? (loginHandler) : regHandler}
            onClose={memoizedCloseModal}
        >
            {
                authModal ?
                    <ContentModalLogin
                        email={email}
                        handleEmail={handleEmail}
                        invalidEmail={invalidEmail}
                        password={password}
                        handlePassword={handlePassword}
                        invalidPassword={invalidPassword}
                    /> :
                    <ContentModalReg
                        email={email}
                        handleEmail={handleEmail}
                        invalidEmail={invalidEmail}
                        name={name}
                        handleName={handleName}
                        inValidName={invalidName}
                        password={password}
                        handlePassword={handlePassword}
                        invalidPassword={invalidPassword}
                        defaultLanguage={language}
                        handleLanguage={handleLanguage}
                    />
            }
            <div className={styles.loginWith}>Log in with:</div>
            <br/>
            <div className={styles.socialAuth}>
                <div className={styles.itemSocialAuth}><AuthVkLogin/></div>
                <div className={styles.itemSocialAuth}><AuthGoogleLogin/></div>
            </div>
            <br/>
            <div className={styles.textFooterModal}>
                {authModal ? 'Don\'t have an account? ' : 'Do you already have an account? '}
                <a className={styles.linkToggle}
                   onClick={toggleContentModal}
                >
                    {authModal ? 'Sign Up' : 'Log in'}
                </a>
            </div>
        </AnimateModal>
    )
}

export default AuthModal