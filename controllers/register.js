const handleRegister = (req, res, db, bcrypt) => {
    if (!email || !name || !password) {
        return res.stauts(400).json('Incorrect Form') // return if you dont want to run below
    }
    const { email, name, password } = req.body;
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => { //create a transaction when handling more than two things once
        trx.insert({  //use trx instead of db to insert to login
            hash: hash,
            email: email
        })
            .into('login') //insert to login
            .returning('email') // return the email
            .then(loginEmail => {     //use loginEmail to to do another trx on users
                return trx('users')
                    .returning('*') //knex method to retrun all the column just created from db
                    .insert({
                        email: loginEmail[0].email, //if just loginEmail we are returning an array
                        name: name,
                        joined: new Date()
                    })
                    .then(user => { //user = res. response all the column we just inserted
                        res.json(user)
                    })
            })
            .then(trx.commit) // need to commit after using trx
            .catch(trx.rollback)  //to catch err and rollback
    })
        .catch(err => res.status(400).json('uable to register'))
}

module.exports = {
    handleRegister: handleRegister
};