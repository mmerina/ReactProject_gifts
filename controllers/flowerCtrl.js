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

//查询鲜花
exports.showFlowerSearch = function (req, res) {
    //识别前端发来的请求体
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        //得到前端发来的过滤信息，注意这是一个数组
        var nowfilters = fields.nowfilters;
        // //得到前端发来的分页信息
        // var pagination = fields.pagination;
        // //得到前端发来的排序信息
        // var sorter = fields.sorter;
        //查询体，查询体是一个对象，
        var CHAXUNTI = {};
        //现在要做的工作就是遍历数组将对象生成。
        nowfilters.forEach(item => {
            if (item.k != "sendObject" && item.k != "purpose") CHAXUNTI[item.k] = item.v;
            //这里验收一下范围插叙
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
        //查询！
        //数据总量的统计，先计算总量，然后查询
        Flower.count(CHAXUNTI, function (err, total) {
            Flower
                .find(CHAXUNTI)		//过滤寻找
                // .sort({ [sorter.sortby]: sorter.sortdirection == "ascend" ? 1 : -1 })	//排序方法 这里的排序是1表示从小到大，-1反之。
                // .skip(pagination.pagesize * (pagination.page - 1))						//跳过多少条
                // .limit(pagination.pagesize)												//限制多少条
                .exec(function (err, docs) {												//执行
                    res.json({ total, "results": docs });
                });
        });
    });
}