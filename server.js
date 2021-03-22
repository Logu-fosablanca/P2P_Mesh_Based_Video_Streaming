const express = require('express');
const app = express();
const server = require('http').Server(app)
const { v4: uuidv4 } = require('uuid');

const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const Username = uniqueNamesGenerator({
    dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
    length: 2
});

const io = require('socket.io')(server)

const {ExpressPeerServer} = require('peer')
const peerServer= ExpressPeerServer(server,{
    debug: true,
});

app.use(express.static('public'))

app.use('/peerjs',peerServer)

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
})

app.get('/:room', (req, res) => {
    res.render('room', { roomid: req.params.room ,userid:Username });

})

io.on('connection',(socket)=>{
    socket.on('join-room',(roomid,USERID)=>{
        socket.join(roomid)
        socket.broadcast.to(roomid).emit('user-connected',USERID);
        // console.log("Joined the Room");

    })
})



server.listen(3030);