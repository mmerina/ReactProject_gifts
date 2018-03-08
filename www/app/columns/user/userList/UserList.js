import React, { Component } from 'react';
import { connect } from "dva";
import UserTableBox from "./UserTableBox";

import User from "../../../containers/User";

class UserList extends Component {
    constructor(props) {
        super(props);
        props.dispatch({ "type": "userlist/init" });
    }
    render() {
        return (
            <User columnKey="userlist" columnName="用户列表">
                <div>
                    <UserTableBox></UserTableBox>
                </div>
            </User>
        )
    }
}

export default connect()(UserList);