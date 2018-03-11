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

//上传鲜花图片
exports.uploadflowerimages = function (req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.resolve(__dirname, "../www/uploads/flowerimages/");
    form.keepExtensions = true;
    form.parse(req, function (err, fields, files) {
        res.json({ "result": 1, "base": path.parse(files.viewpics.path).base })
    });
}

//鲜花录入
exports.registerFlower = function (req, res) {
    var uploadsbase = path.resolve(__dirname, "../www/uploads/flowerimages");
    var flowerimagesbase = path.resolve(__dirname, "../www/flowers/big_pic");
    var flowerimagessmallbase = path.resolve(__dirname, "../www/flowers/small_pic");

    Flower.count({}, function (err, count) {
        //有一个id了
        var id = count + 10000000 + 1;

        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields) {
            var values = JSON.parse(fields.values);
            var form0 = values.form0;
            var form1 = values.form1;

            //创建文件夹
            fs.mkdirSync(flowerimagesbase + "/" + id);
            fs.mkdirSync(flowerimagesbase + "/" + id + "/views");
            fs.mkdirSync(flowerimagesbase + "/" + id + "/introductions");
            fs.mkdirSync(flowerimagessmallbase + "/" + id);

            //移动文件，复制两份
            for (var i = 0; i < form1.views.length; i++) {
                fs.copyFileSync(uploadsbase + "/" + form1.views[i], flowerimagesbase + "/" + id + "/views/" + form1.views[i])
                fs.copyFileSync(uploadsbase + "/" + form1.views[i], flowerimagessmallbase + "/" + id + "/" + form1.views[i])
            }
            for (var i = 0; i < form1.introductions.length; i++) {
                fs.copyFileSync(uploadsbase + "/" + form1.introductions[i], flowerimagesbase + "/" + id + "/introductions/" + form1.introductions[i])
            }
            //写入数据库
            Flower.create({
                id,
                "name": form0.name.value,
                "type": form0.type.value,
                "price": Number(form0.price.value),
                "amount": Number(form0.amount.value),
                "mainflower": form0.mainflower.value,
                "others": form0.others.value,
                "package": form0.package.value,
                "color": form0.color.value,
                "words": form0.words.value,
                "volume": parseInt(Math.random() * 50000),
                "friend": form0.sendObject.value.includes("朋友"),
                "family": form0.sendObject.value.includes("家人"),
                "lover": form0.sendObject.value.includes("爱人"),
                "leader": form0.sendObject.value.includes("领导"),
                "patient": form0.sendObject.value.includes("病人"),
                "romantic": form0.purpose.value.includes("浪漫爱情"),
                "birthday": form0.purpose.value.includes("生日祝福"),
                "friendship": form0.purpose.value.includes("友谊万岁"),
                "apologize": form0.purpose.value.includes("诚意致歉"),
                "kinship": form0.purpose.value.includes("温暖亲情"),
                "avatar": form1.views[0],
                "collect": parseInt(Math.random() * 50000)
            }, function () {
                res.json({ "result": 1 })
            })
        });
    });
}