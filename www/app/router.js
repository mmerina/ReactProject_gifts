import React from "react";
import {ConnectedRouter} from "react-router-redux";
import createHistory from "history/createHashHistory";
import {Route} from "react-router";

import FlowerList from "./components/flowerModules/flowerList/FlowerList";

const history = createHistory();

import App from "./containers/App";

export default ()=>{
    return <ConnectedRouter history={history}>
        <div>
            <Route exact path="/" component={App} />
            <Route exact path="/aa" component={FlowerList} />
        </div>
    </ConnectedRouter>
}