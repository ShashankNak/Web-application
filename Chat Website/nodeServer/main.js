//Node server which will handle socket io connections
const io = require('socket.io')(8000,{
    cors: {
        origin: "*"
    }
});


const users = {};


io.on('connection', socket => {
    
    
    socket.on('new-user-joined', name =>{
        console.log("New User " + name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
        
        // const arr = [];
        // for (const name in users){
        //     if (users.hasOwnProperty(name)){
        //         arr.push(users[name]);
        //     }
        // }
        // socket.emit('user-joined',arr);

        // setInterval(()=>{
        //     console.log(arr);
        // },1000)
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message:message,name:users[socket.id]});
    });

    socket.on('disconnect', message =>{
        // socket.emit('left',users);
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })

    // setInterval(() => {
    //     socket.emit('users-available',users);
    // }, 1000);
});


//cd .\nodeServer\
// npm init
// npm i socket.io