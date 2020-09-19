const faker = require("faker");
const User = require("../models/User");
const Tweet = require("../models/Tweet");
const db = require("../config/keys").mongoURI;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

const { ObjectId } = mongoose.Types

mongoose
  .connect(db, { useNewUrlParser: true })
  .then((conn) => {
    let users = [];
    let newUser = {};
    let tweets = [];

    console.log(`Seed file connected to MongoDB successfully`);

    // WARNING! This code below will delete the database. 
    // Uncomment to enable resetting the database each time the script is ran.
    conn.connection.db.dropDatabase(
      console.log(`${conn.connection.db.databaseName} database dropped.`)
    );
    
    for (let x = 0; x < 10; x++) {
      newUser = {
        _id: new ObjectId(x),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync("test123", 10),
      };
      users.push(newUser);
    }

    for (let y = 0; y < 100; y++) {
      const newTweet = new Tweet({
        _id: new ObjectId(y),
        text: faker.lorem.sentence(),
        user: _.sample(users.map((user) => user._id)),
      });
      tweets.push(newTweet);
    } 

    let promises = [ User.insertMany(users), Tweet.insertMany(tweets) ]

    Promise.all(promises).then ( () => mongoose.connection.close() )
  })
  .catch((err) => console.log(err));
