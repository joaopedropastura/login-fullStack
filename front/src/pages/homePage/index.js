import './style.sass'
import NavBar from '../../components/navBar'
import PostComponent from '../../components/postComponent'
import NewPost from '../../components/newPostComponent'

const Home = () => {
    return (
        <div>
            <NavBar/>
            {/* <PostComponent/> */}

            <NewPost/>
        </div>
    )
}

export default Home