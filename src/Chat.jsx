import { Avatar } from '@material-ui/core'
import React from 'react'
import "./Chat.css"
import StopRoundedIcon from "@material-ui/icons/StopRounded"
import ReactTimeago from 'react-timeago'
import { selectedImage } from './features/appSlice'
import { useHistory } from 'react-router-dom'
import { db } from "./firebase"
import { useDispatch } from "react-redux"
function Chat({ username,
    timestamp,
    imageUrl,
    read,
    profilePic, id }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const open = () => {
        if (!read) {
            dispatch(selectedImage(imageUrl));
            db.collection("posts").doc(id).set({
                read: true,
            }, { merge: true });
            history.push('/chats/view')
        }
    }
    return (
        <div onClick={open} className="chat">
            <Avatar src={profilePic} className="avatar__icon" />
            <div className="chat__info">

                <h4>{username}</h4>
                <p>{!read && "Tap to view -"}{" "}
                    <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /></p>
            </div>

            {!read && <StopRoundedIcon className="chat__readIcon" />}
        </div>
    )
}

export default Chat
