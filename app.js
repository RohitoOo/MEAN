const express = require('express')
const path = require('path')
// Init app
const app = express();

// Load View Engine

app.set('views' , path.join(__dirname, 'views'));
app.set('view engine' , 'pug');



// Home Route


// This data will be fetched from the MongoDB
let articles = [
  {
    id:1,
    title:"Article 1",
    author:'Rohito The Author',
    body:"This is the first article"
  },
  {
    id:2,
    title:"Article 2",
    author:'Sanju The Author',
    body:"This is the second article"
  },
  {
    id:3,
    title:"Article 3",
    author:'Lavish The Author',
    body:"This is the third article"
  }
];

app.get('/' , function (req,res){

  res.render("index" , {
    titles:'Helloooo!',

    articles: articles
});
});

// Add Route

app.get('/articles/add' , function(req,res){

  res.render('add' , {
    title: 'Article'

})

})


app.listen(3000 , function(){

  console.log("Server started on Port 3000...")
})
