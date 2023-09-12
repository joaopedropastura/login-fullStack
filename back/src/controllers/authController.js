const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


require('dotenv').config()


class AuthController {
    static async register(req, res) {
        const {name, email, password} = req.body

        if(!name || !email || !password)
            return res.status(400).send({ message: "name or email or password not provider" })

        const salt = await bcrypt.genSalt(12)
        const passHash = await bcrypt.hash(password, salt)

        const user = new User({
            name: name, 
            email: email, 
            password: passHash
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