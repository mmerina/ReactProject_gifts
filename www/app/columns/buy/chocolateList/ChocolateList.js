import React, { Component } from 'react';
import {connect} from "dva";

import Buy from "../../../containers/Buy";

class ChocolateList extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return ( 
        <Buy columnKey="chocolatelist" columnName="巧克力">
            <div>
               ChocolateList
            </div>
        </Buy>

         )
    }
}
 
export default connect()(ChocolateList);