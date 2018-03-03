import React, { Component } from 'react';
import { connect } from "dva";
import AdminTableBox from "./AdminTableBox";


class AdminList extends Component {
    constructor(props) {
        super(props);
        props.dispatch({ "type": "adminlist/init" });
    }
    render() {
        return (
            <div>
                <AdminTableBox></AdminTableBox>
            </div>
        )
    }
}

export default connect()(AdminList);