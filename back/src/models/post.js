const mongoose = require('mongoose')

const Post = mongoose.model('posts', {
    userId : Object,
    title: String,
    content: String,
    likes: Number
})

module.exports = Post