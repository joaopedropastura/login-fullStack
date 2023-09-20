const mongoose = require('mongoose')

const Post = mongoose.model('posts', {
    userData : Object,
    title: String,
    content: String,
    likes:  [String],
    comments: [Object]
})

module.exports = Post