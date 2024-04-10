
import AgoraRTC from 'agora-rtc-sdk-ng'
import { useEffect, useState } from 'react'
import VideoPlayer from './VideoPlayer'

const APP_ID = '54d6529607cb491fb26b75075c712a8e'
const TOKEN = '007eJxTYMh8syBeOu+CsdtU+9WrVv5/dWHz4u2WJgH9s58pbpKZbHtUgcHUJMXM1MjSzMA8OcnE0jAtycgsydzUwNw02dzQKNEi9RGbaFpDICND59GFLIwMEAjiCzOUZaak5iskJ+bkKBQUJSaXZCanMjAAAL0mJdc='
const CHANNEL = 'video call practice'

const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8'
})

const VideoRoom = () => {
    const [users, setUsers] = useState([])
    const [localTracks, setLocalTracks] = useState([])

    const handleUserJoined = async (user, mediaType) => {
        await client.subscribe(user, mediaType)

        if (mediaType === 'video') {
            setUsers((previousUsers) => [...previousUsers, user])
        }

        if (mediaType === 'audio') {
            // setUsers
        }
    }
    const handleUserLeft = (user) => {
        setUsers((previousUsers) =>
            previousUsers.filter((u) => u.uid !== user.uid)
        )
    }
    useEffect(() => {
        client.on('user-published', handleUserJoined)
        client.on('user-left', handleUserLeft)

        client.join(APP_ID, CHANNEL, TOKEN, null)
            .then((uid) =>
                Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
            ).then(([tracks, uid]) => {
                const [audioTrack, videoTrack] = tracks
                setLocalTracks(tracks)
                setUsers((previousUsers) => [
                    ...previousUsers,
                    {
                        uid,
                        videoTrack,
                        audioTrack,
                    },
                ]);
                client.publish(tracks)
            })

        return () => {
            for (let localTrack of localTracks) {
                localTrack.stop()
                localTrack.close()
            }
            client.off('user-published', handleUserJoined)
            client.off('user-left', handleUserLeft)
            client.unpublish(localTracks).then(() => client.leave())
        }
    }, [])
    return (
        <div>
            <h1>Video room</h1>
            {users.map((user) => (
                <VideoPlayer key={user.uid} user={user} />
            ))}
        </div>
    );
};

export default VideoRoom;