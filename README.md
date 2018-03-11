# ReactProject_gifts

# 技术栈
## dva
dva 是基于现有应用架构 (redux + react-router + redux-saga 等)的一层轻量封装，没有引入任何新概念，全部代码不到 100 行。( Inspired by elm and choo. )
dva 是 framework，不是 library，类似 emberjs，会很明确地告诉你每个部件应该怎么写，这对于团队而言，会更可控。另外，除了 react 和 react-dom 是 peerDependencies 以外，dva 封装了所有其他依赖。
dva 实现上尽量不创建新语法，而是用依赖库本身的语法，比如 router 的定义还是用 react-router 的 JSX 语法的方式(dynamic config 是性能的考虑层面，之后会支持)。
他最核心的是提供了 app.model 方法，用于把 reducer, initialState, action, saga 封装到一起。

路由采用官方路由React-router。由于webpack配合Babel优秀的编译能力，因此本项目采用webpack +babel + ES2016作为编译工具。后台接口用node.js，数据库采用非关系型数据库mongodb。	
# 项目功能
* 管理员注册和管理
* 用户数据管理
* 发布信息（包括文件的上传、图片的上传和裁切等）
* 查看信息
* 筛选信息

# 项目文件夹：
该项目的文件夹结构如下所示：<br>
```javascript
    ┠ controllers 接口控制器 
    ┠ models mongodb的Schema文件
	┠ www 	开发文件
       		┠ app 	开发文件件
			┃ ┠	culumns 根据栏目而分的组件
			┃ ┠	container react中充当容器的组件	
			┃ ┠	models   action、store和saga等整合在一起后
			┃ ┠	main.js		入口文件
		┠ router.js	路由文件
        ┠ dist	存放编译后的文件
		┃ ┠ bundle.js 编译后的文件
        ┠ admins 管理员资源文件夹
        ┠ users 用户资源文件夹
        ┠ pages iframe页面文件夹
        ┠ index 主页
	┠	uploads  项目功能文件，存在发布资源
    ┠	app.js 项目启动
    ┠	package.json 依赖文件
    ┠	webpack.config.js  webpack配置文件
		
```
# 项目启动
### 安装node & npm

[https://nodejs.org/](https://nodejs.org/)


### 安装依赖

```shell
npm install
```

### 开启数据库

```shell
mongod --dbpath d:\database
```

### 项目开发

```shell
node app.js
```
###  数据库准备
* 数据库：主机地址：localhost
* 数据库名称：gifts
* 表：flowers/users/admins/files


# 项目主要概述
## webpack.config.json:
```javascript
const path = require('path');

module.exports = {
    entry: "./www/app/main.js", //入口
    output: {
        path: path.resolve(__dirname, "./www/dist"), //路径
        filename: "bundle.js" //文件名
    },
    module: {
        rules: [
            {   
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "www/app")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: "babel-loader",
                options: {
                    presets: ["env","react"],
                    plugins: ["transform-object-rest-spread","transform-runtime"]
                }
            },
            {
                test: /\.less$/,
                include: [
                    path.resolve(__dirname, "www/app")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "less-loader", options: {
                            noIeCompat: true
                        }
                    }
                ]
            }
        ]
    },
    watch: true
}
```
## package,json:
```javascript
{
    "name": "gifts",
    "version": "1.0.0",
    "description": "reactproject",
    "main": "app.js",
    "scripts": {
    },
    "author": "mxl",
    "license": "ISC",
    "dependencies": {
        "antd": "^3.1.6",
        "classnames": "^2.2.5",
        "dva": "^2.1.0",
        "express": "^4.16.2",
        "formidable": "^1.1.1",
        "gm": "^1.23.1",
        "lodash": "^4.17.4",
        "md5": "^2.2.1",
        "mongoose": "^4.13.9",
        "react": "^16.2.0",
        "react-dom": "^16.2.0",
        "redux-logger": "^3.0.6",
        "solarlunar": "^2.0.1"
    },
    "devDependencies": {
        "babel-core": "^6.26.0",
        "babel-loader": "^7.1.2",
        "babel-plugin-transform-object-rest-spread": "^6.26.0",
        "babel-plugin-transform-runtime": "^6.23.0",
        "babel-preset-env": "^1.6.1",
        "babel-preset-react": "^6.24.1",
        "css-loader": "^0.28.9",
        "less": "^2.7.3",
        "less-loader": "^4.0.5",
        "mockjs": "^1.0.1-beta3",
        "style-loader": "^0.19.1"
    }
}
```

## main.js
引入模型文件、入口文件和路由文件
```javascript
import React from "react";
import dva from "dva";
import logger from "redux-logger";

import App from "./containers/App.js";

import flowerShowModel from "./models/flowerShowModel.js";
import flowerListModel from "./models/flowerListModel.js";
import userListModel from "./models/userListModel.js";
import adminListModel from "./models/adminListModel.js";
import addFlowerModel from "./models/addFlowerModel.js";
import addFileModel from "./models/addFileModel.js";

import router from "./router.js";

const app = dva({
    onAction: logger
});

app.router(router);

app.model(flowerShowModel);
app.model(flowerListModel);
app.model(userListModel);
app.model(adminListModel);
app.model(addFlowerModel);
app.model(addFileModel);

app.start("#app");
```
### 子组件用connect函数修饰一下
