import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Webcam from "./web/WebcamCapture "
import Preview from './Preview';
import Chats from './Chats';
import Chatview from './Chatview';
import { useDispatch, useSelector } from "react-redux"
import Login from './Login';
import { login, logout, selectUser } from './features/appSlice';
import { auth } from './firebase';


function App() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    React.useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch(login({
                    username: authUser.displayName,
                    profilePic: authUser.photoURL,
                    id: authUser.uid,
                }))
            } else {
                dispatch(logout())
            }
        })
    }, [])
    return (<div className="app">
        <Router>
            {!user ? <Login /> : (
                <>
                    <img className="app__logo" src="https://variety.com/wp-content/uploads/2017/11/snapchat-logo.jpg" alt="" />
                    <div className="app__body">


                        <div className="app__bodyBackground">

                            <Switch>

                                <Route path="/chats/view">
                                    <Chatview />
                                </Route> <Route path="/chats" >
                                    <Chats />
                                </Route> <Route path="/preview" >
                                    <Preview />
                                </Route> <Route path="/test" >
                                    <h1 > hello and welcome to the world </h1>
                                </Route> <Route exact path="/" >
                                    <Webcam />

                                </Route> </Switch>
                        </div>
                    </div>
                </>

            )}
        </Router>

    </div>

    );
}

export default App;