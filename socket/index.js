const io = require('socket.io')(3002,{
    cors:{
        origin:"http://localhost:3000"

    }
});

const users = []

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id);
    users.push(socket.id)
    socket.on("message",(dat)=>{
        console.log(dat)
      io.emit("message",{message:dat , userId:socket.id})
      
    })

    socket.on("disconnect", ()=>{
        console.log("user disconnected")
        delete users[socket.id]
    })

})