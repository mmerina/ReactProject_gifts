var fs = require("fs");
var path = require("path");
var Mock = require("mockjs");
var Random = Mock.Random;

var xieruwenjianURL = path.resolve(__dirname, "./mockUserData.txt");
var userImgURL = path.resolve(__dirname, "../www/users/icons");


if (fs.existsSync(xieruwenjianURL)) {
    fs.unlinkSync(xieruwenjianURL);
}

console.log("原来的‘mockUserData.txt’已经删除，即将开始写入新数据...");


for (var i = 0; i < 5000; i++) {
    var address=[];
    for(var j=0;j<parseInt(Math.random()*3);j++){
        address.push(Random.county(true));
    }
    var o = {
        "id": parseInt(new Date().getFullYear().toString()+(i + 100000)),
        "loginname": Mock.mock('@string("lower", 7, 10)'),						
        "password": "E10ADC3949BA59ABBE56E057F20F883E",	
        "name": Random.ctitle(5),					
        "mobile": Mock.mock(/^((13[0-9])|(14[57])|(15([5-9]))|(18[5-9]))\d{8}$/),			
        "sex": Random.pick(["男", "女"]),
        "email": Random.email(),
        address
    }
   
    fs.appendFileSync(xieruwenjianURL, JSON.stringify(o) + "\r\n");
}
console.log("已经写入5000条新数据，快打开‘mockUserData.txt’看看吧！");
