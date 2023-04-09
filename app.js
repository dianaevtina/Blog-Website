const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const ejs = require("ejs");

const app = express();

require('dotenv').config();
const user = process.env.USER;
const password = process.env.PASSWORD;

mongoose.connect("mongodb+srv://" + user + ":" + password + "@cluster0.jzfhkdp.mongodb.net/blogDB");

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  async function findDocument() {
    let foundPosts = await Post.find({}).exec();
    res.render('home', {notes: foundPosts});
  }
  findDocument();
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

  const post = new Post({
    title: req.body.inputTitle,
    content: req.body.inputPost
  });

  post.save(function(err){
   if (!err){
     res.redirect("/");
   }
  });
});

app.get("/posts/:reqPostID", function(req,res){
  const postID = req.params.reqPostID;
  async function findDocument(){
    let foundPost = await Post.findOne({_id: postID});
    res.render('post', {postName: foundPost.title, postContent: foundPost.content});
  }
  findDocument();
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
