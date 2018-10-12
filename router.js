const User = require('./routes/userRoutes')
const Authentication = require('./controllers/auth')
const requireAuth = require('./controllers/requireAuth')

module.exports = function(app) {
  app.post('/auth/register', Authentication.register)
  app.post('/auth/login', Authentication.login)
  app.get('/auth/user', requireAuth, User.get)
}
