var fs = require("fs");
var path = require("path");
//引入一个产生随机数据非常方便的包：
var Mock = require("mockjs");
var Random = Mock.Random;

//得到鲜花基数据.json文件的地址
var jishujuURL = path.resolve(__dirname, "./基数据.json");
//准备写入的文件的地址
var xieruwenjianURL = path.resolve(__dirname, "./mockFlowerData.txt");
//准备写入的文件的地址
var flowerimages_smallURL = path.resolve(__dirname, "../www/flowers/small_pic");


//如果已经要写入的文件存在，就删除准备写入的文件
//fs.existsSync()表示判断文件是否存在
//fs.unlinkSync()表示删除文件
if (fs.existsSync(xieruwenjianURL)) {
    fs.unlinkSync(xieruwenjianURL);
}

console.log("原来的‘mockFlowerData.txt’已经删除，即将开始写入新数据...");

//读取文件
fs.readFile(jishujuURL, function (err, content) {
    //读取文件，并且变为真实的对象
    var arr = JSON.parse(content.toString());
    //遍历数组，给每一个JSON文件添加一些随机属性
    //简单的说，就是丰富了基数据、拓展了基数据，没有改变基数据，只是拓展了。
    for (var i = 0; i < arr.length; i++) {
        //增加收藏数
        arr[i].collect = parseInt(Math.random() * 10000);
        //增加一个鲜花的形象照
        arr[i].avatar = fs.readdirSync(`${flowerimages_smallURL}/${arr[i].id}`)[0];
        //写入最终生成的文件
        fs.appendFileSync(xieruwenjianURL, JSON.stringify(arr[i]) + "\r\n");
    }
    console.log("已经写入" + arr.length + "条新数据，快打开‘mockFlowerData.txt’看看吧！");
});