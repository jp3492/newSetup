const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
}, { timestamps: true })

userSchema.pre('save', function(next) {
  const user = this
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) { return next(err) }
      user.password = hash
      next()
  })
})

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err) }
    callback(null, isMatch)
  })
}

const ModelClass = mongoose.model('user', userSchema)
module.exports = ModelClass
