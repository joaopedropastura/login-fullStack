const bodyParser = require('body-parser')
const auth = require('./auth')
const post = require('./post')

module.exports = (app) => {
    app.use (
        bodyParser.json(),
        auth,
        post
    )
}