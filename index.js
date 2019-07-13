const express = require('express');
const app = express();
const todos = require('./routes/todos');
const mongoose = require('mongoose');
const config    = require('config');

if(app.get('env') === 'development') {
    console.log('Development mode');

} else {
    console.log('Production mode');
}

mongoose.connect(`mongodb+srv://admin:${process.env.mongoodb_password}@todos-xsc5p.mongodb.net/test?retryWrites=true&w=majority`, { userNewUrlParser: true });

app.use(express.json());

// Add headers
app.use( (req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// GET ROOT URL
app.get('/', (req, res) => {
	res.send('Root URL');
});

// TODOS API
app.use('/api', todos);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));