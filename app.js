const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");

let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.render('home', {notes: posts});
});

app.get("/contact", function(req,res){
  res.render('contact');
});

app.get("/about", function(req,res){
  res.render('about');
});

app.get("/compose", function(req,res){
  res.render('compose');
});

app.post("/compose", function(req,res){
  const post = {
    title : req.body.inputTitle,
    postText : req.body.inputPost
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req,res){
  posts.forEach(function(post){
    if (_.lowerCase(post.title) === _.lowerCase(req.params.postName)){
      res.render('post', {postName: post.title, postContent: post.postText});
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
