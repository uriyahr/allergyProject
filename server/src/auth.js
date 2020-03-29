const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secret = 'J@NcRfUrijXn2r5u7x';


if (secret == undefined) {
  console.log('must define jwtSecret env to continue');
  mongoose.connection.close();
  process.exit();
}

// generating token
const generateToken = (data, expires) => {
  return jwt.sign(data, secret, {
    expiresIn: expires
  });
};

// verifying token client gave
const verifyToken = (req,res,next) => {
  const token = req.cookies['token'];
  if(!token) {
    return res.status(403).send({
      message: 'No token provided'
    });
  }

  try {
    const decoded = jwt.verify(token,secret);
    // saving user id
    req.user_id = decoded.id;
    req.token = token;
    next();
  } catch(error) {
    console.log(error);
    return res.status(403).send({
      message: 'Failed to authenticate token'
    });
  }
}

const removeOldTokens = (tokens) => {
  return tokens.filter(token => {
    try {
      jwt.verify(token, secret);
      return true;
    } catch(error) {
      return false;
    }
  });
}

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
  removeOldTokens: removeOldTokens
};

