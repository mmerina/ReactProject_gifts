import React, { Component } from 'react';
import { connect } from "dva";
import AdminTableBox from "./AdminTableBox";

import Admin from "../../../containers/Admin.js";

class AdminList extends Component {
    constructor(props) {
        super(props);
        props.dispatch({ "type": "adminlist/init" });
    }
    render() {
        return (
        <Admin columnKey="adminlist" columnName="管理员列表">
            <div>
                <AdminTableBox></AdminTableBox>
            </div>
        </Admin>
        )
    }
}

export default connect()(AdminList);