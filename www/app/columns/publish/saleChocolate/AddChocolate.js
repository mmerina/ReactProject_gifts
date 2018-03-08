import React, { Component } from 'react';
import {connect} from "dva";

import Publish from "../../../containers/Publish";

class AddChocolate extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return ( 
            <Publish columnKey="salechocolate" columnName="新增巧克力">
                <div className="salechocolate">
                    AddChocolate
                </div>
            </Publish>
         )
    }
}
export default connect(

)(AddChocolate);