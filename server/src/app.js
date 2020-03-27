const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const https = require('https');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
   extended : false
}));
app.use(bodyParser.json());
app.use(cors());

const mongoose = require('mongoose');
// connect to mongoose database
mongoose.connect('mongodb://localhost:27017/todo',{
  useNewUrlParser: true
});

app.get('/login', (req,res) => {
  res.send({
    message: ('update from login' + req.body.username)
  })
})


app.listen(process.env.PORT || 8080);