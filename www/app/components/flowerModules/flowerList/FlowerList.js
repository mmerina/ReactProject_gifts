import React, { Component } from 'react';
import {connect} from "dva";
import FlowerFilterBox from "./FlowerFilterBox";
import FlowerTableBox from "./FlowerTableBox";
import App from "../../../containers/App.js";

import "./FlowerList.less";

class FlowerList extends Component {
    constructor(props) {
        super(props);
        props.dispatch({ "type":"flowerlist/init"});
    }
    render() { 
        return ( 
        <App>
            <div>
                <FlowerFilterBox></FlowerFilterBox> 
                <FlowerTableBox></FlowerTableBox> 
            </div>
        </App>

         )
    }
}
 
export default connect()(FlowerList);