import React from "react"
import {TextInput} from "carbon-components-react"

const ContentModalLogin = (
    {
        email,
        invalidEmail,
        handleEmail,
        password,
        invalidPassword,
        handlePassword
    }) => {
    return (
        <>
            <TextInput
                labelText="Email Address"
                id="email"
                value={email}
                invalid={!!invalidEmail}
                invalidText={invalidEmail}
                onChange={handleEmail}/>
            <br/>
            <TextInput
                labelText="Password"
                id="password"
                type="password"
                value={password}
                invalid={!!invalidPassword}
                invalidText={invalidPassword}
                onChange={handlePassword}
            />
            <br/>
        </>
    )
}

export default ContentModalLogin