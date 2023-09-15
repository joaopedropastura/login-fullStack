const express = require('express')
const auth = require('../routes/auth')
const post = require('../routes/post')

module.exports = (app) => {
    app.use(express.json())
    app.use('/login/users', auth)
    app.use('/new-post', post)
}