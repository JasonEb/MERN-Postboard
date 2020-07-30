const express = require("express")
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const db = require('./config/keys').mongoURI

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

mongoose
    .connect(db, { useNewUrlParser: true})
    .then( () =>  console.log(`Connected to MongoDB successfully`))
    .catch( err => console.log(err))

app.get("/", (req, res) => res.send("Hello again..."))

const port = process.env.PORT || 5000


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/tweets", tweets);


app.listen(port, () => console.log(`Service is running on port ${port}`))
