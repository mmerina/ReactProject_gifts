import React, { Component } from 'react';
import { connect } from "dva";
import UserTableBox from "./UserTableBox";

// import "./FlowerList.less";

class UserList extends Component {
    constructor(props) {
        super(props);
        props.dispatch({ "type": "userlist/init" });
    }
    render() {
        return (
            <div>
                <UserTableBox></UserTableBox>
            </div>
        )
    }
}

export default connect()(UserList);