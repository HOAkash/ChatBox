const {Server}=require('socket.io');
const http=require('http');
const express=require('express');
const app= express();
const server=http.createServer(app);
const cors=require('cors')

const io=new Server(server,{
cors:{
    origin:'http://localhost:5173',
    methods:['GET','POST'],
},
});
app.use(cors());
app.use(express.json());

io.on('connection',(socket)=>{
    console.log('User connected');
   

socket.on('chatMessage',(msg)=>{
    io.emit('chatMessage',msg);
});

 socket.on('disconnected',()=>{
        console.log('User disconnected');
        
    });
    
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});