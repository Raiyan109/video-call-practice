import { useEffect, useRef } from "react";

const VideoPlayer = ({ user }) => {
    const playerRef = useRef()

    useEffect(() => {
        user.videoTrack.play(playerRef.current)
    }, [])
    return (
        <div className="flex">
            uid : {user.uid}
            <div className="flex justify-center items-center">
                <div ref={playerRef} className="w-80 h-80 p-5 rounded-full">

                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;