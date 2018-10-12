var jwt = require('jsonwebtoken')
const User = require('../models/user')
var config = require('../config')

const userToken = id => {
  return jwt.sign({ id }, config.secret, {
    expiresIn: 86400
  })
}

exports.login = (req, res, next) => {
  res.send({ token: userToken(req.userId) })
}

exports.register = (req, res, next) => {
  console.log(req.body);
  
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(422).send({ 
      error: 'Email or password missing!'
    })
  }
  User.findOne({ email }, (err, user) => {
    if (err) { return next(err) }
    if (user) {
      return res.status(422).send({ error: 'Email already in use!' })
    }
    const newUser = new User({ email, password })
    newUser.save( err => {
      if (err) { return next(err) }
      res.json({ token: userToken(newUser._id) })
    })
  })
}