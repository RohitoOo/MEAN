const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
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


// Home Route



app.get('/' , function (req,res){

  Article.find({} , function (err , articles){
if(err){

  console.log(err)
} else{
  res.render("index" , {
    titles:'Helloooo!',
    articles: articles
});
}

});
});

// Add Route

app.get('/articles/add' , function(req,res){

  res.render('add' , {
    title: 'Article'

})

})



// Create Submit post route


app.post('/articles/add' , function (req, res) {

let article = new Article();

article.title = req.body.title;
article.body = req.body.body;
article.author = req.body.author;

article.save(function(err){
  if(err){
    console.log(err);
    return;
  }else{
    res.redirect('/')
  }
})
});

app.listen(3000 , function(){
  console.log("Server started on Port 3000...")
})
