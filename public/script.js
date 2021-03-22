const socket= io('/')

const videoGrid = document.getElementById("videoGrid")
console.log(videoGrid)

const myVideo = document.createElement('video');
myVideo.muted = true;

let myVideoStream

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
})

socket.emit('join-room',ROOM_ID);

socket.on('user-connected',()=>{
    connectToNewUser()
})

const connectToNewUser = ()=>{
   console.log('New User')
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video)
}