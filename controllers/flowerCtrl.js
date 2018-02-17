var fs = require("fs");
var path = require("path");
var formidable = require("formidable");
//引入mongoose的model文件
var Flower = require("../models/Flower.js");


//显示鲜花有哪些图片的接口
exports.showFlowerImages = function (req, res) {
    //得到:orderID
    var orderID = req.params.orderID;
    //这种花束的文件夹地址
    var picurl = path.resolve(__dirname, "../www/flowers/big_pic/" + orderID);
    //读取4个文件夹，readdirSync表示同步读取文件夹里面的图片名字，生成数组。
    var views = fs.readdirSync(picurl + "/views/");
    var introductions = fs.readdirSync(picurl + "/introductions/");

    res.json({"images":{
        views,
        introductions
    }});
}


//显示指定ID鲜花的信息
exports.showFlowerInfo = function (req, res) {
    //得到:orderID
    var orderID = req.params.orderID;

    Flower.find({ "id": orderID }, function (err, docs) {
        res.json({ "result": docs[0] });
    });
}



//显示指定ID花束的相似鲜花，现在产品经理对“相似鲜花”的定义是：类型type一样、mainflower一样。
exports.showFlowerLikes = function (req, res) {
    //得到:orderID
    var orderID = req.params.orderID;
    //先寻找当前指定花束的type和mainflower
    Flower.find({ "id": orderID }, function (err, docs) {
        var type = docs[0].type;
        var mainflower = docs[0].mainflower;
        //然后寻找和他一样一样的车。
        Flower.find({ type, mainflower }, function (err, docs) {
            res.json({ "results": docs })
        });
    });
}