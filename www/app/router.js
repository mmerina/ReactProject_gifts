import React from "react";
import {ConnectedRouter} from "react-router-redux";
import createHistory from "history/createHashHistory";
import {Route} from "react-router";

import Index from "./containers/Index";
import FlowerList from "./columns/buy/flowerList/FlowerList";
import FlowerShow from "./columns/buy/flowerShow/FlowerShow";
import CakeList from "./columns/buy/cakeList/CakeList";
import ChocolateList from "./columns/buy/chocolateList/ChocolateList";
import AddFlower from "./columns/publish/saleFlower/AddFlower";
import AddCake from "./columns/publish/saleCake/AddCake";
import AddChocolate from "./columns/publish/saleChocolate/AddChocolate";
import AdminList from "./columns/admin/adminList/AdminList";
import AddAdmin from "./columns/admin/addAdmin/AddAdmin";
import UserList from "./columns/user/userList/UserList";
import AddUser from "./columns/user/addUser/AddUser";
import FileList from "./columns/file/fileList/FileList";

const history = createHistory();

import App from "./containers/App";

export default ()=>{
    return <ConnectedRouter history={history}>
        <div>
            <Route exact path="/" component={Index} />
            <Route exact path="/buy/flowerlist" component={FlowerList} />
            <Route exact path="/buy/flowershow" component={FlowerShow} />
            <Route exact path="/buy/cakelist" component={CakeList} />
            <Route exact path="/buy/chocolatelist" component={ChocolateList} />
            <Route exact path="/publish/saleflower" component={AddFlower} />
            <Route exact path="/publish/salecake" component={AddCake} />
            <Route exact path="/publish/salechocolate" component={AddChocolate} />
            <Route exact path="/admin/adminlist" component={AdminList} />
            <Route exact path="/admin/addadmin" component={AddAdmin} />
            <Route exact path="/user/userlist" component={UserList} />
            <Route exact path="/user/adduser" component={AddUser} />
            <Route exact path="/file/filelist" component={FileList} />
        </div>
    </ConnectedRouter>
}