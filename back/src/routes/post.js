const express = require('express')
const PostController = require('../controllers/postController')

const router = express.Router()

router
    .post('/', PostController.newPost)

module.exports = router