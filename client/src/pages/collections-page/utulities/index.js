import React, {forwardRef} from "react"
import {useHistory} from "react-router"
import {OverflowMenuItem} from "carbon-components-react"
import noop from "lodash/noop"
import map from "lodash/fp/map"
import {createCollectionByUserId, editCollectionById, deleteCollectionById} from "../../../services"
import CreateEditActionCollectionModal from "../../../components/modals/create-edit-action-collection-modal"
import DeleteCollectionsModal from "../../../components/modals/delete-collections-modal/delete-collections-modal"

const headersItems = [
    {
        header: 'Title',
        key: 'title'
    },
    {
        header: 'Description',
        key: 'description'
    },
    {
        header: 'Default title for items',
        key: 'itemTitleDefault'
    },
    {
        header: 'Theme',
        key: 'theme'
    },
]

const batchActions = [
    {
        name: 'Delete',
        key: 'delete'
    },
]

const overflowActions = [
    {
        name: 'Edit',
        key: 'edit'
    },
    {
        name: 'Delete',
        key: 'delete'
    },
]

const toolbarActions = [
    {
        name: 'Create',
        key: 'create'
    }
]

const initialRowsMapper = map(({id, title, description, theme, image, itemTitleDefault, itemTagsDefault}) => {
    return {
        id,
        title,
        description,
        theme,
        image,
        itemTitleDefault,
        itemTagsDefault
    }
})

const renderCollectionModal = {
    delete: DeleteCollectionsModal,
    edit: CreateEditActionCollectionModal,
    create: CreateEditActionCollectionModal
}

const selectCollectionRequest = (action) => {
    switch (action) {
        case 'edit':
            return editCollectionById
        case 'create':
            return createCollectionByUserId
        case 'delete':
            return deleteCollectionById
        default:
            return null
    }
}

const OverflowActionInfoCollectionComponent = forwardRef(({id}, ref) => {
    const history = useHistory()

    const historyPush = (id) => () => {
        history.push(`/collections/${id}`)
    }

    return (
        <OverflowMenuItem
            ref={ref}
            closeMenu={noop}
            key="Items"
            itemText="Items"
            onClick={historyPush(id)}
        />
    )
})

export {
    headersItems,
    batchActions,
    overflowActions,
    toolbarActions,
    initialRowsMapper,
    renderCollectionModal,
    selectCollectionRequest,
    OverflowActionInfoCollectionComponent
}