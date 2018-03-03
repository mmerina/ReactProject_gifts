var fs = require("fs");
var path = require("path");
var formidable = require("formidable");
var Flower = require("../models/Flower.js");


//显示鲜花有图片接口
exports.showFlowerImages = function (req, res) {
    var orderID = req.params.orderID;
    var picurl = path.resolve(__dirname, "../www/flowers/big_pic/" + orderID);
    var views = fs.readdirSync(picurl + "/views/");
    var introductions = fs.readdirSync(picurl + "/introductions/");

    res.json({"images":{
        views,
        introductions
    }});
}


//显示指定ID鲜花的信息
exports.showFlowerInfo = function (req, res) {
    var orderID = req.params.orderID;

    Flower.find({ "id": orderID }, function (err, docs) {
        res.json({ "result": docs[0] });
    });
}



//显示指定ID花束的相似鲜花
exports.showFlowerLikes = function (req, res) {
    var orderID = req.params.orderID;
    Flower.find({ "id": orderID }, function (err, docs) {
        var type = docs[0].type;
        var mainflower = docs[0].mainflower;

        Flower.find({ type, mainflower }, function (err, docs) {
            res.json({ "results": docs })
        });
    });
}

//查询鲜花
exports.showFlowerSearch = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        var nowfilters = fields.nowfilters;
        var pagination = fields.pagination;
        var sorter = fields.sorter;

        var CHAXUNTI = {};
        nowfilters.forEach(item => {
            if (item.k != "sendObject" && item.k != "purpose") CHAXUNTI[item.k] = item.v;
            if (item.k == "price") {
                CHAXUNTI[item.k] = { "$gte": Number(item.v[0]), "$lte": Number(item.v[1]) };
            }
            //验收送花对象和用途里的每一项
            if (item.k == "sendObject") {
                if (item.v.includes("朋友")) CHAXUNTI["friend"] = true;
                if (item.v.includes("家人")) CHAXUNTI["family"] = true;
                if (item.v.includes("爱人")) CHAXUNTI["lover"] = true;
                if (item.v.includes("领导")) CHAXUNTI["leader"] = true;
                if (item.v.includes("病人")) CHAXUNTI["patient"] = true;
            } else if (item.k == "purpose"){
                if (item.v.includes("浪漫爱情")) CHAXUNTI["romantic"] = true;
                if (item.v.includes("生日祝福")) CHAXUNTI["birthday"] = true;
                if (item.v.includes("友谊万岁")) CHAXUNTI["friendship"] = true;
                if (item.v.includes("诚意致歉")) CHAXUNTI["apologize"] = true;
                if (item.v.includes("温暖亲情")) CHAXUNTI["kinship"] = true;
            }

        });

        Flower.count(CHAXUNTI, function (err, total) {
            Flower
                .find(CHAXUNTI)		
                .sort({ [sorter.sortby]: sorter.sortdirection == "ascend" ? 1 : -1 })	
                .skip(pagination.pagesize * (pagination.page - 1))						
                .limit(pagination.pagesize)											
                .exec(function (err, docs) {												//执行
                    res.json({ total, "results": docs });
                });
        });
    });
}