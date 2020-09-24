import React from 'react'
import {Loading} from "carbon-components-react"
import styles from "./loader.module.css"

const Loader = () => {
    return <Loading className={styles.loader} withOverlay={false} description="Wait, please..."/>
}

export default Loader