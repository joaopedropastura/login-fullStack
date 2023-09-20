import { Button, Form, Modal } from "react-bootstrap"
import FormField from "../formField"
import useBind from "../../hooks/useBind"
import axios from "axios"
import CryptoJS from "crypto-js"
import { useState } from "react"

const NewPost = () => {

    const [title, setTitile] = useBind('')
    const [content, setContent] = useBind('')
    const [message, setMessage] = useState('')
    const [modalShow, setModalShow] = useState(false);


    const outputMessage = () => {
        setMessage(
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


    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
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