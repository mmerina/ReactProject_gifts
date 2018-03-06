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