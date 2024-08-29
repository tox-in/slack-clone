const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { default: Chatkit } = require("@pusher/chatkit-server/target/src/chatkit");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

const chatKit = new Chatkit.default({
    instanceLocator: process.env.instanceLocator,
    key: process.env.key
});

app.set('chatKit', chatKit);

const db_uri = process.env.DB_URI;

mongoose.connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() =>{
    console.log("Successfully connected to the database");
})
.catch(err => {
    console.log("Couldn't connect to the database. Exiting now ...", err);
    process.exit();
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;