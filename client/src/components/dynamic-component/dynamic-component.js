import isUndefined from "lodash/isUndefined"
import React from "react"

const DynamicComponent = ({component: Component, ...rest}) => {
    return !isUndefined(Component) && <Component {...rest} />
}

export default DynamicComponent