var fs = require("fs");
var path = require("path");
var Mock = require("mockjs");
var Random = Mock.Random;

var jishujuURL = path.resolve(__dirname, "./基数据.json");
var xieruwenjianURL = path.resolve(__dirname, "./mockFlowerData.txt");
var flowerimages_smallURL = path.resolve(__dirname, "../www/flowers/small_pic");


//如果已经要写入的文件存在，就删除准备写入的文件
if (fs.existsSync(xieruwenjianURL)) {
    fs.unlinkSync(xieruwenjianURL);
}

console.log("原来的‘mockFlowerData.txt’已经删除，即将开始写入新数据...");

//读取文件
fs.readFile(jishujuURL, function (err, content) {
    var arr = JSON.parse(content.toString());
    for (var i = 0; i < arr.length; i++) {
        arr[i].collect = parseInt(Math.random() * 10000);
        arr[i].avatar = fs.readdirSync(`${flowerimages_smallURL}/${arr[i].id}`)[0];
        fs.appendFileSync(xieruwenjianURL, JSON.stringify(arr[i]) + "\r\n");
    }
    console.log("已经写入" + arr.length + "条新数据，快打开‘mockFlowerData.txt’看看吧！");
});