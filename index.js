'use strict'

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const opn = require('opn');
const _ = require('lodash');
const create = require('./fakerObjects/dataFakerCreator.js');

const port = 3001;
const url = 'http://localhost:' + port;
const stocks = [];
const ips = [];
const intervals = [];
const millisecs = 1000;
const updateObject = (item) => {
    const data = item.dataAttribute;
    const val = item.generator.next();
    item[data] = val.value;
    console.log(item);
    io.emit('broad', item);
};

_.forEach(_.range(0, 3), (key) => {
    console.log(key);
    stocks[key] = create('stock');
    ips[key] = create('ip');
});


// Express app setup
app.use(express.static(__dirname + '/node_modules'));

app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/start', function(req, res,next) {
    _.forEach(stocks, (key) => {
        intervals.push(setInterval(updateObject, millisecs, key));
    });
    _.forEach(ips, (key) => {
        intervals.push(setInterval(updateObject, millisecs, key, io));
    });
});
app.get('/stop', function(req, res,next) {
    _.forEach(intervals, (interval) => {
        clearInterval(interval);
    });
    console.log('data streaming has stopped');
});

//socket.io server setup

io.on('connection', function(client) {
    console.log('Client connected...');
    client.on('join', function(data) {
        console.log('join data received ' + data);
        client.emit('greet', 'Hello from server');
        const setup = {
            stocks,
            ips
        };
        client.emit('prepare', setup);
    });
    client.on('event', function(data){
        console.log('event data received ');
        console.log(data);
    });
    client.on('disconnect', function(){
        console.log('disconnected');
    });
});

// Tell the server what port to run on
server.listen(port);


try {
    opn(url);
} catch (e) {
    console.log('Please open ', url, ' in a browser.');
}

