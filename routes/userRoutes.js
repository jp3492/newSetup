const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config')

exports.get = async (req, res) => {
  const user = await User.findById(req.userId)
  if (!user) {
    return res.status(404).send('No user found!')
  }
  return res.status(200).send(user)
}