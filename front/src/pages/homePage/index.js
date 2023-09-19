import './style.sass'
import NavBar from '../../components/navBar'
import PostComponent from '../../components/postComponent'
import NewPost from '../../components/newPostComponent'
import { Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from "axios"


const Home = () => {
    const[ flag, setFlag] = useState(false)
    const[ posts , setPosts ] = useState([])

    const NewPostComponent = () => {
        return flag ? <NewPost/> : <></>
    }

    const GetPosts = async () => {
        const res = await (await axios.get(`http://localhost:8080/new-post`)).data.data
        console.log(res)
        setPosts(res)
    }

    useEffect(() => {
        GetPosts()
    }, [])


    return (
        <div id='home'>
            <div>
                { posts && posts.map((p, i) => <PostComponent key={i} props={p} />)}
            </div>
            <NewPostComponent/>
            <div id='new-post-btn'>
                <Button onClick={() => setFlag(!flag)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                    </svg>
                </Button>
            </div>
            <div id='navbar'>
                <NavBar />
            </div>
            
        </div>
    )
}

export default Home