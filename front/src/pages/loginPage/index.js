import { Form, Button } from "react-bootstrap"
import FormField from "../../components/formField"
import ErrorMessage from "../../components/errorMessage"
import UseBind from '../../hooks/useBind'
import axios from "axios"
import { useContext } from "react"
import { AlertContext } from "../../context/alertContext"
import { useNavigate } from "react-router-dom";
import style from '../commom.module.sass'
import { useUserContext } from "../../context/userContext"

const CryptoJS = require('crypto-js');


const Login = () => {
    const { token, createToken } = useUserContext();

    createToken('aaaaaaaaaaa')
    console.log(token)

    const [email, setEmail] = UseBind('')
    const [password, setPassword] = UseBind('')
    const { setMessage, setShow } = useContext(AlertContext)
    const navigate = useNavigate();

    const verifyUser = async () => {
        
        const login = { email, password }

        const jsonCrypto = CryptoJS.AES.encrypt(JSON.stringify(login).toString(), 'lasanha').toString()
        try {
            const res = await axios.post(`http://localhost:8080/login/users/login`, {jsonCrypto})
            sessionStorage.setItem("token",res.data.token);
            navigate('/home')

        } catch (error) {
            setMessage(error.response.data.message)
            console.log(error)
        }
    
    }
    return (
        <div id={style.main}>
            <h1>Social Media</h1>
            <div id={style.content}>
                <Form id={style.form}>
                    <FormField text="email" placeholder="digite seu email" {...setEmail}/>
                    <FormField text="senha" type="password" placeholder="digite sua senha" {...setPassword}/>                
                </Form>
                <ErrorMessage/>
                <div className={style.loginBtn}>
                    <Button onClick={() => verifyUser()}>Login</Button>
                </div>
            </div>
            <span>Não possui uma conta? <button onClick={() => navigate('/register')}>Crie agora mesmo!</button></span>
        </div>
    )
}

export default Login