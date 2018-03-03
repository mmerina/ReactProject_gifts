import React from "react";
import dva from "dva";
import logger from "redux-logger";

import App from "./containers/App.js";

import flowerShowModel from "./models/flowerShowModel.js";
import flowerListModel from "./models/flowerListModel.js";
import userListModel from "./models/userListModel.js";
import adminListModel from "./models/adminListModel.js";

const app = dva({
    onAction: logger
});

const router = () => <App></App>;
app.router(router);

app.model(flowerShowModel);
app.model(flowerListModel);
app.model(userListModel);
app.model(adminListModel);

app.start("#app");