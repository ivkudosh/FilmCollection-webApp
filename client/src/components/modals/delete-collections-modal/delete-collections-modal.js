import React, {useContext} from 'react'

import AnimateModal from "../animate-modal"

import styles from './delete-collections-modal.module.css'
import {AuthContext} from "../../../context/AuthContext"
import {useLoadingRequest} from "../../../hooks/use-disabled-primary-button"

const DeleteCollectionsModal = ({items, operation, onClose, primaryRequest}) => {

    const {token} = useContext(AuthContext)

    const collectionTitlesAndTheme = items.map(({cells, id}) => {
        return {
            id,
            title: cells[0].value,
            theme: cells[3].value
        }
    })

    const {loadingRequest, requestWithLoading} = useLoadingRequest(primaryRequest)

    const deleteCollectionsById = async (closeModal) => {
        items.map(({id}) => requestWithLoading(token, id))
        await Promise.all(items)
        closeModal()
    }

    return (
        <AnimateModal
            modalLabel={operation}
            primaryButtonText={operation}
            onRequestSubmit={deleteCollectionsById}
            primaryButtonDisabled={loadingRequest}
            onClose={onClose}
        >
            <div className={styles.centerDeleteModal}>
                <span>You really want to delete </span>
                {
                    collectionTitlesAndTheme.map(({id, title, theme}, idx) => {
                        if (idx !== collectionTitlesAndTheme.length - 1) {
                            return (
                                <span key={id}><strong>«{title} ({theme})»</strong>, </span>
                            )
                        } else {
                            return (
                                <span key={id}><strong>«{title} ({theme})»</strong>?</span>
                            )
                        }
                    })
                }
            </div>
        </AnimateModal>
    )
}

export default DeleteCollectionsModal