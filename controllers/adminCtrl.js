var fs = require("fs");
var path = require("path");
var formidable = require("formidable");
var gm = require('gm');
var md5 = require('md5');
var Admin = require("../models/Admin.js");

//显示指定ID管理员的信息
exports.showAdminInfo = function (req, res) {
    var orderID = req.params.orderID;

    Admin.find({ "id": orderID }, function (err, docs) {
        res.json({ "result": docs[0]});
    });
}

//查询管理员
exports.showAdminSearch = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        var keyword = fields.keyword;
        var pagination = fields.pagination;
        var sorter = fields.sorter;

        //将字符串真的变为正则
        var keywordRegExp = new RegExp(keyword, "g");

        var CHAXUNTI = {
            "$or": [
                { "id": keywordRegExp },
                { "name": keywordRegExp },
                { "mobile": keywordRegExp },
                { "email": keywordRegExp },
                { "apartment": keywordRegExp }
            ]
        };
        Admin.count(CHAXUNTI, function (err, total) {
            Admin
                .find(CHAXUNTI)
                .sort({ [sorter.sortby]: sorter.sortdirection == "ascend" ? 1 : -1 })
                .skip(pagination.pagesize * (pagination.page - 1))
                .limit(pagination.pagesize)
                .exec(function (err, docs) {
                    res.json({ total, "results": docs });
                });
        });
    });
}

//注册管理员
exports.registerAdmin = function (req, res) {
    const apartment = [{
        value: '技术中心',
        idx: '03',
        children: [
            {
                value: '质量控制部',
                idx: '01',
                children: [
                    {
                        value: '测试A组',
                        idx: '01',
                    },
                    {
                        value: '测试B组',
                        idx: '02',
                    },
                    {
                        value: '信息技术组',
                        idx: '03',
                    }
                ]
            },
            {
                value: '开发部',
                idx: '02',
                children: [
                    {
                        value: '产品组',
                        idx: '01',
                    },
                    {
                        value: '用户组',
                        idx: '02',
                    },
                    {
                        value: '售后组',
                        idx: '03',
                    }
                ]
            }

        ]
    }];
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        var values = JSON.parse(fields.values);
        var theCenter = values.apartment[0];
        var theApartment = values.apartment[1];
        var theGroup = values.apartment[2];
        var centerObj = apartment.filter((item)=>{return item.value==theCenter})[0];
        var apartmentObj = centerObj.children.filter((item) => { return item.value == theApartment })[0];
        var groupObj = apartmentObj.children.filter((item) => { return item.value == theGroup })[0];

        if (values.id.length == 1){
            var id = centerObj.idx + apartmentObj.idx + groupObj.idx + "00"+ values.id;
        } else if (values.id.length == 2){
            var id = centerObj.idx + apartmentObj.idx + groupObj.idx + "0"+ values.id;
        }else{
            var id = centerObj.idx + apartmentObj.idx + groupObj.idx + values.id;
        }

        for (var key in values){
            if (key == "password"){
                values[key] = md5(values[key]);
            } else if (key == "id"){
                values[key] =id;
            }
        }

        Admin.find({ id }, function (err, docs) {
            if(!docs[0]){
                //写入数据库
                Admin.create({
                    "id": values.id,
                    "name": values.name,
                    "password": values.password,
                    "mobile": values.mobile,
                    "sex":values.sex,
                    "email": values.email,
                    "apartment": values.apartment,
                    "icon": values.icon
                }, function () {
                    res.json({ "result": 1 })
                })
            }else{
                res.json({ "result": -1 })
            }
        });

    });
}

//实现裁切
exports.docut = function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, { w, h, l, t, picurl }, files) {
        gm(path.resolve(__dirname, "../www/uploads/adminicons/" + picurl))
            .crop(w, h, l, t)
            .resize(160, 160)
            .write(path.resolve(__dirname, "../www/admins/icons/" + picurl), function () {
                //改变数据库
                Admin.update({ "id": "030102108" }, { "$set": { "icon": picurl } }, function () {
                    res.json({ "result": 1 });
                });
            });
    });
}

//上传头像
exports.uploadIcon = function (req, res) {
    var form = new formidable.IncomingForm();
    //设置上传路径
    form.uploadDir = path.resolve(__dirname, "../www/uploads/adminicons");
    form.keepExtensions = true;

    form.parse(req, function (err, fields, files) {
        //得到上传之后的文件的名字，因为上传之后文件的名字会被改名。
        var base = path.parse(files.adminavatar.path).base;
        gm(path.resolve(__dirname, "../www/uploads/adminicons/" + base)).size(function (err, size) {
            //上传之后屏幕上显示的内容：
            res.send("<script>window.parent.onUpDone('" + base + "'," + size.width + "," + size.height + ");</script>");
        });
    });
}

//得到头像
exports.showAdminIcon = function (req, res) {
    Admin.find({ "id": "030102108" }, function (err, docs) {
        if (docs[0].icon) {
            var avatar = path.resolve(__dirname, "../www/admins/icons/" + docs[0].icon);
        } else {
            var avatar = path.resolve(__dirname, "../www/admins/icons/defaultAvatar.jpg");
        }
        res.sendFile(avatar);
    });
}
