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

        if (!title || !content)
            return res.status(400).send({ message: "post data not found" })
        const verified = jwt.verify(token, 'lasanha').id


        if (!verified)
            return res.status(401).send({ message: "error: Invalid-token" })
        const { name, _id } = await User.findById(verified)

        const newPost = new Post({
            userData: { name, _id },
            title: title,
            content: content
        })

        try {
            newPost.save()
            return res.status(201).send({ message: "post created" })
        } catch {
            return res.status(500).send({ message: "something faild" })
        }
    }

    static async getAll(req, res) {
        const posts = await Post.find()
        try {
            return res.status(200).send({ data: posts })

        } catch (e) {
            return res.status(500).send({ error: e })
        }
    }

    static async likes(req, res) {
        const { jsonCrypto } = req.body
        const json = CryptoJS.AES.decrypt(jsonCrypto, 'lasanha').toString(CryptoJS.enc.Utf8)
        const { postId, token } = JSON.parse(json)

        const verified = jwt.verify(token, 'lasanha').id

        if (!verified)
            return res.status(401).send({ message: "error: Invalid-token" })

        try {
            const post = await Post.findById(postId)
            const index = post.likes.indexOf(verified)

            index !== -1 ?
                post.likes.splice(index, 1) :
                post.likes.push(verified)

            post.save()
            return res.status(200).send({ data: post })
        } catch (e) {
            console.log(e)
            return res.status(500).send({ error: e })
        }
    }

    static async comments(req, res) {
        // const { jsonCrypto } = req.body
        // const json = CryptoJS.AES.decrypt(jsonCrypto, 'lasanha').toString(CryptoJS.enc.Utf8)
        // const { idPost, comment, token } = JSON.parse(json)
        const { idPost, comment, token } = req.body

        const userVerified = jwt.verify(token, 'lasanha').id

        if(!userVerified)
            return res.status(401).send({ message: "error: invalid-token"})
        const { name } = await User.findById(userVerified)
        const post = await Post.findById(idPost)
        console.log(post)
        const newComment = new Post ({
            content : comment,
            userData: { name }
        })
        
        try {
            post.comments.push(newComment)
            post.save()
            return res.status(201).send({message: "comment created"})
        } catch (e) {
            console.log(e)
            return res.status(500).send({ error: e })
        }
        
    }
}


module.exports = PostController