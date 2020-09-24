import React from 'react'
import {Select, SelectItem, TextInput} from "carbon-components-react"
import {LANGUAGE_ENGLISH, LANGUAGE_RUSSIAN} from "../../../../../constants"

const ContentModalReg = (
    {
        email,
        invalidEmail,
        handleEmail,
        name,
        inValidName,
        handleName,
        password,
        invalidPassword,
        handlePassword,
        defaultLanguage,
        handleLanguage
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
                labelText="Name"
                id="email"
                value={name}
                invalid={!!inValidName}
                invalidText={inValidName}
                onChange={handleName}/>
            <br/>
            <TextInput
                labelText="Password"
                id="password"
                type="password"
                value={password}
                invalid={!!invalidPassword}
                invalidText={invalidPassword}
                onChange={handlePassword}/>
            <br/>
            <Select id="select"
                    labelText="Select
                    language"
                    defaultValue={defaultLanguage}
                    onChange={handleLanguage}
            >
                <SelectItem value="english" text={LANGUAGE_ENGLISH}/>
                <SelectItem value="russian" text={LANGUAGE_RUSSIAN}/>
            </Select>
            <br/>
        </>
    )
}

export default ContentModalReg