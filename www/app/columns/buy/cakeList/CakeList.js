import React, { Component } from 'react';
import {connect} from "dva";

import Buy from "../../../containers/Buy";

class CakeList extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return ( 
        <Buy columnKey="cakelist" columnName="蛋糕">
            <div>
               CakeList
            </div>
        </Buy>

         )
    }
}
 
export default connect()(CakeList);