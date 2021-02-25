import React from 'react'
import { resetCameraImage, selectCameraImage } from './features/cameraSlice'
import { useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux"
import CloseIcon from "@material-ui/icons/Close"
import "./Preview.css"
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import { v4 as uuid } from "uuid"
import { storage, db } from "./firebase"
import firebase from "firebase"
import { selectUser } from './features/appSlice';
function Preview() {
    const cameraImage = useSelector(selectCameraImage);
    const dispatch = useDispatch();
    const history = useHistory()
    const user = useSelector(selectUser)
    React.useEffect(() => {
        if (!cameraImage) {
            history.replace('/');
        }
    }, [cameraImage, history])
    const closepreview = () => {
        dispatch(resetCameraImage())
    }
    const sendpost = () => {
        const id = uuid();
        const uploadtask = storage.ref(`posts/${id}`).putString(cameraImage, "data_url")
        uploadtask.on("state_changed", null, (error) => {
            console.log(error)
        }, () => {
            storage.ref('posts').child(id).getDownloadURL().then(url => {
                db.collection('posts').add({
                    imageUrl: url,
                    username: user.username,
                    read: false,
                    profilePic: user.profilePic,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),


                })
                history.replace("/chats")
            })
        })

    }
    return (
        <div className="preview">
            <CloseIcon onClick={closepreview} className="preview__close" />
            <div className="preview__toolbarRight">

                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>

            <img src={cameraImage} alt="" />
            <div onClick={sendpost} className="preview__footer">
                <h2>Send Now</h2>
                <SendIcon className="preview__sendIcon" />
            </div>
        </div>
    )
}

export default Preview
