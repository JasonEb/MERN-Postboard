# MERN Post board

A basic social media board demonstrating Node.js, Express, MongoDb, and Mongoose. 

## Installation
1. Git clone repo url
2. Run `npm install` for server 
3. Run `npm frontend-install` to install the frontend. Note that to further manage frontend configuration and dependencies, make sure `cd` to the frontend directory. 

NB: the `config` files are required as well, but those are on the gitignore.  `config/keys.js` is required for mongo Atlas and secret keys, and `config/passport` is needed for authentication. 

```javascript
//keys.js
module.exports = {
    mongoURI: "yourAtlasURL",
    secretOrKey: "yourSecretString"
}
```

```javascript
//passport.js
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('User')
const keys = require('../config/keys')

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = keys.secretOrKey

module.exports = passport => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then( user => {
                if (user) { 
                //returns user to client
                    return done(null, user)
                }
                // else return false for no user
                return done(null, false)
            })
            .catch( err => console.log(err))
    }))
}
```

### Mongo Atlas Setup
During the Setup Notes, the reading will include MongoDB Atlas instructions. When _copying and pasting the connection string_, the string now has a `<dbname>`. I found it unclear what the dbname is nor is it referenced in the reading currently.

However the `dbname` is up to user's discretion; upon naming it Atlas will create a new database with that name. For example, `test_database?retryWrites=...` will automatically create a database named `test_database` on Atlas. 



