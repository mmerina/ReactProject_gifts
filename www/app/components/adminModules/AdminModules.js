import React, { Component } from 'react';
import { connect } from "dva";


import AddAdmin from "./addAdmin/AddAdmin";
import AdminList from "./adminList/AdminList";

class AdminModules extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {/*
                    <AddAdmin></AddAdmin>
                */}
                <AdminList></AdminList>
            </div>
        )
    }
}

export default connect()(AdminModules);