import { Form, Button } from "react-bootstrap"
import FormField from "../../components/formField"
import './style.sass'
import ErrorMessage from "../../components/errorMessage"
import UseBind from '../../hooks/useBind'
import axios from "axios"
import { useContext } from "react"
import { AlertContext } from "../../context/alertContext"

const CryptoJS = require('crypto-js');

const Login = () => {

    const [email, setEmail] = UseBind('')
    const [password, setPassword] = UseBind('')
    const { setMessage, setShow } = useContext(AlertContext)
    
    const verifyUser = async () => {
        
        const login = { email, password }

        const jsonCrypto = CryptoJS.AES.encrypt(JSON.stringify(login).toString(), 'lasanha').toString()
        try {
            const res = await axios.post(`http://localhost:8080/login/users/login`, {jsonCrypto})
            console.log(res)
        } catch (error) {
            setMessage(error.response.data.message)
            console.log(error)
        }
    
    }
    return (
        <>
            <Form>
                <FormField text="email" placeholder="digite seu email" {...setEmail}/>
                <FormField text="senha" placeholder="digite sua senha" {...setPassword}/>                
            </Form>
            <ErrorMessage/>
            <div className="loginBtn">
                <Button onClick={() => verifyUser()}>Login</Button>
            </div>
        </>
    )
}

export default Login