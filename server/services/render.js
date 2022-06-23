const axios = require('axios')

exports.homeRoutes = (req, res) => {
    const base_url = process.env.
    APP_BASE_URL
    //make GET request to /api/users
    axios.get(`${base_url}/api/users`)
        .then(function(response) {
            res.render('index', { users: response.data})
        })
        .catch(err => {
            res.send(err)
        })
}

exports.add_user  = (req, res) => {
    res.render('add_user')
}

exports.update_user = (req, res) => {
    const base_url = process.env.
    APP_BASE_URL
    axios.get(`${base_url}/api/users`, { params: {id: req.query.id}})
        .then(function(userdata){
            res.render('update_user', {user: userdata.data})
        })
        .catch(err => {
            res.send(err)
        })
}