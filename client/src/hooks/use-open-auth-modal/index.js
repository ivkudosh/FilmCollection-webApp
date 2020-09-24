import {useState} from "react"

export const useOpenAuthModal = () => {
    const [openModal, setOpenModal] = useState(false)
    return {
        openModal,
        setOpenModal
    }
}
