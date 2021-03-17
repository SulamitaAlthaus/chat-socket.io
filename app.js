const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log("Um usuário está conectado")
    socket.on('disconnect', () => {
        console.log("Usuário desconectado")
    })
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

io.emit('some event', { 
    someProperty: 'some value', 
    otherProperty: 'other value' 
});

http.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})