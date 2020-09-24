const dateFormat = (dateNow) => {
    if (dateNow) {
        let usaTime = new Date(dateNow).toLocaleString("en-US", {timeZone: "Europe/Minsk"})
        usaTime = new Date(usaTime)
        return usaTime.toLocaleString()
    }
    return dateNow
}

const transformActionKeyToTitle = (string) => {
    return string ?
        string[0].toUpperCase() + string.slice(1).replace('_', ' ') : null
}

const fileUploaderOnAddedFiles = (setImage) => (e, {addedFiles}) => {
    const file = addedFiles[0]
    const reader = new FileReader()
    reader.onload = (e) => {
        setImage(e.target.result)
    }
    reader.readAsDataURL(file)
}

export {
    dateFormat,
    transformActionKeyToTitle,
    fileUploaderOnAddedFiles
}