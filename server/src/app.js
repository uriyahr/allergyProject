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
  useNewUrlParser: true ,
  useUnifiedTopology: true
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.send("IM RECIEVING YOU.");
});

app.get("/api", async (req, res) => {
  res.send("IM RECIEVING YOU 2.");
});

const users = require('./usersRoutes.js');
app.use("/api/users", users.routes);

app.listen(3000, () => {
  console.debug('Server listening on 3000');
});

// https.createServer({
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.cert')
// }),app.listen(8080, () => console.log('Server listening on port 8080'))
