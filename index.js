const fs = require( 'fs' );
const express = require('express');
const app = express();
const https = require('https');

const server = https.createServer({
    key: fs.readFileSync('pkc.pem'),
    cert: fs.readFileSync('fcc.pem')
},app);

const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "https://matiomm.cl",
        methods: ["GET", "POST"]
    }
});

let match = {
    'players': {},
    'state': {'still_playing': 0, 'current_dices': 0, 'winner':null, 'started':false},
}

function rollDice() {
    return 1 + Math.floor(Math.random()*6)
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('join game', (nick) => {

        io.emit('probando','hola');

        if (match['state']['started']==false){
            if (match['players'][nick])
                io.emit('nick taken',nick);
            else{
                match['players'][nick] = {'nick': nick, 'dices': [rollDice(),rollDice(),rollDice(),rollDice(),rollDice()], 'lifes': 0, 'status':'playing'};
                match['state']['still_playing']++;
                match['state']['current_dices']+=5;
                io.emit('joined', match);
            }
        }
        else {
            io.emit('current match', match['state']);
        }

    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
