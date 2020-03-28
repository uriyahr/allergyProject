const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
//const fs = require('fs');
//const https = require('https');


const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended : false
}));

const mongoose = require('mongoose');
const uri = 'mongodb+srv://uriann:stanford@allrgcluster-xc2dx.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(uri,{
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

const cookieParser = require('cookie-parser');
app.use(cookieParser());


// const users = require('./usersRoutes');
// app.use("/users", users.routes);

app.get('/',(req,res) => {
  res.send('Server is listening on port 8080');
});

// https.createServer({
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.cert')
// }),app.listen(8081, () => console.log('Server listening on port 8081'))

app.listen(process.env.PORT || 8080);
