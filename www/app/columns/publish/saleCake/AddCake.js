import React, { Component } from 'react';
import {connect} from "dva";

import Publish from "../../../containers/Publish";

class AddCake extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return ( 
            <Publish columnKey="salecake" columnName="新增蛋糕">
                <div className="salecake">
                    AddCake
                </div>
            </Publish>
         )
    }
}
export default connect(

)(AddCake);