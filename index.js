var express = require("express");
var bodyParser = require("body-parser");
var parser = bodyParser.urlencoded({extended:false})
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");
app.listen(3000);

var mang = ["Andoid","iOS","Reactjs"];
app.get("/",function(req,res){
  res.render("trangchu");
})

app.post("/getNotes",function(req,res){
  res.send(mang);
});

app.post('/add',parser,function(req,res){
  var newNote = req.body.note;
  mang.push(newNote);
  res.send(mang);
});

app.post('/delete',parser,function(req,res){
  var id = req.body.idDel;
  mang.splice(id,1);
  res.send(mang);
});

app.post('/update',parser,function(req,res){
  var id = req.body.idEdit;
  mang[id] = req.body.content;
  res.send(mang);
});
