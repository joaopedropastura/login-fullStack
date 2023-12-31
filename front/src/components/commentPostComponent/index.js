import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PostComponent from '../postComponent';
import axios from "axios"
import style from './style.module.sass'
import FormField from '../formField';
import useBind from '../../hooks/useBind';
import CryptoJS from "crypto-js"


const CommentPostComponent = ({ props }) => {
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [comment, setComment] = useBind('')
    const comments = props.comments
    const idPost = props._id

    const handleShow = () => {
        setFullscreen(fullscreen);
        setShow(true);
        console.log(comments)
    }

    const sendComment = async () => {
        const token = sessionStorage.getItem("token")
        const newComment = { token, comment, idPost }
        console.log(newComment)

        try{
            const jsonCrypto = CryptoJS.AES.encrypt(JSON.stringify(newComment).toString(), 'lasanha').toString()
            const res = await axios.post(`http://localhost:8080/new-post/comments`, { jsonCrypto })
            console.log(res)
        } catch (e) {
            console.log(e)
        }
        
    }

    return (
        <div>
            <Button variant="outline-dark" onClick={() => handleShow()}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" />
                </svg> {props.comments.length}
            </Button>
            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Comentários</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PostComponent props={props} />
                    <hr></hr>
                    <div className={style.postcardelem}>
                        {comments && comments.map((p, i) => <PostComponent key={i} props={p} />)}
                    </div>


                </Modal.Body>
                <Modal.Footer id={style.footer}>
                    <div id={style.btnComment}>
                        <FormField {...setComment}/>
                        <Button onClick={() => sendComment()}>reply</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


export default CommentPostComponent