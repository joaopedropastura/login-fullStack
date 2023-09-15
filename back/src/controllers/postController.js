const Post = require('../models/post')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

var CryptoJS = require('crypto-js')

class PostController {
    static async newPost(req, res) {
        const { jsonCrypto } = req.body
        const json = CryptoJS.AES.decrypt(jsonCrypto, 'lasanha').toString(CryptoJS.enc.Utf8)
        const { token, title, content } = JSON.parse(json)

        if(!title || !content)
            return res.status(400).send({ message: "post data not found" })
        const verified = jwt.verify(token, 'lasanha').id
    
        if(!verified)
           return res.status(401).send({ message: "error: Invalid-token"})
        const user = await User.findById( verified )
        
    }
}


module.exports = PostController