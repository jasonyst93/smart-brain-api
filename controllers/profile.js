const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({ id })
        .then(user => {
            if (user.length) { //user is not empty
                res.json(user[0])
            } else {
                res.status(400).json('Not found') //cannot catch empty array error,cause return an empty array is true/okay
            }
        })
        .catch(err => res.status(400).json('Error'))
}

module.exports = {
    handleProfileGet
}