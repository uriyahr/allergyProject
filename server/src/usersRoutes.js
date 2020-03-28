const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const auth = require('/')
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  tokens: []
});

userSchema.pre('save', async function(next){
  if(!this.isModified('password'))
    return next();
  try{
    // generate salt
    const salt = await bcrypt.genSalt(saltRounds);
    // generate hash with salt
    const hash = await bcrypt.hash(this.password, salt);
    // override plaintext with hashed
    this.password = hash;
    next();
  }catch(error){
    console.log(error);
    next(error);
  }
});

// confused.... until im not

const User = mongoose.model('User', userSchema);

// register user
router.post('/', async (req,res)=>{
  console.log('creating new user...');
  if(!req.body.username || !req.body.password || !req.body.name){
    return res.status(400).send({
      message: 'name, username, password required'
    })
  }
  try{
    // checking if user exists
    const existsUser = await User.findOne({ username: req.body.username });
    if(existsUser) {
      return res.status(403).send({
        message: 'Username taken'
      });
    }

    // creating new user
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name
    });
    console.log('creating user....');
    await user.save();
    login(user,res);
  }catch(error){
    console.log(error);
    return res.sendStatus(500); // internal server error
  }
});

// login user
router.post('/login', async (req, res)=>{
  if(!req.body.username || !req.body.passowrd){
    return res.status(400).send({
      message: 'username and password required'
    })
  }
  try{
    // search user in db
    const existsUser = await User.findOne({username: req.body.username});
    if(!existsUser) {
      return res.status(403).send({
        message: 'the username or password is wrong'
      });
    }

    // check password
    if(!await existsUser.comparePassword(req.body.password)){
      return res.status(403).send({
        message: 'the username or password is wrong'
      });
    }
    login(existsUser,res);
  }catch(error){
    console.log(error);
    return res.sendStatus(500);
  }
})

async function login(user, res){
  let token = auth.generateToken({ id: user._id}, '24h');
  user.removeOldTokens();
  user.addToken(token);
  await user.save;

  return res.cookie("token",token, {
    expires: new Date(Date.now() + 86400 * 1000) // + one day
  }).status(200).send(user);
}


// logout user
router.delete('/', auth.verifyToken, User.verify, async (req, res) => {
  req.user.removeToken(req.token);
  await req.user.save();
  res.clearCookie('token');
  res.sendStatus(200);
});

// get current user logged in
router.put('/', auth.verifyToken, User.verify, async (req,res) => {
  return res.send(req.user);
});

module.exports = {
  model: User,
  routes: router
}