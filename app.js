var express = require("express");
var app = express(); 
var mongoose = require("mongoose");
//链接数据库，/ershouche表示链接到ershouche数据库
mongoose.connect("localhost/gifts");

var flowerCtrl = require("./controllers/flowerCtrl");

app.get("/flowerimages/:orderID", flowerCtrl.showFlowerImages);
app.get("/flowerinfo/:orderID", flowerCtrl.showFlowerInfo);
app.get("/flowerlikes/:orderID", flowerCtrl.showFlowerLikes);
// app.post("/flowersearch", flowerCtrl.showFlowerSearch);

app.use(express.static("www"));

app.listen(8080);