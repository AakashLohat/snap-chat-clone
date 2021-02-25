import React from 'react'
import "./Login.css"
import { useDispatch, useSelector } from "react-redux"
import { Button } from '@material-ui/core'
import { auth, provider } from './firebase'
import { login } from './features/appSlice'

function Login() {
    const dispatch = useDispatch()
    const signIn = () => {
        auth.signInWithPopup(provider).then((result) => {
            dispatch(login({
                username: result.user.displayName,
                profilePic: result.user.photoUrl,
                id: result.user.uid,
            }))
        }).catch(error => alert(error.message))
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://variety.com/wp-content/uploads/2017/11/snapchat-logo.jpg" alt="" />
                <Button variant="outlined" style={{ color: 'black', backgroundColor: "white" }} onClick={signIn}>
                    Sign in
            </Button>
            </div>
        </div>
    )
}

export default Login
