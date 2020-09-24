import React, {useContext} from 'react'

import AnimateModal from "../animate-modal"

import styles from './delete-items-modal.module.css'
import {AuthContext} from "../../../context/AuthContext"
import {useLoadingRequest} from "../../../hooks/use-disabled-primary-button"

const DeleteItemsModal = ({items, operation, onClose, primaryRequest}) => {

    const {token} = useContext(AuthContext)

    const itemsTitles = items.map(({cells, id}) => {
        return {
            id,
            title: cells[0].value,
            dateCreation: cells[2].value
        }
    })

    const {loadingRequest, requestWithLoading} = useLoadingRequest(primaryRequest)

    const deleteItemsById = async (closeModal) => {
        items.map(({id}) => requestWithLoading(token, id))
        await Promise.all(items)
        closeModal()
    }

    return (
        <AnimateModal
            modalLabel={operation}
            primaryButtonText={operation}
            primaryButtonDisabled={loadingRequest}
            onRequestSubmit={deleteItemsById}
            onClose={onClose}
        >
            <div className={styles.centerDeleteModal}>
                <span>You really want to delete </span>
                {
                    itemsTitles.map(({id, title, dateCreation}, idx) => {
                        if (idx !== itemsTitles.length - 1) {
                            return (
                                <span key={id}><strong>«{title} ({dateCreation})»</strong>, </span>
                            )
                        } else {
                            return (
                                <span key={id}><strong>«{title} ({dateCreation})»</strong>?</span>
                            )
                        }
                    })
                }
            </div>
        </AnimateModal>
    )
}

export default DeleteItemsModal