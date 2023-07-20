 const express = require('express')
 const router = express.Router()


 const {
    register,
    login,
    logout
 } = require('../controllers/authcontroller')

 router.route('/user/signup').post(register)
 router.route('/user/login').post(login)
 router.route('/user/logout').get(logout)
 
 module.exports = router
 