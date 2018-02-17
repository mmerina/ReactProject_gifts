import React, { Component } from 'react';
import {connect} from "dva";
import FlowerFilterBox from "./FlowerFilterBox";
import FlowerTableBox from "./FlowerTableBox";

import "./FlowerList.less";

class FlowerList extends Component {
    constructor(props) {
        super(props);
        props.dispatch({ "type":"flowerlist/init"});
    }
    render() { 
        return ( 
        <div>
            <FlowerFilterBox></FlowerFilterBox> 
            <FlowerTableBox></FlowerTableBox> 
        </div>
         )
    }
}
 
export default connect()(FlowerList);