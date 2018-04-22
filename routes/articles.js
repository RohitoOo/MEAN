const express = require('express');
const router = express.Router();

// Bring In Models

let Article = require('../models/article') ;







// Add Route

router.get('/add' , function(req,res){

  res.render('add' , {
    title: 'Article'

})

})


// Create Submit post route

router.post('/add' , function (req, res) {

  req.checkBody('title' , 'Title Is Required').notEmpty();
  req.checkBody('body' , 'Body Is Required').notEmpty();
  req.checkBody('author' , 'Author Is Required').notEmpty();

let errors = req.validationErrors();

if(errors){
res.render('add' , {
  title: 'Add Article',
  errors:errors
})

}
else{

  let article = new Article();

  article.title = req.body.title;
  article.body = req.body.body;
  article.author = req.body.author;

  article.save(function(err){
    if(err){
      console.log(err);
      return;
    }else{
      req.flash('success', "Article Added Successfully");
      res.redirect('/');
    }
  })
}


});


// Create Updated after editing Submit post route

router.post('/edit/:id' , function (req, res) {

let article = {};

article.title = req.body.title;
article.body = req.body.body;
article.author = req.body.author;

let query = {_id:req.params.id }

Article.update(query, article , function(err){
  if(err){
    console.log(err);
    return;
  }else{
    req.flash('success', "Article Edited Successfully");
    res.redirect('/')
  }
})
});


// Route for Edit article

router.get('/edit/:id' , function (req, res) {

  Article.findById(req.params.id, function (err , article ){

    res.render('edit_article' , {
      title: 'Edit_Title',
      article: article
  }) }) })


// Delete Request

router.delete('/:id' , function(req, res){

  let query = {_id:req.params.id}

  Article.remove(query, function (err){

    if(err) {
      console.log(err)
    }
    res.send('Success');
  });
})


// Route for Single article

router.get('/:id' , function (req, res) {

  Article.findById(req.params.id, function (err , article ){

    res.render('article' , {
      article: article
  }) }) })




module.exports = router ;
