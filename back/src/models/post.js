const mongoose = require('mongoose')

const Post = mongoose.model('posts', {
    userData : Object,
    title: String,
    content: String,
    likes: Number
})

module.exports = Post