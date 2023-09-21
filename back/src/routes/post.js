const express = require('express')
const PostController = require('../controllers/postController')

const router = express.Router()

router
    .get('/', PostController.getAll)
    .post('/', PostController.newPost)
    .post('/likes', PostController.likes)
    .post('/comments', PostController.comments)

module.exports = router