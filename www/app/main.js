import React from "react";
import dva from "dva";
import logger from "redux-logger";

import App from "./containers/App.js";
//引入模型
import flowerShowModel from "./models/flowerShowModel.js";

//创建dva的app对象
const app = dva({
    onAction: logger
});
//路由根组件
const router = () => <App></App>;
//注册路由
app.router(router);
//注册模型
app.model(flowerShowModel);

//挂载上树
app.start("#app");