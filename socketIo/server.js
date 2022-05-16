//To create a Node server in your server.js file
//To run server : nodemon server 
//To create an express app : npm install --save express

console.log('im here from server.js');

const app = require('./app');
const http = require('http').createServer(app);
const cron = require("node-cron");


app.set('port', process.env.PORT || 3001);
const io = require('socket.io')(http);
global.io = io; //added

  global.io.on('connection', (socket) => {
    console.log('a user connected from server.js io.on connection');
    socket.on('disconnect', () => {
      console.log('user disconnected from server.js io.on disconnect');
    });

    io.on('connection', (socket) => {
        socket.on('chat message', (msg) => {
          console.log('message: ' + msg);
        });
      });

      io.on('connection', (socket) => {
        socket.broadcast.emit('hi');
      });



    // socket.on('my message', (msg) => {
    //   console.log('message: ' + msg);
    //   io.emit('my broadcast', `server: ${msg}`);

    // });

  }); 


  http.listen(3001, () => {
    console.log('listening on :3001');
  });

/** Cron Job */

cron.schedule("0 22 * * *", function() {
  console.log("running a task every minute");

});

app.listen(3126);