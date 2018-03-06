var fs = require("fs");
var path = require("path");
var formidable = require("formidable");
var File = require("../models/File.js");

//上传文件
exports.uploadfiles = function (req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.resolve(__dirname, "../www/uploads/files");
    form.keepExtensions = true;
    form.parse(req, function (err, fields, files) {
        res.json({ "result": 1, "base": path.parse(files.files.path).base, "ext": path.parse(files.files.path).ext })
    });
}

exports.showFileSearch = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        var keyword = fields.keyword;
        //将字符串真的变为正则
        var keywordRegExp = new RegExp(keyword, "g");
        console.log(keyword);
        var CHAXUNTI = {
            "$or": [
                { "filename": keywordRegExp }
            ]
        };
        File.count(CHAXUNTI, function (err, total) {
            File.find(CHAXUNTI)
                .exec(function (err, docs) {
                    res.json({ total, "results": docs });
                });
        });
    });
}

//文件录入
exports.uploadfileToDatabase = function (req, res) {
    var uploadsbase = path.resolve(__dirname, "../www/uploads/files");
    var filesbase = path.resolve(__dirname, "../www/files");

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        var fileinfo = JSON.parse(fields.fileinfo);
        //移动文件，复制两份
        fs.copyFileSync(uploadsbase + "/" + fileinfo.real, filesbase + "/" + fileinfo.real)

        File.create({
            "filename": fileinfo.filename,
            "real": fileinfo.real,
            "ext": fileinfo.ext
        }, function () {
            res.json({ "result": 1 })
        })
    });
}

//删除文件

exports.deleteFile = function (req, res) {
    var filesbase = path.resolve(__dirname, "../www/files");

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        var fileinfo = JSON.parse(fields.fileinfo);

        var fileURL = path.resolve(filesbase, "./" + fileinfo.real);

        //删除文件
        if (fs.existsSync(fileURL)) {
            fs.unlinkSync(fileURL);
        }

        File.remove({ 'real': fileinfo.real }, function () {
            res.json({ "result": 1 })
        })
    });
}