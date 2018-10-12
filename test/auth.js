const axios = require('axios')
const User = require('../models/user')

const testRegister = () => {
  console.log('testing register...')  
  axios.post('http://localhost:4000/auth/register', { 
    email: 'test@email.de', 
    password: 'test'
  }).then( resRegister => { 
    console.log('register successfull')
    console.log('token: '+resRegister.data.token);
    console.log('testing getUser...')
    axios.get('http://localhost:4000/auth/user', {
      headers: {
        'x-access-token': resRegister.data.token
      }
    }).then( resGetUser => {
      console.log('getUser successfull')
      console.log('user: ', resGetUser.data)
      console.log('logout is not needed on backend, client only')
      console.log('testing login...')
      axios.post('http://localhost:4000/auth/login', {
        email: 'test@email.de',
        password: 'test'
      }).then( resLogin => {
        console.log('login successfull')
        console.log('token: '+resLogin.data.token)
        console.log('authentication working. You can remove the auth test from the server.listen callback')
      }).catch(err => {
        console.log('login failed')
      })
    }).catch(err => {
      console.log('getUser failed')      
    })
  }).catch(err => {
    console.log('register failed')
  })
}

module.exports = {
  testRegister
}