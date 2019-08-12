//make connection
const socket = io.connect('http://localhost:4000');

//Query DOM
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

//emit event 

btn.addEventListener('click', function (e) {
    e.preventDefault();
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    
});

//broadcasting
message.addEventListener('keypress', function () {
   socket.emit('typing', handle.value); 
});


//listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += `
    <p><strong>${data.handle}: </strong><span>${data.message}</span></p>`
});

socket.on('typing', function (data) {
    feedback.innerHTML = `<p><em>${data} is typing a message</em></p>`
})