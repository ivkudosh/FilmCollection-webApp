const usersForFront = (users) => {
    return users.map(({_id, name, email, blocked, isAdmin}) => {
        return {
            id: _id,
            name,
            email,
            blocked,
            isAdmin
        }
    })
}

module.exports = usersForFront