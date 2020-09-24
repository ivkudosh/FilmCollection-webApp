import React, {useContext, useState} from 'react'
import {FileUploaderDropContainer, Select, SelectItem, TextArea, TextInput} from "carbon-components-react"

import AnimateModal from "../animate-modal"
import {AuthContext} from "../../../context/AuthContext"

import styles from './create-edit-action-collection-modal.module.css'
import {useSelectorCollectionById} from "../../../hooks/use-selector-collection-by-id"
import {THEME_BOOKS, THEME_GAMES, THEME_MOVIES} from "../../../constants"
import {fileUploaderOnAddedFiles} from "../../../utilities-functions"
import {useLoadingRequest} from "../../../hooks/use-disabled-primary-button"

const CreateEditActionCollectionModal = ({onClose, items, userId, operation, primaryRequest}) => {

    const {token} = useContext(AuthContext)

    let id = null
    if (items) {
        id = items[0].id
    }

    const {
        title: defaultTitle,
        description: defaultDescription,
        theme: defaultTheme,
        image: defaultImage,
        itemTitleDefault: defaultIemTitleDefault,
        itemTagsDefault: defaultItemTagsDefault,
    } = useSelectorCollectionById(id)

    if (!id) {
        id = userId
    }

    const {loadingRequest, requestWithLoading} = useLoadingRequest(primaryRequest)

    const [title, setTitle] = useState(defaultTitle)
    const [description, setDescription] = useState(defaultDescription)
    const [theme, setTheme] = useState(defaultTheme)
    const [itemTitleDefault, setItemTitleDefault] = useState(defaultIemTitleDefault)
    const [itemTagsDefault, setItemTagsDefault] = useState(defaultItemTagsDefault)
    const [srcImage, setSrcImage] = useState(defaultImage)

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleTheme = (e) => {
        setTheme(e.target.value)
    }

    const handleItemTitleDefault = (e) => {
        setItemTitleDefault(e.target.value)
    }

    const handleItemTagsDefault = (e) => {
        setItemTagsDefault(e.target.value.split(' '))
    }

    const isChanged = () => {
        return !(defaultTitle === title &&
            defaultDescription === description &&
            defaultTheme === theme &&
            defaultItemTagsDefault.join('') === itemTagsDefault.join('') &&
            defaultImage === srcImage &&
            defaultIemTitleDefault === itemTitleDefault
        )
    }

    const submitCollection = async (closeModal) => {
        if (isChanged()) {
            await requestWithLoading(token, {
                title,
                description,
                theme,
                image: srcImage,
                itemTitleDefault,
                itemTagsDefault
            }, id)
            closeModal()
        }
    }

    return (
        <AnimateModal
            modalHeading={defaultTitle}
            modalLabel={operation}
            primaryButtonText={operation}
            primaryButtonDisabled={loadingRequest}
            onRequestSubmit={submitCollection}
            onClose={onClose}
        >
            <>
                <TextInput
                    labelText="Title"
                    id="title"
                    value={title}
                    onChange={handleTitle}/>
                <br/>
                <TextArea
                    labelText="Description"
                    id="description"
                    value={description}
                    onChange={handleDescription}/>
                <br/>
                <TextInput
                    labelText="Default title for items"
                    id="itemTitleDefault"
                    value={itemTitleDefault}
                    onChange={handleItemTitleDefault}/>
                <br/>
                <TextInput
                    labelText="Default tags for items"
                    id="itemTagsDefault"
                    value={itemTagsDefault.join(' ')}
                    onChange={handleItemTagsDefault}/>
                <br/>
                <Select id="select"
                        labelText="Select theme"
                        defaultValue={defaultTheme}
                        onChange={handleTheme}
                >
                    <SelectItem value={THEME_GAMES} text={THEME_GAMES}/>
                    <SelectItem value={THEME_MOVIES} text={THEME_MOVIES}/>
                    <SelectItem value={THEME_BOOKS} text={THEME_BOOKS}/>
                </Select>
                <br/>

                <div className={styles.center}>
                    {srcImage &&
                    <img
                        className={styles.img}
                        id="target"
                        src={srcImage}
                        alt="collection"
                    />
                    }
                </div>
                <br/>
                <FileUploaderDropContainer
                    accept={['.png']}
                    onAddFiles={fileUploaderOnAddedFiles(setSrcImage)}
                    labelText="Drag and drop image(.png) here or click to upload"
                    id="uploader"
                />
            </>
        </AnimateModal>
    )
}

export default CreateEditActionCollectionModal