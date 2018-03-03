var express = require("express");
var app = express(); 
var mongoose = require("mongoose");
mongoose.connect("localhost/gifts");

var flowerCtrl = require("./controllers/flowerCtrl");
var userCtrl = require("./controllers/userCtrl");
var adminCtrl = require("./controllers/adminCtrl");

//鲜花接口
app.get("/flowerimages/:orderID", flowerCtrl.showFlowerImages);
app.get("/flowerinfo/:orderID", flowerCtrl.showFlowerInfo);
app.get("/flowerlikes/:orderID", flowerCtrl.showFlowerLikes);
app.post("/flowersearch", flowerCtrl.showFlowerSearch);

//用户接口
app.get("/userinfo/:orderID", userCtrl.showUserInfo);
app.post("/usersearch", userCtrl.showUserSearch);

//管理员接口
app.get("/admininfo/:orderID", adminCtrl.showAdminInfo);
app.post("/adminsearch", adminCtrl.showAdminSearch);
app.post("/upload", adminCtrl.uploadIcon);
app.get("/adminicon", adminCtrl.showAdminIcon);
app.post("/docut", adminCtrl.docut);
app.post("/registeradmin", adminCtrl.registerAdmin);

app.use(express.static("www"));

app.listen(8888);