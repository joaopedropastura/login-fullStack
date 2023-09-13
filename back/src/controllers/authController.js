const User = require('../models/user')


require('dotenv').config()

var CryptoJS = require("crypto-js");

class AuthController {
    static async register(req, res) {
        const {jsonCrypto} = req.body
        const json = CryptoJS.AES.decrypt(jsonCrypto, 'lasanha').toString(CryptoJS.enc.Utf8)
        const {name, email, password} = JSON.parse(json)
        
        if(!name || !email || !password)
            return res.status(400).send({ message: "name or email or password not provider" })
        const passwordCrypt = CryptoJS.AES.encrypt(jsonCrypto, 'lasanha').toString()
        
        const user = new User({
            name: name, 
            email: email, 
            password: passwordCrypt
        })

        
        try {
            await user.save()
            return res.status(201).send({message: "user created" })
        } catch(error) {
            return res.status(500).send({ message: "something faild" })
        }
    }
}


module.exports = AuthController