const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session')

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;



// Check connection

db.once('open' , function (){
console.log("Connected to MongoDB")
});

// Check for DB errors

db.on('error' , function (err){
  console.log("err")
});


// Init app

const app = express();


// Bring In Models
let Article = require('./models/article') ;


// Load View Engine

app.set('views' , path.join(__dirname, 'views'));
app.set('view engine' , 'pug');

// BODY Parse required Middle ware (github)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Set Public Folder

app.use(express.static(path.join(__dirname, 'public')));


// This data will be fetched from the MongoDB
// let articles = [
//   {
//     id:1,
//     title:"Article 1",
//     author:'Rohito The Author',
//     body:"This is the first article"
//   },
//   {
//     id:2,
//     title:"Article 2",
//     author:'Sanju The Author',
//     body:"This is the second article"
//   },
//   {
//     id:3,
//     title:"Article 3",
//     author:'Lavish The Author',
//     body:"This is the third article"
//   }
// ];


//Express session Middleware

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))


// Express Message Flash Middleware

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


// Express Validator Middleware has been updated and is no longer required.


app.use(expressValidator());

// Home Route

app.get('/' , function (req,res){

  Article.find({} , function (err , articles){
if(err){

  console.log(err)
} else{
  res.render("index" , {
    titles:'Articles',
    articles: articles
});
}

});
});

//Route Files

let articles = require('./routes/articles');
app.use('/articles' , articles)


//Start Server and enter message to acknowledge connection
app.listen(3000 , function(){
  console.log("Server started on Port 3000...")
})
