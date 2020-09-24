import {useState} from "react"

export const useLoadingRequest = (request) => {
    const [loadingRequest, setLoadingRequest] = useState(false)

    const requestWithLoading = async (...args) => {
        setLoadingRequest(true)
        const data = await request(...args)
        setLoadingRequest(false)
        return data
    }

    return {
        loadingRequest,
        requestWithLoading,
        setLoadingRequest
    }
}