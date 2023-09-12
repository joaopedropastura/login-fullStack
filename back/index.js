const express = require('express')
const routes = require('./src/routes')
const cors = require('cors')
const app = express()

app.use(cors({
    origin: '*'
}))

require('./src/startup/db')()
require('./src/startup/routes')(app)

const PORT = 8080

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

module.exports = server;