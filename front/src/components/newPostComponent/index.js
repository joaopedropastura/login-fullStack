import { Button, Form } from "react-bootstrap"
import FormField from "../formField"
import useBind from "../../hooks/useBind"
import axios from "axios"
import CryptoJS from "crypto-js"
import { useState } from "react"

const NewPost = () => {

    const [title, setTitile] = useBind('')
    const [content, setContent] = useBind('')
    const [message, setMessage] = useState('')

    const outputMessage = () => {
        setMessage (
            <div>
                <span></span>
            </div>
        )
    }

    const sendPost = async () => {
        const token = sessionStorage.getItem("token");
        const newPost = { title, content, token }

        try {
            const jsonCrypto = CryptoJS.AES.encrypt(JSON.stringify(newPost).toString(), 'lasanha').toString()
            const res = await axios.post(`http://localhost:8080/new-post`, { jsonCrypto })
            console.log(res.data.message)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            <Form>
                <FormField text="Título" placeholder="insira o título aqui" {...setTitile} />
                <FormField text="Conteúdo" placeholder="insira o conteúdo aqui" {...setContent} />
            </Form>
            

            <Button onClick={() => sendPost()}> new post </Button>
            
        </div>
    )
}


export default NewPost