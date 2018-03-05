var fs = require("fs");
var path = require("path");
var Mock = require("mockjs");
var Random = Mock.Random;

var xieruwenjianURL = path.resolve(__dirname, "./mockAdminData.txt");
var userImgURL = path.resolve(__dirname, "../www/admins/icons");

if (fs.existsSync(xieruwenjianURL)) {
    fs.unlinkSync(xieruwenjianURL);
}

console.log("原来的‘mockAdminData.txt’已经删除，即将开始写入新数据...");
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
var idArr = [];
for (var i = 0; i < 200; i++) {
    var theCenter = apartment[0];    
    var theApartment = theCenter.children[parseInt(Math.random()*2)];
    var theGroup = theApartment.children[parseInt(Math.random() * 3)];
    var id = theCenter.idx + theApartment.idx + theGroup.idx + (100 + parseInt(Math.random() * 50)).toString();
    while(idArr.includes(id)){
        id = theCenter.idx + theApartment.idx + theGroup.idx + (100 + parseInt(Math.random() * 50)).toString();
    }
    idArr.push(id);

    var o = {
        id,
        "name": Random.cname(),					
        "password": "E10ADC3949BA59ABBE56E057F20F883E",	
        "mobile": Mock.mock(/^((13[0-9])|(14[57])|(15([5-9]))|(18[5-9]))\d{8}$/),			//手机号
        "sex": Random.pick(["男", "女"]),
        "email": Random.email(),
        "apartment": [theCenter.value , theApartment.value , theGroup.value],
        "icon":""
    }
   
    fs.appendFileSync(xieruwenjianURL, JSON.stringify(o) + "\r\n");
}
console.log("已经写入200条新数据，快打开‘mockAdminData.txt’看看吧！");
