const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp'); 
const userContainer = document.querySelector(".userJoined");
const messageContainer = document.querySelector(".container");
const usersavail = document.querySelectorAll(".names");

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const append = (message,position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const useradd = (data) => {
    const userElement = document.createElement('div');
    userElement.innerText = data;
    userElement.classList.add('names');
    userContainer.append(userElement);
}


const updating = (users) => {
    // console.log(arr)
    const arr = [];
    for(var i = usersavail.length; i--; arr.unshift(usersavail[i].textContent));

    usersavail.forEach(ele => {
        ele.remove();
    });


    console.log(users);
    // users.forEach(element => {
    //     if (!(element == name)){
    //         useradd(element);
    //     }
    // });
    // console.log(usersavail);
}

const name = prompt("Enter your Name to Join");
socket.emit('new-user-joined', name);

socket.on('user-joined', users=>{
    append(`${name} joined the chat`,'right');
    // console.log(users);
    // updating(users);
    // useradd(`${name} Joined`);
});

// setInterval(()=>{
//     // console.log('hii');
    
// },1000);

socket.on('receive', data=>{
    append(`${data.name}: ${data.message} `,'left');
});

socket.on('left', data=>{
    append(`${data} left the chat`,'left');
    // updating(data);
});

// socket.on('users-available', users=>{

// });


// function userInclude(user){
//     if (user == name){
//         return;
//     }

//     if (usersavail.includes(user)){

//     }
//     useradd(user);

// }