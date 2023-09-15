import { Button, Form } from "react-bootstrap"
import FormField from "../formField"
import useBind from "../../hooks/useBind"
import axios from "axios"
import CryptoJS from "crypto-js"

const NewPost = () => {

    const [title, setTitile] = useBind('')
    const [content, setContent] = useBind('')


    const sendPost = async () => {
        const token = sessionStorage.getItem("token");
        const newPost = { title, content, token }

        try{
            const jsonCrypto = CryptoJS.AES.encrypt(JSON.stringify(newPost).toString(), 'lasanha').toString()
            const res = await axios.post(`http://localhost:8080/new-post`, {jsonCrypto})
        } catch(e) {
            console.log(e)
        }
        console.log(token)
    }
    return (
        <div>
            <Form>
                <FormField text="Título" placeholder="insira o título aqui" {...setContent} />
                <FormField text="Conteúdo" placeholder="insira o conteúdo aqui" {...setTitile} />
            </Form>
            <Button onClick={() => sendPost()}> me clica </Button>
        </div>
    )
}


export default NewPost