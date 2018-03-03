var fs = require("fs");
var path = require("path");
var formidable = require("formidable");
var User = require("../models/User.js");

//显示指定ID用户的信息
exports.showUserInfo = function (req, res) {
    var orderID = req.params.orderID;

    User.find({ "id": orderID }, function (err, docs) {
        res.json({ "result": docs[0]});
    });
}

//查询用户
exports.showUserSearch = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        var keyword = fields.keyword;
        var pagination = fields.pagination;
        var sorter = fields.sorter;

        //将字符串真的变为正则
        var keywordRegExp = new RegExp(keyword, "g");

        var CHAXUNTI = {
            "$or": [
                { "name": keywordRegExp },
                { "mobile": keywordRegExp },
                { "logname": keywordRegExp },
                { "email": keywordRegExp }
            ]
        };
        User.count(CHAXUNTI, function (err, total) {
            User
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
