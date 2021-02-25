import React from 'react'
import { useHistory } from 'react-router-dom'
import "./Chatview.css"
import { selectSelectedImage } from "./features/appSlice"
import { useSelector } from "react-redux"
import { CountdownCircleTimer } from "react-countdown-circle-timer"

function Chatview() {
    const selectedImage = useSelector(selectSelectedImage)
    const history = useHistory()
    React.useEffect(() => {
        if (!selectedImage) {
            exit()
        }

    }, [selectedImage])
    const exit = () => {
        history.replace('/chats')
    }
    return (
        <div className="chatView">
            <img src={selectedImage} alt="" />
            <div className="chatView__timer">

                <CountdownCircleTimer
                    isPlaying
                    duration={10}
                    strokeWidth={6}
                    size={50}
                    colors={[
                        ['#004777', 0.33],
                        ['#F7B801', 0.33],
                        ['#A30000', 0.33],
                    ]}
                >
                    {({ remainingTime }) => {
                        if (remainingTime == 0) {
                            exit()
                        }
                        return remainingTime;
                    }}

                </CountdownCircleTimer>
            </div>
        </div>
    )
}

export default Chatview
