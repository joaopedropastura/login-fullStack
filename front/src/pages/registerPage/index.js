import { Form, Button } from "react-bootstrap"
import FormField from "../../components/formField"
import axios from 'axios'
import useBind from '../../hooks/useBind'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from '../commom.module.sass'

const CryptoJS = require('crypto-js');

const RegisterPage = () => {
    
    const [name, setName] = useBind('')
    const [email, setEmail] = useBind('')
    const [password, setPassword] = useBind('')

    const [message, setMessage] = useState('')
    const navigate = useNavigate();

    const errorMessage = () => {
        setMessage (
            <div>
                <span>Por favor compelte todos os campos</span>
                <Button onClick={() => setMessage('') }>X</Button>
            </div>
        )
    }

    const userRegister = async () => {

        if(!name || !email || !password)
            return errorMessage();

        const newUser = {
            email,
            name,
            password
        }

        const jsonCrypto = CryptoJS.AES.encrypt(JSON.stringify(newUser).toString(), 'lasanha').toString()

        try{
            const res = await axios.post(`http://localhost:8080/login/users`, {jsonCrypto})
            console.log(res)

        } catch (error) {
            console.log(error.response.data.message)
        }

    }

    return (
        <div id={style.main}>
            <div id={style.content}>
                <Form id={style.form}>
                    <FormField text="email" placeholder="digite seu email"  {...setEmail} />
                    <FormField text="nome" placeholder="digite seu nome" {...setName} />
                    <FormField text="senha" type="password" placeholder="digite sua senha" {...setPassword} />                
                </Form>
                <div>
                    {message}
                </div>
                <div className={style.loginBtn}>
                    <Button onClick={() => userRegister()}>Create account</Button>
                </div>
            </div>
                <span>Já possui uma conta?  <button onClick={() => navigate('/login')}>Login</button></span>
        </div>
    )
}

export default RegisterPage