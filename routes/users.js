const express = require('express');
const router = express.Router();

// Bring In User Models

let User = require('../models/user') ;

// Regsiter Form

router.get('/register' , function (req, res){

  res.render('register')
});


module.exports = router;
