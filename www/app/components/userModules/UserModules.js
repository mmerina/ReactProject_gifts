import React, { Component } from 'react';
import { connect } from "dva";

import UserList from "./userList/UserList";

class UserModules extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <UserList></UserList>
                {/*
            <FlowerShow></FlowerShow>
            */}
            </div>
        )
    }
}

export default connect()(UserModules);