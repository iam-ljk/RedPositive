const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');
const bodyParcer = require('body-parser');
const { errors } = require('celebrate')

const app = express();
const port = 5000;

//DB connection
const DBURL = 'mongodb://localhost:27017';
const connectionOptions = { poolSize: 20 }

mongodb.MongoClient.connect(DBURL, connectionOptions, function (err, database) {
    if (err) throw err;
    const db = database.db('intern1');
    app.set('db', db);

    console.log('MongoDB connected');
})

app.use(cors());
app.use(bodyParcer.json());

//Routers
const crudRouter = require('./Routers/crud');
app.use('/api/info', crudRouter);

// Handle 404
app.use((req, res, next) => {
    res.status(404).send('Not Found')
})

// Error handlers
app.use(errors())


// Start Server
app.listen(process.env.PORT || port, () => {
    console.log('connected')
})