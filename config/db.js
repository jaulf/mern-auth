const mongoose = require('mongoose');

const db = mongoose.connect(process.env.MONGO_URI, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true})
.then( () => console.log('Database successfully connected'))
.catch( (err) => console.log(`Logged error:  ${err}`))

module.exports = db;