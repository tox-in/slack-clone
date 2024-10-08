const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Socket } = require("socket.io");
const bodyParser = require("body-parser"); // Import body-parser

require("dotenv").config();

const AuthRoutes = require('./Routes/authRoutes');
const OrganizationRoutes = require('./Routes/organizationRoutes');

const app = express();
const port = process.env.PORT || 5002;
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/organization', OrganizationRoutes);

const db_uri = process.env.DB_URI;

mongoose.connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Successfully connected to the database");
})
.catch(err => {
    console.log("Couldn't connect to the database. Exiting now ...", err);
    process.exit();
});

http.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

io.on('connection', (Socket) => {
    console.log('A user connected');
    
    Socket.on('message', (data) => {
        console.log("Received message:", data);
    });
});

module.exports = app;
