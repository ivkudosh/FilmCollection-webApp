import React, {useContext} from "react"

import {AuthContext} from "../../../context/AuthContext"
import AnimateModal from "../animate-modal"
import styles from "../delete-items-modal/delete-items-modal.module.css"
import {useLoadingRequest} from "../../../hooks/use-disabled-primary-button"

const UserActionModal = ({onClose, items, operation, primaryRequest}) => {

    const {token} = useContext(AuthContext)

    const usersNames = items.map(({cells, id}) => {
        return {
            id,
            name: cells[1].value
        }
    })

    const {loadingRequest, requestWithLoading} = useLoadingRequest(primaryRequest)

    const request = async (closeModal) => {
        items.map(({id}) => requestWithLoading(token, id))
        await Promise.all(items)
        closeModal()
    }

    return (
        <AnimateModal
            modalLabel={operation}
            primaryButtonText={operation}
            primaryButtonDisabled={loadingRequest}
            onRequestSubmit={request}
            onClose={onClose}
        >
            <div className={styles.centerDeleteModal}>
                <span>You really want to {operation.toLowerCase()} </span>
                {
                    usersNames.map(({id, name}, idx) => {
                        if (idx !== usersNames.length - 1) {
                            return (
                                <span key={id}><strong>«{name}»</strong>, </span>
                            )
                        } else {
                            return (
                                <span key={id}><strong>«{name}»</strong>?</span>
                            )
                        }
                    })
                }
            </div>

        </AnimateModal>
    )
}

export default UserActionModal