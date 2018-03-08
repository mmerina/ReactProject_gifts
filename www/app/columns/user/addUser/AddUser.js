import React, { Component } from 'react';
import {connect} from "dva";

import User from "../../../containers/User";

class AddUser extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return ( 
            <User columnKey="adduser" columnName="新增用户">
                <div className="adduser">
                    AddUser
                </div>
            </User>
         )
    }
}
export default connect(

)(AddUser);