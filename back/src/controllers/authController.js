const User = require('../models/user')
const jwt = require('jsonwebtoken');
require('dotenv').config()

var CryptoJS = require("crypto-js");

class AuthController {
    static async register(req, res) {
        const { jsonCrypto } = req.body
        const json = CryptoJS.AES.decrypt(jsonCrypto, 'lasanha').toString(CryptoJS.enc.Utf8)
        const { name, email, password } = JSON.parse(json)

        if (!name || !email || !password)
            return res.status(400).send({ message: "name or email or password not provider" })

        try {
            // const user = await User.findOne({ email })
            if (await User.findOne({ email }))
                return res.status(400).send({ message: "email ja cadastrado" })

            const passwordCrypt = CryptoJS.AES.encrypt(password, 'lasanha').toString()

            const newUser = new User({
                name: name,
                email: email,
                password: passwordCrypt
            })

            await newUser.save()
            return res.status(201).send({ message: "user created" })
        } catch (error) {
            return res.status(500).send({ message: "something faild" })
        }
    }

    static async login(req, res) {
        const { jsonCrypto } = req.body
        const json = CryptoJS.AES.decrypt(jsonCrypto, 'lasanha').toString(CryptoJS.enc.Utf8)
        const { email, password } = JSON.parse(json)
        if (!email || !password)
            return res.status(400).send({ message: "Email or password not provider" })
        try {
            const user = await User.findOne({ email })
            if (!user)
                return res.status(400).send({ message: "Invalid Email" })
            const passData = CryptoJS.AES.decrypt(user.password, 'lasanha').toString(CryptoJS.enc.Utf8)
            if (passData != password)
            {
                return res.status(400).send({ message: "Invalid password" })
            }

            const secret = 'lasanha'
            console.log(secret)
            const token = jwt.sign(
                {
                    id: user._id,
                },
                secret,
                {
                    expiresIn: '1 day'
                }
            )
            return res.status(200).send({ token: token })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "something wrong" })
        }
    }

}


module.exports = AuthController