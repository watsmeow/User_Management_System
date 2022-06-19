let Userdb = require('../model/model')

//create and save new user
exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({message: "Cannot be empty"})
        return
    }

    //new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    //save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while creating a create operation"
            })
        })
}

//retrieve and return all users/single user
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id
        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `User id ${id} not found`
                    })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retrieving user with ${id} not found`
                })
            })
    } else {
        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving user"
            })
        })
    }
}

//update a new identified user by user id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({
                message: "Update information cannot be empty"
            })
    }

    const id = req.params.id
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then (data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update user with ${id}, user may not be found`})
        } else {
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({ 
            message: "Error updating user information"})
    })
}

//delete a user with specified user id
exports.delete = (req, res) => {
    const id = req.params.id
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ 
                    message: `Cannot delete user with id ${id}, user id may be invalid`})
            } else {
                res.send({
                    message: "User was deleted successfully"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete user with id ${id}`
            })
        })
}