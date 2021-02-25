import { Avatar } from '@material-ui/core'
import React from 'react'
import "./Chats.css"
import { auth, db } from "./firebase"
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import Chat from './Chat';
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from './features/appSlice';
import { resetCameraImage } from './features/cameraSlice';
import { useHistory } from 'react-router-dom';
function Chats() {
    const [posts, setPosts] = React.useState([])
    const user = useSelector(selectUser)
    const history = useHistory()
    const dispatch = useDispatch()
    React.useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
        }))))
    }, [])
    console.log(posts)
    const takeSnap = () => {
        dispatch(resetCameraImage())
        history.push('/')
    }
    return (
        <div className="chats">
            <div className="chats__header">
                <Avatar src={user.profilePic} onClick={() => auth.signOut()} className="chats__avatar" />
                <div className="chats__search">
                    <SearchIcon className="chats__searchIcon" />
                    <input type="text" placeholder="Friends" />
                </div>
                <ChatBubbleIcon className="chats__chatIcon" />
            </div>
            <div className="chat__posts">
                {posts.map(({ id, data: { profilePic, username, timestamp, imageUrl, read } }) => {
                    return (<Chat key={id}
                        id={id}
                        username={username}
                        timestamp={timestamp}
                        imageUrl={imageUrl}
                        read={read}
                        profilePic={profilePic} />
                    )

                })}



            </div>
            <RadioButtonUncheckedIcon
                className="chats__takePicIcon"
                onClick={takeSnap}
                fontSize='large' />
        </div>
    )
}

export default Chats
